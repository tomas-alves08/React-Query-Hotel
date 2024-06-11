import { FC } from "react";

interface IEmptyProps {
  resource: string;
}

const Empty: FC<IEmptyProps> = ({ resource }) => {
  return <p>No {resource} could be found.</p>;
};

export default Empty;
