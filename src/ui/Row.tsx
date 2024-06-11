import { FC, ReactNode } from "react";
import styled, { css } from "styled-components";

interface IRowProps {
  type?: string;
  children: ReactNode;
}

const Row: FC<IRowProps> = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    (props.type === "vertical" || props.type === undefined) &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

export default Row;
