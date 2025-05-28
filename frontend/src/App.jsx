import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute"; // create this file
import Home from "./components/home/Home";
import ProductDetail from "./components/ProductDetails";
import AddProductForm from "./components/AddProduct";
import AdminLogin from "./components/admin/AdminLogin";
import AdmNavbar from "./components/admin/Sidebar";
import ProductTable from "./components/admin/ProductTable";
import { Slide, ToastContainer } from "react-toastify";
import UpdateProduct from "./components/admin/ProductUpdate";

function App() {
  const user = useSelector((state) => state.auth.admin);
  const isAdmin = user && user.role === "admin";

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admlogin" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route element={<AdminProtectedRoute isAdmin={isAdmin} />}>
          <Route path="/admin" element={<AdmNavbar />}>
            <Route path="product" element={<ProductTable />} />
             <Route path="add-product" element={<AddProductForm />} />
              <Route path="update-product/:id" element={< UpdateProduct/>} />
          </Route>
        </Route>
      </Routes>

     <ToastContainer
                 autoClose={1000}
                 position="bottom-right"
                 hideProgressBar={true}
                 closeOnClick
                 pauseOnHover
                 draggable
                 theme="colored"
                 newestOnTop
                 transition={Slide}
                 toastStyle={{
                   width: "auto",
                   maxWidth: "90%",
                   padding: "10px 20px",
                   wordBreak: "break-word",
                 }}
               />
    </>
  );
}

export default App;
