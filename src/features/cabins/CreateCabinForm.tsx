import { FC, useState } from "react";
import { FieldErrors, SubmitErrorHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { ICabin } from "../../utils/schemas";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

interface ICreateCabinFormProps {
  cabinToEdit?: ICabin;
  onCloseModal?: () => void;
}

const CreateCabinForm: FC<ICreateCabinFormProps> = ({
  cabinToEdit,
  onCloseModal,
}) => {
  const [editValues] = useState(cabinToEdit);
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<ICabin>({ defaultValues: editValues ? { ...editValues } : {} });
  const { errors } = formState;

  function onSubmit(data: ICabin) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (editValues?.id) {
      editCabin(
        { newCabinData: { ...data, image }, id: editValues.id },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function handleReset() {
    reset();
    onCloseModal?.();
  }

  const onError: SubmitErrorHandler<ICabin> = (err: FieldErrors<ICabin>) => {
    const errorFields = Object.keys(err).join(", ");
    toast.error(
      "Please correct the highlighted errors on fields:  " +
        errorFields +
        ". And try again.."
    );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message || ""}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message || ""}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message || ""}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message || ""}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than the regular price",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message || ""}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message || ""}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: editValues ? false : "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={handleReset}
          disabled={isWorking}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} onClick={onSubmit}>
          {editValues ? "Edit" : "Create new"} cabin
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
