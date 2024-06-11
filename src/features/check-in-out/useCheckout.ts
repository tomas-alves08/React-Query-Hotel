import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { IBooking } from "../../utils/schemas";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(Number(bookingId), {
        status: "checked-out",
      }),

    onSuccess: (data: IBooking) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({
        active: true,
      } as InvalidateQueryFilters<boolean>);
    },

    onError: () => {
      toast.error("There was an error when checking out");
    },
  });

  return { isCheckingOut, checkout };
}
