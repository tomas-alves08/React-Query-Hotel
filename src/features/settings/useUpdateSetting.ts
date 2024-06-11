import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import { ISetting } from "../../utils/schemas";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  // Update Settings React Query
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: (newSettingsData: Partial<ISetting>) =>
      updateSettingApi(newSettingsData),
    onSuccess: () => {
      toast.success("Settings successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });

  return { isUpdating, updateSetting };
}
