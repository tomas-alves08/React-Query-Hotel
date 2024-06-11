import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import { IBooking } from "../../utils/schemas";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: string;
      breakfast: IBooking;
    }) =>
      updateBooking(Number(bookingId), {
        ...breakfast,
        status: "checked-in",
        isPaid: true,
      }),

    onSuccess: (data: IBooking) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({
        active: true,
      } as InvalidateQueryFilters<boolean>);
      navigate("/");
    },

    onError: () => {
      toast.error("There was an error when checking in");
    },
  });

  return { isCheckingIn, checkin };
}
