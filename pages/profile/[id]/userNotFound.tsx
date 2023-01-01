import React from "react";
import Image from "next/image";
import notfound from "../../../assets/images/notfound.png";
import Link from "next/link";
import Button from "../../../components/global/Button";

const UserNotFound = () => {
  return (
    <div className="flex w-full items-center justify-center flex-col mt-[100px]">
      <Image
        priority={false}
        src={notfound}
        alt="notfound"
        width={150}
        className="mb-8"
      />
      <h1 className="text-white text-[30px]">
        Dang, this user can&apos;t be found.
      </h1>
      <p className="text-content">
        He could be banned or deleted, or maybe he just never existed.
      </p>
      <Link href={"/browse"}>
        <Button normal={false} className="bg-primary mt-5">
          Go back browsing
        </Button>
      </Link>
    </div>
  );
};

export default UserNotFound;
