import React, { useEffect, useState } from "react";
import AdminMenu from "../../Component/Layout/AdminMenu";
import Layout from "../../Component/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const [product, setProduct] = useState([]);

  //Get All Product
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProduct(data.product);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product Lists</h1>
          <div className="d-flex flex-wrap">
          {product?.map((item) => (
            <Link key={item._id} 
            to={`/dashboard/admin/product/${item.slug}`}
            className="product-link">
                <div className="card m-3" style={{ width: "18rem" }} >
              <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <h5>{item.price}</h5>
                <p className="card-text">
                  {item.description}
                </p>
              </div>
            </div>
            </Link>
            
          ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
