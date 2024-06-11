import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";
import {
  bookingsSort,
  IBooking,
  IFilter,
  ISort,
  tableFilters,
} from "../../utils/schemas";

interface IBookingsResponse {
  data: IBooking[];
  count: number | null;
}

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status") as tableFilters;

  const filters = !filterValue
    ? null
    : [
        { field: "status", value: filterValue } as IFilter,
        // { field: "totalPrice", value: 5000, method: "lte" },
      ];

  // SORT
  const sortByRaw =
    (searchParams.get("sortBy") as bookingsSort) || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = !sortByRaw ? null : ({ field, direction } as ISort);

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {} as IBookingsResponse,
    error,
  } = useQuery({
    queryKey: ["bookings", filters, sortBy, page],
    queryFn: () => getBookings({ filters, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil((count ? count : 0) / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sortBy, page + 1],
      queryFn: () => getBookings({ filters, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sortBy, page - 1],
      queryFn: () => getBookings({ filters, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, error, count };
}
