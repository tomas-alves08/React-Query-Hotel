import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { FC, ReactNode } from "react";
import { IBooking } from "../../utils/schemas";

interface IStyledBookingDataBoxProps {
  children: ReactNode;
}
const StyledBookingDataBox: FC<IStyledBookingDataBoxProps> = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

interface IHeaderProps {
  children: ReactNode;
}
const Header: FC<IHeaderProps> = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

interface ISectionProps {
  children: ReactNode;
}
const Section: FC<ISectionProps> = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

interface IGuestProps {
  children: ReactNode;
}
const Guest: FC<IGuestProps> = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

interface IPriceProps {
  isPaid: boolean;
  children: ReactNode;
}
const Price: FC<IPriceProps> = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

interface IBookingDataBoxProps {
  booking: IBooking;
}

// A purely presentational component
const BookingDataBox: FC<IBookingDataBoxProps> = ({ booking }) => {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests,
    cabins,
  } = booking;

  console.table(booking);

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabins?.name}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate ?? ""), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate ?? ""))
            ? "Today"
            : formatDistanceFromNow(startDate ?? "")}
          ) &mdash; {format(new Date(endDate ?? ""), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        {booking.guests && numGuests && (
          <Guest>
            {guests?.countryFlag && (
              <Flag
                src={guests?.countryFlag}
                alt={`Flag of ${guests?.country}`}
              />
            )}
            <p>
              {guests?.fullName}{" "}
              {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
            </p>
            <span>&bull;</span>
            <p>{guests?.email}</p>
            <span>&bull;</span>
            <p>National ID {guests?.nationalID}</p>
          </Guest>
        )}

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price isPaid={isPaid ?? false}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(Number(totalPrice))}

            {hasBreakfast &&
              ` (${formatCurrency(Number(cabinPrice))} cabin + ${formatCurrency(
                Number(extrasPrice)
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>
          Booked {format(new Date(created_at ?? ""), "EEE, MMM dd yyyy, p")}
        </p>
      </Footer>
    </StyledBookingDataBox>
  );
};

export default BookingDataBox;
