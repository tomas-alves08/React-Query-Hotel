import {
  cloneElement,
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useState,
  isValidElement,
} from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface IWindowProps {
  children: ReactNode;
  name: string;
  // onClose: () => void;
}

interface IModalProps {
  children: ReactNode;
}

interface IOpenProps {
  children: ReactElement;
  opens: string;
}

interface IModalContext {
  open: (windowName: string) => void;
  openName: string;
  close: () => void;
}

const ModalContext = createContext<IModalContext | null>(null);

const Modal: FC<IModalProps> & {
  Open: FC<IOpenProps>;
  Window: FC<IWindowProps>;
} = ({ children }) => {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open: FC<IOpenProps> = ({ children, opens: opensWindowName }) => {
  const context = useContext(ModalContext);

  if (!context) {
    toast.error("Open must be used within a ModalProvider");
    return null;
  }

  const { open } = context;

  if (!isValidElement(children)) {
    toast.error("Open component requires a valid React element as children");
    return null;
  }

  return (
    <div>
      {cloneElement(children as ReactElement, {
        onClick: () => open(opensWindowName),
      })}
    </div>
  );
};

const Window: FC<IWindowProps> = ({ children, name }) => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Window must be used within a ModalProvider");
  }

  const { openName, close } = context;

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children as ReactElement, { onCloseModal: close })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
