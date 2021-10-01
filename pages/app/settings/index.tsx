import SettingsSidebar from "../../../components/SettingsSidebar";
import { useAuthedPage } from "../../../util/auth";

const Settings = () => {
  useAuthedPage();

  return <SettingsSidebar />;
};

export default Settings;
