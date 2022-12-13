import Context from "../components/pages/home/Context";
import Layout from "../components/global/Layout";

const Home = () => {
  return (
    <>
      <Context />
    </>
  );
};

export default Home;

Home.getLayout = (page: any) => <Layout>{page}</Layout>;
