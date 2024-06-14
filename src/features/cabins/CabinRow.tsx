import { FC, ReactNode } from "react";
import toast from "react-hot-toast";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import { ICabin } from "../../utils/schemas";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";

interface IImgProps {
  src: string;
}

const Img: FC<IImgProps> = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

interface ICabinProps {
  children: ReactNode;
}

const Cabin: FC<ICabinProps> = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

interface IPriceProps {
  children: ReactNode;
}

const Price: FC<IPriceProps> = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

interface IDiscountProps {
  children: ReactNode;
}

const Discount: FC<IDiscountProps> = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

interface ICabinRowProps {
  cabin: ICabin;
}

const CabinRow: FC<ICabinRowProps> = ({ cabin }) => {
  // const [showForm, setShowForm] = useState<boolean>(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
    id: cabinId,
  } = cabin;

  function handleDelete() {
    if (cabinId) {
      toast.success("Deleting cabin...");
      deleteCabin(cabinId);
    } else {
      console.error("Cabin ID is not set");
    }
  }

  function handleDuplicate() {
    toast.success("Deleting cabin...");
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
      created_at: new Date().toISOString(),
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        {/* <button onClick={handleDuplicate} disabled={isCreating}>
          <HiSquare2Stack />
        </button> */}

        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId?.toString() || ""} />

            <Menus.List id={cabinId?.toString() || ""}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={name}
                onConfirm={handleDelete}
                disabled={isDeleting}
              ></ConfirmDelete>
            </Modal.Window>
          </Menus.Menu>
        </Modal>

        {/* <Modal>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={name}
              onConfirm={handleDelete}
              disabled={isDeleting}
            ></ConfirmDelete>
          </Modal.Window>
        </Modal> */}
      </div>
    </Table.Row>
  );
};

export default CabinRow;
