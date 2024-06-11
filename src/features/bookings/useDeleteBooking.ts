import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  console.log("useDeleteBooking");

  const { mutate: removeBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId: string) => deleteBooking(Number(bookingId)),
    onSuccess: () => {
      toast.success(`Booking successfully deleted`);

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: () => {
      toast.error("There was an error when deleting the booking");
    },
  });

  return { isDeleting, removeBooking };
}
