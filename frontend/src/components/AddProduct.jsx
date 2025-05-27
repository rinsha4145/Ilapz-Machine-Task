import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "@mui/material";
import { Upload, X, Plus, AlertCircle, CheckCircle } from "lucide-react";
import * as Yup from "yup";
import api, { socket } from "../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addProductToList } from "../redux/features/Product";

const validationSchema = Yup.object({
  category: Yup.string().required("Required"),
  shortname: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  brand: Yup.string().required("Required"),
  collections: Yup.string().required("Required"),
  heightCM: Yup.number().required("Required").typeError("Must be a number"),
  widthCM: Yup.number().required("Required").typeError("Must be a number"),
  depthCM: Yup.number().required("Required").typeError("Must be a number"),
  heightInch: Yup.number().required("Required").typeError("Must be a number"),
  widthInch: Yup.number().required("Required").typeError("Must be a number"),
  depthInch: Yup.number().required("Required").typeError("Must be a number"),
  type: Yup.string().required("Required"),
  seatingheight: Yup.number().required("Required").typeError("Must be a number"),
  weight: Yup.number().required("Required").typeError("Must be a number"),
  price: Yup.number().required("Required").typeError("Must be a number"),
  oldprice: Yup.number().required("Required").typeError("Must be a number"),
  off: Yup.number().min(0).max(100),
  material: Yup.string().required("Required"),
});

const AddProductForm = () => {
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
const dispatch = useDispatch();
  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file,
          preview: event.target.result,
          name: file.name,
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

 const handleSubmit = async (values, { resetForm }) => {
  if (images.length === 0) {
    toast.error("Please add at least one image");
    return;
  }

  setLoading(true);


  try {
    const dimensionscm = `H ${values.heightCM} x W ${values.widthCM} x D ${values.depthCM}`;
    const dimensionsinch = `H ${values.heightInch} x W ${values.widthInch} x D ${values.depthInch}`;

    const data = new FormData();

    Object.entries({
      category: values.category,
      shortname: values.shortname,
      name: values.name,
      brand: values.brand,
      collections: values.collections,
      dimensionscm,
      dimensionsinch,
      type: values.type,
      seatingheight: values.seatingheight,
      weight: values.weight,
      price: values.price,
      oldprice: values.oldprice,
      off: values.off || 0,
      material: values.material,
    }).forEach(([key, value]) => data.append(key, value));

    // Note: field name 'image' (singular) to match backend multer
    images.forEach((img) => {
      data.append("image", img.file);
    });

    const response = await api.post("/products/add", data);

    if (response.status !== 201) {
      throw new Error("Failed to add product");
    }

    toast.success("Product added successfully!");
    resetForm();
    setImages([]);
  } catch (error) {
    console.error("Error:", error);
    toast.error("Error adding product. Please try again.");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  socket.on("productAdded", (newProduct) => {
    console.log("Product received via socket:", newProduct);
    dispatch(addProductToList(newProduct));
  });
  return () => socket.off("productAdded");
}, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">Add New Product</h1>
          <p className="text-blue-100 mt-2">
            Fill in the details to add a new product to your inventory
          </p>
        </div>

        <div className="p-8">
          
          <Formik
            initialValues={{
              category: "",
              shortname: "",
              name: "",
              brand: "",
              collections: "",
              heightCM: "",
              widthCM: "",
              depthCM: "",
              heightInch: "",
              widthInch: "",
              depthInch: "",
              type: "",
              seatingheight: "",
              weight: "",
              price: "",
              oldprice: "",
              off: "",
              material: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["category", "shortname", "name", "brand", "collections", "type"].map(
                      (field) => (
                        <div key={field}>
                          <TextField
                            fullWidth
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={values[field]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched[field] && Boolean(errors[field])}
                            helperText={touched[field] && errors[field]}
                            
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Dimensions */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Dimensions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CM Inputs */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Dimensions (CM)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["heightCM", "widthCM", "depthCM"].map((field) => (
                          <TextField
                            key={field}
                            name={field}
                            label={field.replace("CM", " (cm)")}
                            placeholder={field.replace("CM", "")}
                            value={values[field]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched[field] && Boolean(errors[field])}
                            helperText={touched[field] && errors[field]}
                            
                          />
                        ))}
                      </div>
                    </div>

                    {/* Inch Inputs */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Dimensions (Inch)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["heightInch", "widthInch", "depthInch"].map((field) => (
                          <TextField
                            key={field}
                            name={field}
                            label={field.replace("Inch", " (in)")}
                            placeholder={field.replace("Inch", "")}
                            value={values[field]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched[field] && Boolean(errors[field])}
                            helperText={touched[field] && errors[field]}
                            
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Specifications
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TextField
                      name="seatingheight"
                      label="Seating Height"
                      type="number"
                      value={values.seatingheight}
                      onChange={handleChange}
onBlur={handleBlur}
error={touched.seatingheight && Boolean(errors.seatingheight)}
helperText={touched.seatingheight && errors.seatingheight}

/>
<TextField
name="weight"
label="Weight"
type="number"
value={values.weight}
onChange={handleChange}
onBlur={handleBlur}
error={touched.weight && Boolean(errors.weight)}
helperText={touched.weight && errors.weight}

/>
<TextField
name="material"
label="Material"
value={values.material}
onChange={handleChange}
onBlur={handleBlur}
error={touched.material && Boolean(errors.material)}
helperText={touched.material && errors.material}

/>
</div>
</div>

php-template
Copy
Edit
            {/* Pricing */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextField
                  name="price"
                  label="Price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  
                />
                <TextField
                  name="oldprice"
                  label="Old Price"
                  type="number"
                  value={values.oldprice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.oldprice && Boolean(errors.oldprice)}
                  helperText={touched.oldprice && errors.oldprice}
                  
                />
                <TextField
                  name="off"
                  label="Off (%)"
                  type="number"
                  value={values.off}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.off && Boolean(errors.off)}
                  helperText={touched.off && errors.off}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Images
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="image-upload"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 cursor-pointer transition duration-150"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Images
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageAdd}
                    className="hidden"
                  />
                  <span className="text-gray-500 text-sm">
                    You can upload multiple images.
                  </span>
                </div>
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((img) => (
                      <div
                        key={img.id}
                        className="relative border rounded-xl overflow-hidden shadow-sm group"
                      >
                        <img
                          src={img.preview}
                          alt={img.name}
                          className="w-full h-32 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-150 disabled:opacity-50"
              >
                <Plus className="w-5 h-5 mr-2" />
                {loading ? "Adding Product..." : "Add Product"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
</div>
);
};

export default AddProductForm;