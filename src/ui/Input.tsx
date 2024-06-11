import { FC } from "react";
import styled from "styled-components";

interface IInputProps {
  type: string | number;
  id: string;
  onBlur?: Function;
  onChange?: Function;
  defaultValue?: number;
  disabled?: boolean;
  autoComplete?: string;
  value?: string;
}

const Input: FC<IInputProps> = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

export default Input;
