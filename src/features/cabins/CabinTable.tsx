import { FC } from "react";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

import { useCabins } from "../../pages/useCabins";
import Table from "../../ui/Table";
import { ICabin, tableFilters } from "../../utils/schemas";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable: FC = () => {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 1) FILTER
  const filterValues: tableFilters =
    (searchParams.get("discount") as tableFilters) || "all";

  let filteredCabins = cabins;
  if (filterValues === "no-discount")
    filteredCabins = cabins?.filter((cabin) => !cabin.discount);
  if (filterValues === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (!sortedCabins?.length) return <Empty resource="cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins as ICabin[] | []}
          render={(cabin: ICabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
