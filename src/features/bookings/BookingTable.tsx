import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import { useCabins } from "../../pages/useCabins";
import Pagination from "../../ui/Pagination";

const BookingTable = () => {
  const { bookings, isLoading: isLoadingBookings, count } = useBookings();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  // const cabin = cabins?.find(cabin=>cabin.id === )

  if (isLoadingBookings || isLoadingCabins) return <Spinner />;
  if (!bookings.length) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count || 0} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default BookingTable;