import { FC, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { tableFilters } from "../utils/schemas";

interface IStyledFilterProps {
  children: ReactNode;
}
const StyledFilter: FC<IStyledFilterProps> = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

interface IFilterButtonProps {
  active: boolean | string;
  children: string;
  onClick: () => void;
  disabled: boolean;
}
const FilterButton: FC<IFilterButtonProps> = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface IFilterProps {
  filterField: string;
  options: { value: string; label: string }[];
}
const Filter: FC<IFilterProps> = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilterValue: tableFilters =
    (searchParams.get(filterField) as tableFilters) || options[0];

  function handleClick(paramsValue: tableFilters) {
    searchParams.set(filterField, paramsValue);
    if (searchParams.get("page")) searchParams.set("page", "1");

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={currentFilterValue === option.value}
          onClick={() => handleClick(option.value as tableFilters)}
          disabled={currentFilterValue === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
