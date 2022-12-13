import Button from "../components/global/Button";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import notfound from "../assets/images/notfound.png";
import Image from "next/image";
import Layout from "../components/global/Layout";

const NotFoundPage = () => {
  return (
    <div className="flex w-full items-center justify-center flex-col mt-[100px]">
      <Image
        priority={false}
        src={notfound}
        alt="notfound"
        width={150}
        className="mb-8"
      />
      <h1 className="text-white text-[30px]">Oops sorry...you hit 404</h1>
      <p className="text-content">
        You're at the lost district, let's get you out.
      </p>
      <Link href={"/"}>
        <Button normal={false} className="bg-primary mt-5">
          <FontAwesomeIcon icon={faHome} />
          Go back home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;

NotFoundPage.getLayout = (page: any) => <Layout>{page}</Layout>;
