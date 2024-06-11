import { FC } from "react";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import { IBooking } from "../../utils/schemas";
import Stat from "./Stat";

interface IStatsProps {
  bookings?: IBooking[] | null;
  confirmedStays?: IBooking[] | null;
  numDays: number;
  numCabins: number;
}
const Stats: FC<IStatsProps> = ({
  bookings,
  confirmedStays,
  numDays,
  numCabins,
}) => {
  const numBookings = bookings?.length;

  const sales = bookings?.reduce((acc, cur) => acc + Number(cur.totalPrice), 0);

  const checkins = confirmedStays?.length;

  const occupation = confirmedStays?.reduce(
    (acc, cur) => acc + Number(cur.numNights),
    0
  );
  const totalPossibleOccupation = numDays * numCabins;

  const occupancyRate = Math.round(
    ((occupation ?? 0) / totalPossibleOccupation) * 100
  );

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings ?? 0}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales ?? 0)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins ?? 0}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${occupancyRate ?? 0}%`}
      />
    </>
  );
};

export default Stats;
