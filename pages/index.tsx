import Content from "../components/pages/home/content";
import Layout from "../components/global/Layout";

const Home = () => {
  return (
    <>
      <Content />
    </>
  );
};

export default Home;

Home.getLayout = (page: any) => <Layout>{page}</Layout>;
