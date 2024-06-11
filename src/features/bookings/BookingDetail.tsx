import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { FC } from "react";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup: FC = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetail: FC = () => {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { removeBooking, isDeleting } = useDeleteBooking();
  const { status } = booking ?? { status: "" };

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleCheckIn() {
    navigate(`/checkin/${booking.id}`);
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={handleCheckIn}>
            <HiArrowDownOnSquare />
            <span>Check in</span>
          </Button>
        )}

        {booking.status === "checked-in" && (
          <Button
            onClick={() => checkout(booking.id || "")}
            disabled={isCheckingOut}
          >
            <HiArrowUpOnSquare />
            <span> Check out</span>
          </Button>
        )}

        <Button
          variation="danger"
          onClick={() =>
            removeBooking(booking.id ?? "", { onSettled: () => navigate(-1) })
          }
          disabled={isDeleting}
        >
          <HiTrash />
          <span> Delete Booking</span>
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default BookingDetail;
