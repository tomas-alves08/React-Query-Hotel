import * as React from "react";
import { FC, ReactNode } from "react";
import styled from "styled-components";

interface IStyledFormRowProps {
  children: ReactNode;
}

const StyledFormRow: FC<IStyledFormRowProps> = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

interface ILabelProps {
  children: ReactNode;
  htmlFor: string;
}

const Label: FC<ILabelProps> = styled.label`
  font-weight: 500;
`;

interface IError {
  children: string;
}

const Error: FC<IError> = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface IFormRowProps {
  children: ReactNode;
  label?: string;
  error?: string;
}

const FormRow: FC<IFormRowProps> = ({ children, label, error }) => {
  let childId = null;
  if (React.isValidElement(children)) {
    if (children?.props?.id != undefined) childId = children.props.id;
  }

  return (
    <StyledFormRow>
      {label && <Label htmlFor={childId && childId}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
