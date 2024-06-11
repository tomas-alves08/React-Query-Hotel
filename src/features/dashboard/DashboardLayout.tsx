import { FC, ReactNode } from "react";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../../pages/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

interface IStyledDashboardLayoutProps {
  children: ReactNode;
}
const StyledDashboardLayout: FC<IStyledDashboardLayoutProps> = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout: FC = () => {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings || null}
        confirmedStays={confirmedStays || null}
        numDays={numDays}
        numCabins={cabins?.length ?? 0}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays ?? null} />
      <SalesChart bookings={bookings ?? null} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
