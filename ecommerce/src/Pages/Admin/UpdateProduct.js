import React, { useEffect, useState } from 'react'
import Layout from '../../Component/Layout/Layout'
import AdminMenu from '../../Component/Layout/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import {Select} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
const {Option}= Select
const UpdateProduct = () => {
    const navigate= useNavigate();
    const params= useParams();
    const [categorys, setCategorys]= useState([])
    const [category, setCategory]= useState("")
    const [photo, setPhoto]= useState("")
    const [name, setName]= useState("")
    const [description, setDescription]= useState("")
    const [price, setPrice]= useState("")
    const [quantity, setQuantity]= useState("")
    const [shipping, setShipping]= useState("")
    const [id, setId]= useState("")

    //Get Single Product
    const getSingleProduct=async()=>{
        try {
            const {data}= await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`)
            setName(data.product.name)
           
      setDescription(data.product.description);
      setId(data.product._id);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    useEffect(()=>{
        getSingleProduct()
        //eslint-disable-next-line
    },[])






    //get all Category
    const getallCategory = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/category/get-category`
        );
        if (data?.success) {
          setCategorys(data?.category);
         
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting Category");
       
      }
    };
    useEffect(() => {
      getallCategory();
    },[]);


    //Create Product Function
    const handleUpdate=async(e)=>{
      e.preventDefault()
      try {
        const productData= new FormData()
        productData.append("name", name)
        productData.append("description", description)
        productData.append("price", price)
        productData.append("quantity", quantity)
        productData.append("shipping", shipping)
        photo && productData.append("photo", photo)
        productData.append("category", category)
        const {data}= axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData)
        if(data?.success){
  
        toast.error("Something wend wrong")
          
        }else{
          toast.success("Product Update successfully")
          navigate("/dashboard/admin/products")
        }
      } catch (error) {
        console.log(error)
        toast.error("Something wend wrong")
      }
    }
    const handleDelete=async()=>{
      try {
        const {data}= await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
        toast.success('Product Delete Successfully')
        navigate("/dashboard/admin/products")
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1>UPDATE PRODUCT</h1>
                <div className='m-1 w-75'>
                  <Select bordered={false} 
                  placeholder="Select a Category" 
                  size='large' 
                  showSearch 
                  className='form-select mb-3' 
                  onChange={(value)=>{setCategory(value)}}
                  value={category}>
                      {categorys?.map((e)=>(
                        <Option key={e._id} value={e._id}>{e.name}</Option>
                      ))}
                  </Select>
                  <div className='mb-3'>
                    <label className='btn btn-outline-secondary col-md-12'>
                      {photo ? photo.name : "Upload Photo"}
                    <input type='file' 
                    name='photo'
                    accept='image/*' 
                    onChange={(e)=>setPhoto(e.target.files[0])}
                    hidden/>
                    </label>
                   
                  </div>
                  <div className='mb-3'>
                    {photo ? (
                      <div className='text-center'>
                        <img src={URL.createObjectURL(photo)}
                        alt='Product_Photo'
                        height={"200px"}
                        className='img img-responsive'/>
                      </div>
                    ) : (
                        <div className='text-center'>
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                        alt='Product_Photo'
                        height={"200px"}
                        className='img img-responsive'/>
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <input type='text'
                    value={name}
                    placeholder='Enter Product Name'
                    className='form-control'
                    onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <textarea type='text'
                    value={description}
                    placeholder='Enter Product Description'
                    className='form-control'
                    onChange={(e)=>setDescription(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <input type='number'
                    value={price}
                    placeholder='Enter Product Price'
                    className='form-control'
                    onChange={(e)=>setPrice(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <input type='number'
                    value={quantity}
                    placeholder='Enter Product Quantity'
                    className='form-control'
                    onChange={(e)=>setQuantity(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping? "Yes":"No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
                  <div className='mb-3'>
                    <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PRODUCT</button>
                  </div>
                </div>
                <div>
                  <div className='mb-3'>
                    <button className='btn btn-primary' onClick={handleDelete}>DELETE PRODUCT</button>
                  </div>
                </div>
            </div>
        </div>
        </div>
    </Layout>
      

  )
}

export default UpdateProduct
