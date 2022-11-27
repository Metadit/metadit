import React from "react";
import { SpinnerCircular } from "spinners-react";

interface Props {
  size?: number;
}

const Loading = ({ size }: Props) => {
  return (
    <div className="flex justify-center w-full">
      <SpinnerCircular
        size={size || 30}
        thickness={100}
        speed={150}
        color="white"
        secondaryColor="transparent"
      />
    </div>
  );
};

export default Loading;
