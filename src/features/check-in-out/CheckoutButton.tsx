import { FC } from "react";
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

interface ICheckoutButtonProps {
  bookingId: string;
}

const CheckoutButton: FC<ICheckoutButtonProps> = ({ bookingId }) => {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
