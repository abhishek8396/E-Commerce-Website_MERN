import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout/Layout";
import AdminMenu from "../../Component/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../Component/Form/CategoryForm";
import  { Modal } from "antd"

const AdminCategory = () => {
  const [categorys, setCategorys] = useState([]);
  const [name, setName]=useState("")
  const [visible, setVisible]= useState(false)
  const [selected, setSelected]= useState(null);
  const [updatename, setUpdatename]= useState("")
  //handleform
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const {data}= await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {name})
      if(data?.success){
        toast.success(`${name} is created`)
        getallCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in input form")
    }
  }

  //Get All Category
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
      toast.error("Something went wrong in getting Category");
    }
  };
  useEffect(() => {
    getallCategory();
  },[]);
  //Update Category
  const handleUpdate=async(e)=>{
    e.preventDefault()
    try {
      const {data}= await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {name:updatename})
      if(data.success){
        toast.success(`${updatename} is UpdateName`)
        setSelected(null)
        setUpdatename("")
        setVisible(false)
        getallCategory();
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  //Delete Category
  const handleDelete=async(pId)=>{
   
    try {
      const {data}= await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`, {name:updatename})
      if(data.success){
        toast.success(`Category is Deleted`)
        getallCategory()
        
        
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }


  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Admin Category</h1>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {categorys.map((e) =>(
                      <>
                  <tr>
                    
                      <td key={e._id}>{e.name}</td>
                      <td>
                        <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true); setUpdatename(e.name);setSelected(e)}}>Edit</button>
                        <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(e._id)}}>Delete</button>
                      </td>
                    
                  </tr>
                  </>
                    ))}
                  
                </tbody>
              </table>
            </div>
            <Modal
             onCancel={()=>setVisible(false)} 
             footer={null} 
             open={visible}>
              <CategoryForm value={updatename} setValue={setUpdatename} handleSubmit={handleUpdate}/>
             </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCategory;
