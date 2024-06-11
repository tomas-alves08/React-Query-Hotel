import { ChangeEvent, FC } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface ISortByProps {
  options: { value: string; label: string }[];
}
const SortBy: FC<ISortByProps> = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleChange}
    />
  );
};

export default SortBy;
