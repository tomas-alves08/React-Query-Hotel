import { FC, FocusEvent } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

const UpdateSettingsForm: FC = () => {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const isWorking = isLoading || isUpdating;

  if (isLoading) return <Spinner />;

  function handleUpdate(e: FocusEvent<HTMLInputElement>, key: string) {
    if (!e.target) return;
    updateSetting({ [key]: Number(e.target.value) });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isWorking}
          defaultValue={minBookingLength}
          onBlur={(e: FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, "minBookingLength")
          }
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isWorking}
          defaultValue={maxBookingLength}
          onBlur={(e: FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, "maxBookingLength")
          }
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isWorking}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e: FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, "maxGuestsPerBooking")
          }
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isWorking}
          defaultValue={breakfastPrice}
          onBlur={(e: FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, "breakfastPrice")
          }
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
