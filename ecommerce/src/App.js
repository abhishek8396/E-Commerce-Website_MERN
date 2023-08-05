import {Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import PageNotFound from './Pages/PageNotFound';
import Register from './Pages/Authorization/Register';
import Login from './Pages/Authorization/Login';
import Dashboard from './Pages/User/Dashboard';
import PrivateRoute from './Component/Routes/Private';
import Forgotpassword from './Pages/Authorization/Forgetpassword';
import AdminRoute from './Component/Routes/AdminRoute';
import Admin from './Pages/Admin/Admin';
import AdminCategory from './Pages/Admin/AdminCategory';
import CreateProductAdmin from './Pages/Admin/CreateProductAdmin';
import Users from './Pages/Admin/Users';
import Profile from './Pages/User/Profile';
import Orders from './Pages/User/Orders';
import CreateProduct from './Pages/Admin/CreateProduct';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import Search from './Pages/Search';
import ProductDetails from './Pages/ProductDetail';
import Categories from './Pages/Categories';
import CategoryProduct from './Pages/CategoryProducts';
import CartPage from './Pages/CartPage';
import AdminOrders from './Pages/Admin/AdminOrders';




function App() {
  return (
    <>
     <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/product/:slug' element={<ProductDetails/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/category/:slug' element={<CategoryProduct/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<Dashboard/>}/>
            <Route path='user/profile' element={<Profile/>}/>
            <Route path='user/orders' element={<Orders/>}/>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<Admin/>}/>
          <Route path='admin/create-category' element={<AdminCategory/>}/>
          <Route path='admin/create-product' element={<CreateProductAdmin/>}/>
          <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
          <Route path='admin/products' element={<CreateProduct/>}/>
          <Route path='admin/users' element={<Users/>}/>
          <Route path='admin/orders' element={<AdminOrders/>}/>
        </Route>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/policy' element={<Policy/>}/>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<Forgotpassword/>}/>
        
        
        
     
        
     </Routes>
    </>
  );
}

export default App;
