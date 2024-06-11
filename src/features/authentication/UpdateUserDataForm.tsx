import { FC, FormEvent, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUser } from "./useUpdateUser";

import { useUser } from "./useUser";

const UpdateUserDataForm: FC = () => {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const userEmail = user?.email ?? "";
  const currentFullName = user?.user_metadata?.fullName ?? "";

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState<string>(currentFullName);
  const [email, setEmail] = useState<string>(userEmail);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleFileChange(e: FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) setAvatar(target.files[0]);
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
    setEmail(userEmail);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled type="email" id="email" />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e: FormEvent) =>
            setFullName((e.target as HTMLInputElement).value)
          }
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button onClick={handleCancel} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
