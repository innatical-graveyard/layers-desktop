import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: { destination: "/authentication/login", permanent: false },
  };
};

const Redirect = () => {
  const router = useRouter();
  if (typeof window !== "undefined") router.replace("/authentication/login");
  return <></>;
};

export default Redirect;
