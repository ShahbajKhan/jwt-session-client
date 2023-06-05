import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const dashboardLinks = [
    { link: `/dashboard/all-orders`, label: "All Orders" },
    { link: `/dashboard/all-users`, label: "All Users" },
    { link: `/`, label: "Back to Home" },
  ];
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white flex flex-col items-center justify-center w-64">
        {/* Sidebar Content */}
        <div className="p-4">
          <h1 className="text-2xl font-bold">{user?.email}</h1>
          <ul className="mt-4">
            {dashboardLinks?.map((link) => (
              <li key={link?.label} className="mb-2">
                <Link
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-2 py-1 rounded-md block"
                  to={link.link}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Content goes here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
