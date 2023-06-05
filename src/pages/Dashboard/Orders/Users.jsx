import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Table, { Row } from "../../../components/reusable/Table";

const Users = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:5000/all-users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data[0].documents);
        setUserCount(data[0].totalCount[0].count);
      });
  }, [user]);
  const cols = [
    { label: "Email", value: "Email" },
    { label: "Name", value: "Name" },
    { label: "User Status", value: "Status" },
    { label: "Actions", value: "Actions" },
  ];
  return (
    <div>
      <h1 className="font-bold text-3xl text-center">
        Total Users: {userCount}
      </h1>
      <Table cols={cols}>
        {users.map((user) => (
          <Row key={user._id}>
            <td className="py-3 px-6 text-left ">
              <div className="flex items-center ">
                <span className="font-medium">{user.email}</span>
              </div>
            </td>
            <td className="py-3 px-6 text-left ">
              <div className="flex items-center ">
                <span className="font-medium">{user.name}</span>
              </div>
            </td>
            <td className="py-3 px-6 text-left ">
              <div className="flex items-center ">
                <span className="font-medium">
                  {user?.status || "Nil"}
                </span>
              </div>
            </td>
            <td className="py-3 px-6 text-left ">
              <div className="flex items-center ">
                <span className="font-medium"> Actions</span>
              </div>
            </td>
          </Row>
        ))}
      </Table>
    </div>
  );
};

export default Users;
