import SettingsSidebar from "../../../components/SettingsSidebar";
import { serverAuthedPage, useAuthedPage } from "../../../util/auth";
export const getServerSideProps = serverAuthedPage;

const Settings = () => {
  useAuthedPage();

  return <SettingsSidebar />;
};

export default Settings;
