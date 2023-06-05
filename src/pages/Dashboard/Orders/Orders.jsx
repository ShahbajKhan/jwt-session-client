import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Table, { Row } from "../../../components/reusable/Table";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:5000/all-orders`)
      .then((res) => res.json())
      .then((data) => {
        setCartData(data[0].documents);
        setCartCount(data[0].totalCount[0].count);
      });
  }, [user]);
  const cols = [
    { label: "Purchased By", value: "purchased By" },
    { label: "Product", value: "Product" },
    { label: "Price", value: "Price" },
    { label: "Actions", value: "Actions" },
  ];
  return (
    <div>
      <h1 className="font-bold text-3xl text-center">
        Total Orders: {cartCount}
      </h1>
      <Table cols={cols}>
        {cartData.map((singleProduct) => (
          <Row key={singleProduct._id}>
            <td className="py-3 px-6 text-left ">
              <div className="flex items-center ">
                <span className="font-medium">{singleProduct.purchasedBy}</span>
              </div>
            </td>
            <td className="py-3 px-6 text-left ">
              <div className="flex items-center ">
                <span className="font-medium">{singleProduct.model}</span>
              </div>
            </td>
            <td className="py-3 px-6 text-left ">
              <div className="flex items-center ">
                <span className="font-medium">{singleProduct.price} Taka</span>
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

export default Orders;
