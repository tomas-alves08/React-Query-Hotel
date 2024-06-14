import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";
import { IBooking } from "../../utils/schemas";
import CheckoutButton from "./CheckoutButton";

interface IStyledTodayItemProps {
  children: ReactNode;
}
const StyledTodayItem: FC<IStyledTodayItemProps> = styled.li`
  display: grid;
  grid-template-columns: 7.5rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

interface IGuest {
  children: string;
}
const Guest: FC<IGuest> = styled.div`
  font-weight: 500;
`;

interface ITodayItemProps {
  activity: IBooking;
}
const TodayItem: FC<ITodayItemProps> = ({ activity }) => {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guests?.countryFlag} alt={`Flag of ${guests?.country}`} />
      <Guest>{guests?.fullName ?? ""}</Guest>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button size="small" as={Link} to={`/checkin/${id}`}>
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id ?? ""} />}
    </StyledTodayItem>
  );
};

export default TodayItem;
