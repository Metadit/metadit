import React from "react";
import { SpinnerCircular } from "spinners-react";

const Loading = () => {
  return (
    <div className="flex justify-center w-full">
      <SpinnerCircular
        size={30}
        thickness={100}
        speed={150}
        color="white"
        secondaryColor="transparent"
      />
    </div>
  );
};

export default Loading;
