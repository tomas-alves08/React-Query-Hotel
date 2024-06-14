import {
  createContext,
  FC,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface IPosition {
  x: number;
  y: number;
}
interface IStyledListProps {
  children: ReactNode;
  position: IPosition;
  ref: MutableRefObject<HTMLElement | null>;
}

interface IStyledMenusProsp {
  children: ReactNode;
}
const StyledMenu: FC<IStyledMenusProsp> = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList: FC<IStyledListProps> = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface IMenusContext {
  openId: string;
  open: (id: string) => void;
  close: () => void;
  position: IPosition | null;
  setPosition: (position: IPosition) => void;
}

const MenusContext = createContext<IMenusContext | null>(null);

interface IMenusProps {
  children: ReactNode;
}
const Menus: FC<IMenusProps> & {
  Menu: FC<IMenuProps>;
  Toggle: FC<IToggleProps>;
  List: FC<IListProps>;
  Button: FC<IButtonProps>;
} = ({ children }) => {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<IPosition | null>(null);

  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

interface IMenuProps {
  children: ReactNode;
}
const Menu: FC<IMenuProps> = ({ children }) => {
  return <StyledMenu>{children}</StyledMenu>;
};

interface IToggleProps {
  id: string;
}
const Toggle: FC<IToggleProps> = ({ id }) => {
  const context = useContext(MenusContext);

  if (!context) {
    toast.error("Toggle must be used within a Menus Provider");
    return null;
  }

  const { openId, open, close, setPosition } = context;

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.height + rect.y + 8,
    });

    openId === null || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle id={id} onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

interface IListProps {
  children: ReactNode;
  // position: IPosition;
  id: string;
}
const List: FC<IListProps> = ({ children, id }) => {
  const context = useContext(MenusContext);

  if (!context) {
    toast.error("Menu List must be used within Menus Provider");
    return null;
  }

  const { openId, position, close } = context;
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position ? position : { x: 0, y: 0 }} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

interface IButtonProps {
  children: ReactNode;
  icon: ReactNode;
  onClick?: Function;
  disabled?: boolean;
}
const Button: FC<IButtonProps> = ({
  children,
  icon,
  onClick,
  disabled = false,
}) => {
  const context = useContext(MenusContext);

  if (!context) {
    toast.error(
      "You must use the Button component inside of the Menus Context"
    );
    return null;
  }

  const { close } = context;

  function handleClick(e: MouseEvent) {
    e.stopPropagation();

    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
