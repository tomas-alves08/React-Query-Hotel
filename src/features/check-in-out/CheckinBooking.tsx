import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "./useCheckin";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";

const Box: FC = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckinBooking: FC = () => {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const [breakfast, setBreakfast] = useState<boolean>(false);

  const { settings, isLoading: isLoadingSettings } = useSettings();

  const navigate = useNavigate();

  const { bookingId } = useParams();
  const moveBack = useMoveBack();

  const { booking, isLoading } = useBooking();
  console.log(booking);

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const { isCheckingIn, checkin } = useCheckin();

  if (isLoading || isCheckingIn || isLoadingSettings) return <Spinner />;

  function handleAddBreakfast() {
    setBreakfast((breakfast) => !breakfast);
    setConfirmPaid(false);
  }

  const optionalBreakfastPrice =
    settings.breakfastPrice * booking.numGuests * booking.numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (breakfast) {
      checkin({
        bookingId: bookingId || "",
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice.toString(),
          totalPrice: booking.totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({
        bookingId: bookingId || "",
        breakfast: {
          hasBreakfast: booking.hasBreakfast,
          extrasPrice: booking.extrasPrice || "",
          totalPrice: booking.totalPrice,
        },
      });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking.hasBreakfast && (
        <Box>
          <Checkbox
            checked={breakfast}
            onChange={handleAddBreakfast}
            disabled={isCheckingIn}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {booking.guests.fullName} has paid the total amount of{" "}
          {formatCurrency(booking.totalPrice + optionalBreakfastPrice)} (
          {formatCurrency(booking.totalPrice)} +{" "}
          {formatCurrency(optionalBreakfastPrice)})
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;
