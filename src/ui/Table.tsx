import { createContext, FC, ReactNode, useContext } from "react";
import styled from "styled-components";
import { ICabin } from "../utils/schemas";

interface ICommonRowProps {
  columns: string;
}

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow: FC<ICommonRowProps> = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface ITableContext {
  columns: string;
}

const TableContext = createContext<ITableContext | null>(null);

interface ITableProps {
  columns: string;
  children: ReactNode;
}
const Table: FC<ITableProps> & {
  Header: FC<IHeaderProps>;
  Row: FC<IRowProps>;
  Body: FC<IBodyProps>;
  Footer: ReactNode;
} = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

interface IHeaderProps {
  children: ReactNode;
}
const Header: FC<IHeaderProps> = ({ children }) => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("Header must be used within a TableContext");
  }
  const { columns } = context;

  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
};

interface IRowProps {
  children: ReactNode;
}
const Row: FC<IRowProps> = ({ children }) => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("Header must be used within a TableContext");
  }
  const { columns } = context;

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
};

interface IBodyProps {
  data: ICabin[];
  render: (cabin: ICabin) => JSX.Element;
}
const Body: FC<IBodyProps> = ({ data, render }) => {
  if (!data.length) return <Empty>No data at the moment</Empty>;

  return <StyledBody> {data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
