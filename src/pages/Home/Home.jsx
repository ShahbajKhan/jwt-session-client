import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { technologies } = useLoaderData();
  const axiosSecure = useAxiosSecure();
  console.log(technologies);
  const handleAddToCart = (technology) => {
    /**
     * the technology contains a _id.
     * if you insert it along with the object you will get a duplicate id error from mongodb.
     * since mongodb uniquely identifies a document via _id filed.
     * Copy this id in another property and then
     * delete it before you insert it to db.
     * Else mongodb won't be able to create an unique id for you purchased product.
     **/
    const technologyId = technology._id;
    delete technology._id;
    const postData = {
      ...technology,
      technologyId,
      purchasedBy: user?.email,
    };
    axiosSecure
      .post(`/add-to-cart`, postData)
      .then((data) => {
        console.log(data?.data);
        data?.data.insertedId && toast.success(`Successfully added to cart.`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
    return;
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {technologies?.map((technology) => (
          <ProductCard
            key={technology._id}
            product={technology}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

// fetch(`http://localhost:5000/add-to-cart`, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("access-token")}`,
//       },
//       body: JSON.stringify({
//         ...technology,
//         technologyId,
//         purchasedBy: user?.email,
//       }),
//     })
//       .then((res) => res.json())
