import { FC } from "react";
import styled from "styled-components";

interface IStyledSelectProps {
  type: string;
}

const StyledSelect: FC<IStyledSelectProps> = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface ISelectProps {
  options: { value: string; label: string }[];
  value: string;
  type: string;
  onChange: Function;
}
const Select: FC<ISelectProps> = ({ options, value, onChange, ...props }) => {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
