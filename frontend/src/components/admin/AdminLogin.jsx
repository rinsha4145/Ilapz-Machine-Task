import { Formik, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { initAdminFromCookie, loginAdmin } from "../../redux/actions/Admin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (values) => {
    console.log(values);
    const result = await dispatch(loginAdmin(values));
    if (result.error) {
      console.log("Error:", result.error.message);
    }
    navigate("/admin/product");
  };
  useEffect(() => {
    initAdminFromCookie(dispatch);
  }, [dispatch]);
  // Validate form
  const validation = Yup.object({
    email: Yup.string()
      .email("*Invalid email format")
      .required("*Email is required"),
    password: Yup.string()
      .min(4, "*Password must be at least 4 characters long")
      .required("*Password is required"),
  });
  // Check if user is logged in

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Background Container */}
      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-vector/contemporary-home-furniture-hand-drawn-vector-seamless-pattern-home-interior-design-elements-backdrop-modern-house-furnishing-accessories-background-vintage-armchair-coffee-table-texture_198278-8788.jpg?uid=R172230385&ga=GA1.1.1354253711.1741751599&semt=ais_hybrid&w=740')",
          backgroundSize:"cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      ></div>

      {/* Wrapper */}
      <div className="flex flex-wrap lg:flex-nowrap w-full max-w-5xl rounded-lg overflow-hidden z-50">
        {/* Left Section */}
        <div className="w-full flex lg:w-1/2  flex-col items-center justify-center p-6 bg-transparent">
          <h1 className="text-7xl text-red-700 font-bold">furnify</h1>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-gray-700"></div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl text-white font-semibold mb-2">Welcome</h2>
          <p className="text-sm  mb-6">Please login to Admin Dashboard.</p>

          {/* Login Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validation}
            onSubmit={handleSignIn} // pass the function directly
          >
            {({ handleSubmit }) => (
              <form
                className="flex flex-col gap-3 w-full max-w-md"
                onSubmit={handleSubmit}
              >
                <Field name="email">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>

                <Field name="password">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>

                <button
                  type="submit"
                  className="rounded-md border-2 border-blue-500 px-4 py-2 text-blue-600 font-medium hover:bg-blue-500 hover:text-white transition"
                >
                  LOGIN
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
