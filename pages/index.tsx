import { useRouter } from "next/router";

const Redirect = () => {
  const router = useRouter();
  if (typeof window !== "undefined") router.replace("/authentication/login");
  return <></>;
};

export default Redirect;
