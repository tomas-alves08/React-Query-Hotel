import { FC, ReactNode } from "react";
import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Button from "../ui/Button";
import Heading from "../ui/Heading";

interface IStyledPageNotFoundProps {
  children: ReactNode;
}
const StyledPageNotFound: FC<IStyledPageNotFoundProps> = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

interface IBoxProps {
  children: ReactNode;
}
const Box: FC<IBoxProps> = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

const PageNotFound: FC = () => {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <Button onClick={moveBack} size="large">
          &larr; Go back
        </Button>
      </Box>
    </StyledPageNotFound>
  );
};

export default PageNotFound;
