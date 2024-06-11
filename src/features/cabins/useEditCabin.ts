import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { ICabin } from "../../utils/schemas";

interface EditCabinParams {
  newCabinData: ICabin;
  id: number;
}

export function useEditCabin() {
  const queryClient = useQueryClient();

  // Edit Cabin React Query
  const { isLoading: isEditing, mutate: editCabin } = useMutation<
    void,
    unknown,
    EditCabinParams
  >({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { isEditing, editCabin };
}
