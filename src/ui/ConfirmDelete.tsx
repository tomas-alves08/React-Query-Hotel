import { FC, useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { ModalContext } from "./Modal";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

interface IConfirmDeleteProps {
  resourceName: string;
  onConfirm: Function;
  disabled?: boolean;
  onCloseModal?: Function;
}

const ConfirmDelete: FC<IConfirmDeleteProps> = ({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}) => {
  function handleClose() {
    if (onCloseModal) onCloseModal();
  }

  console.log("ON COMFIRM!");
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button variation="secondary" disabled={disabled} onClick={handleClose}>
          Cancel
        </Button>
        <Button variation="danger" onClick={onConfirm} disabled={disabled}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
};

export default ConfirmDelete;
