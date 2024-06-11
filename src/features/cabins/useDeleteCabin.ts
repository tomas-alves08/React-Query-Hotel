import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IError } from "../../utils/schemas";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: IError) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
