import { FC } from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
// import Sort from "../../ui/Sort";

const CabinTableOperations: FC = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name from (A to Z)" },
          { value: "name-des", label: "Sort by name from (Z to A)" },
          { value: "regularPrice-asc", label: "Sort by Price (low first)" },
          { value: "regularPrice-des", label: "Sort by Price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-des", label: "Sort by capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
