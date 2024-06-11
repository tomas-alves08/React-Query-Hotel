import { FC, ReactNode } from "react";
import styled from "styled-components";
import { css } from "styled-components";

interface IHeadingProps {
  as: string;
  children: ReactNode;
}

const Heading: FC<IHeadingProps> = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
  
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

  line-height:1.4
`;

export default Heading;