import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";
import { IError, IUser } from "../../utils/schemas";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: ({ password, fullName, avatar }: IUser) =>
      updateCurrentUser({ password, fullName, avatar }),
    onSuccess: ({ user }) => {
      toast.success("User successfully updated");

      queryClient.setQueryData(["user"], user);

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (err: IError) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
