import { FC, ReactElement, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../features/authentication/useLogin";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

interface IFullPageProps {
  children: ReactNode;
}
const FullPage: FC<IFullPageProps> = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

interface IProtectedRouteProps {
  children: ReactElement;
}
const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;

  return null;
};

export default ProtectedRoute;
