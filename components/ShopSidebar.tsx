import {
  faChevronRight,
  faUser,
  faPaintBrush,
  faShieldAlt,
  faSignOutAlt,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Auth from "../util/auth";

const ShopSidebar = () => {
  const { setToken, setKeychain } = Auth.useContainer();

  return (
    <div className="w-72 bg-primary-sidebar dark:bg-primary-sidebar-dark p-5 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-5">Isometric Shop</h1>
      <div className="flex flex-col gap-5 w-64 bg-primary-sidebar dark:bg-primary-sidebar-dark flex-1">
        <Link href="/app/store/themes">
          <a>
            <div className="flex gap-3 w-full items-center">
              <div className="rounded-xl w-9 h-9 flex items-center justify-center bg-inndigo">
                <FontAwesomeIcon icon={faPaintBrush} />
              </div>
              <div className="flex flex-col">
                <p className="font-medium">Themes</p>
              </div>
              <FontAwesomeIcon icon={faChevronRight} className="ml-auto mr-3" />
            </div>
          </a>
        </Link>
        <Link href="/app/shop/integrations">
          <div className="flex gap-3 w-full items-center">
            <div className="rounded-xl w-9 h-9 flex items-center justify-center bg-secondary">
              <FontAwesomeIcon icon={faShieldAlt} />
            </div>
            <div className="flex flex-col">
              <p className="font-medium">Integrations</p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="ml-auto mr-3" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ShopSidebar;
