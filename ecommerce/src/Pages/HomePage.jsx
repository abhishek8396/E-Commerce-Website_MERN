import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout/Layout";
import { useAuth } from "../Context API/Auth";
import axios from "axios";
import {Checkbox, Radio} from "antd";
import "../Style/HomePage.css"
import Prices from "../Component/Prices";
import { useNavigate } from "react-router-dom";
import Slider from "../Slider/Slider";
import { useCart } from "../Context API/Cart";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [cart, setCart]= useCart()
  const navigate= useNavigate()
  const [auth, setAuth] = useAuth();
  const [product, setProduct] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [checked, setChecked]= useState([]);
  const [radio, setRadio]= useState([])
  
  
  

  

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategorys(data?.category);
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  useEffect(() => {
    getallCategory();
  },[]);


 

  const getAllProducts = async () => {
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };


   
  


  //Filter by Catergory
  const handleFilter=(value, id)=>{
    let all= [...checked]
    if(value){
      all.push(id)
    }else{
      all=all.filter((item) => item!==id)
    }
    setChecked(all)
  }
  useEffect(() => {
    if(!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(()=>{
    if(checked.length || radio.length) filterProduct()
  },[checked, radio])

  //Get Filter Product
  const filterProduct=async(req,res)=>{
    try {
        const {data}= await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`,{checked,radio})
        setProduct(data?.products)      
    } catch (error) {
      console.log(error)
    }
  }

 


  
  return (
    <Layout>
      <Slider/>
      
      <div className="container-fluid row mt-3 home-page">
      <div className="row mt-3 filters">
        <div className="col-md-3">
          <h3 className="text-center">Filter By Category</h3>
          <div className="d-flex flex-column m-2">
          {categorys?.map((item)=>(
            <Checkbox key={item._id} onChange={(e)=>handleFilter(e.target.checked, item._id)}>
              {item.name}
            </Checkbox>
          ))}
          
          </div>
          {/* PRICE FILTER */}
          <h3 className="text-center mt-4">Filter By Price</h3>
          <div className="d-flex flex-column ">
          <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
            {Prices?.map((item)=>(
              <div key={item._id}>
                <Radio value={item.array}>{`₹ ${item.name}`}</Radio>
              </div>
              
            ))}
          </Radio.Group>
          </div>
          <div className="d-flex flex-column ">
          <button className="btn btn-danger" onClick={()=>window.location.reload()}>RESET FILTER</button>
          </div>
        </div>
        <div className="col-md-9">
    
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {product?.map((item) => (
              <div className="card m-2" style={{ width: "18em"}} >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>

                  <p className="card-text">{item.description}</p>
                  <p className="card-text">₹ {item.price}</p>
                  <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${item.slug}`)}>DETAILS</button>
                  <button className="btn btn-secondary ms-1" 
                  onClick={()=>{setCart([...cart, item])
                    localStorage.setItem('cart', JSON.stringify([...cart, item]))
                  toast.success("Item is Added To Cart")}}>
                    Add TO CART
                    </button>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default HomePage;
