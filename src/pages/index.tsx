import Context from "../components/pages/home/Context";
import Layout from "../components/global/Layout";
import { ReactNode } from "react";

const Home = () => {
    return (
        <>
            <Context />
        </>
    );
};

export default Home;

Home.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;
