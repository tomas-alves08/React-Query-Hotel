import { FC, MouseEventHandler, ReactNode } from "react";
import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variation = {
  none: css`
    padding: 4.2px 1px;
    border-radius: 2px;
    border: 1px solid var(--color-grey-500);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

interface IButtonProps {
  size?: "small" | "medium" | "large";
  variation?: "primary" | "secondary" | "danger" | "none";
  children: ReactNode;
  onClick?: Function | MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = styled.button`
  border: none;
  border-radius: var(--border-radius-small);
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size || "medium"]}
  ${(props) => variation[props.variation || "primary"]}
`;

// interface IButtonProps {
//   onClick?: Function | MouseEventHandler<HTMLButtonElement>;
//   disabled?: boolean;
//   children: ReactNode;
// }
// const Button: FC<IButtonProps> = ({ children, onClick, disabled }) => {
//   console.log("BUTTON!");
//   return (
//     <ButtonStyled onClick={onClick} disabled={disabled}>
//       {children}
//     </ButtonStyled>
//   );
// };

// Use transient props ($size, $variation)
// const StyledButton = styled.button<{
//   $size: keyof typeof sizes;
//   $variation: keyof typeof variations;
// }>`
//   border: none;
//   border-radius: var(--border-radius-small);
//   box-shadow: var(--shadow-sm);
//   cursor: pointer;

//   ${(props) => sizes[props.$size]}
//   ${(props) => variations[props.$variation]}
// `;

// const Button: FC<IButtonProps> = ({
//   size = "medium",
//   variation = "primary",
//   children,
//   disabled = false,
//   onClick = () => {},
// }) => {
//   return (
//     <StyledButton
//       $size={size}
//       $variation={variation}
//       onClick={onClick}
//       disabled={disabled}
//     >
//       {children}
//     </StyledButton>
//   );
// };

export default Button;
