import { FC, ReactNode } from "react";
import styled from "styled-components";
import { useUser } from "./useUser";

interface IStyledUserAvatarProps {
  children: ReactNode;
}
const StyledUserAvatar: FC<IStyledUserAvatarProps> = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

interface IAvatarProps {
  src: string;
  alt: string;
}
const Avatar: FC<IAvatarProps> = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserAvatar: FC = () => {
  const { user } = useUser();
  const { fullName, avatar } = user?.user_metadata ?? {
    fullName: "",
    avatar: "",
  };

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
