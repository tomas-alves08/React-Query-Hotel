import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { FC, ReactNode } from "react";
import { IBooking, StatusType } from "../../utils/schemas";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

interface ICabinProps {
  children: string;
}
const Cabin: FC<ICabinProps> = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

interface IStackProps {
  children: ReactNode;
}
const Stacked: FC<IStackProps> = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

interface IAmountProps {
  children: ReactNode;
}
const Amount: FC<IAmountProps> = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

interface IBookingRowProps {
  booking: IBooking;
}

const BookingRow: FC<IBookingRowProps> = ({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins,
  },
}) => {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { removeBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleDetails() {
    navigate(`/bookings/${bookingId}`);
  }

  function handleCheckIn() {
    navigate(`/checkin/${bookingId}`);
  }

  return (
    <Table.Row>
      <Cabin>{cabins?.name ?? ""}</Cabin>

      <Stacked>
        <span>{guests?.fullName}</span>
        <span>{guests?.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(Number(startDate)))
            ? "Today"
            : formatDistanceFromNow(startDate ?? "")}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate ?? ""), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate ?? ""), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status as StatusType]}>
        {(status as StatusType).replace("-", " ")}
      </Tag>

      <Amount>{formatCurrency(Number(totalPrice))}</Amount>

      <Menus.Menu>
        <Menus.Toggle id={bookingId ? bookingId : ""} />
        <Menus.List id={bookingId ? bookingId : ""}>
          <Menus.Button icon={<HiEye />} onClick={handleDetails}>
            See details
          </Menus.Button>

          {status === "unconfirmed" && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={handleCheckIn}
            >
              Check in
            </Menus.Button>
          )}

          {status === "checked-in" && (
            <Menus.Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(bookingId || "")}
              disabled={isCheckingOut}
            >
              Check out
            </Menus.Button>
          )}

          <Menus.Button
            icon={<HiTrash />}
            onClick={() => removeBooking(bookingId || "")}
            disabled={isDeleting}
          >
            Delete Booking
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
};

export default BookingRow;
