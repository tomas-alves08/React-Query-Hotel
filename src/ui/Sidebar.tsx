import { FC } from "react";
import styled from "styled-components";
import Uploader from "../data/Uploader";
import { useCabins } from "../pages/useCabins";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Sidebar: FC = () => {
  const { isLoading, cabins } = useCabins();
  // console.log(cabins);
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />

      <Uploader />
    </StyledSidebar>
  );
};

export default Sidebar;
