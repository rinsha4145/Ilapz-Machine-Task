import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object({
  category: Yup.string().required("Required"),
  shortname: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  brand: Yup.string().required("Required"),
  collections: Yup.string().required("Required"),
  heightCM: Yup.number().required("Required"),
  widthCM: Yup.number().required("Required"),
  depthCM: Yup.number().required("Required"),
  heightInch: Yup.number().required("Required"),
  widthInch: Yup.number().required("Required"),
  depthInch: Yup.number().required("Required"),
  type: Yup.string().required("Required"),
  seatingheight: Yup.number().required("Required"),
  weight: Yup.number().required("Required"),
  price: Yup.number().required("Required"),
  oldprice: Yup.number().required("Required"),
  off: Yup.number().min(0).max(100),
  material: Yup.string().required("Required"),
});

const UpdateProduct = () => {
  const { id } = useParams(); // get ID from URL
  const [initialValues, setInitialValues] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const data = res.data;

       const parseDimensions = (str) => {
  if (!str) return [0, 0, 0];
  return str
    .split('x')                    // split by 'x'
    .map(part => part.trim())      // trim spaces
    .map(part => {
      const match = part.match(/[\d.]+/);  // extract number
      return match ? parseFloat(match[0]) : 0;
    });
}

const [hCM, wCM, dCM] = parseDimensions(data.dimensionscm);
const [hIn, wIn, dIn] = parseDimensions(data.dimensionsinch);

        setInitialValues({
          category: data.category || "",
          shortname: data.shortname || "",
          name: data.name || "",
          brand: data.brand || "",
          collections: data.collections || "",
          heightCM: hCM || "",
          widthCM: wCM || "",
          depthCM: dCM || "",
          heightInch: hIn || "",
          widthInch: wIn || "",
          depthInch: dIn || "",
          type: data.type || "",
          seatingheight: data.seatingheight || "",
          weight: data.weight || "",
          price: data.price || "",
          oldprice: data.oldprice || "",
          off: data.off || 0,
          material: data.material || "",
        });

        if (data.image) {
          const loadedImages = data.image.map((url, index) => ({
            id: index,
            preview: url,
            file: null,
            name: `existing-${index}`,
          }));
          setImages(loadedImages);
        }
      } catch (err) {
        toast.error("Failed to load product details.",err);
      }
    };

    fetchProduct();
  }, [id]);

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

  const handleSubmit = async (values) => {
    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setLoading(true);

    try {
      const dimensionscm = `H ${values.heightCM} x W ${values.widthCM} x D ${values.depthCM}`;
      const dimensionsinch = `H ${values.heightInch} x W ${values.widthInch} x D ${values.depthInch}`;

      const formData = new FormData();

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
      }).forEach(([key, value]) => formData.append(key, value));

      images.forEach((img) => {
        if (img.file) {
          formData.append("image", img.file);
        } else {
          formData.append("existingImage", img.preview); // Assuming backend handles these
        }
      });

      const response = await api.put(`/products/update/${id}`, formData);

      if (response.status !== 200) throw new Error("Failed to update product");

      toast.success("Product updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!initialValues) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Product</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["category", "shortname", "name", "brand", "collections", "type"].map((field) => (
                <TextField
                  key={field}
                  name={field}
                  label={field}
                  value={values[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched[field] && Boolean(errors[field])}
                  helperText={touched[field] && errors[field]}
                  fullWidth
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {["heightCM", "widthCM", "depthCM", "heightInch", "widthInch", "depthInch"].map((field) => (
                <TextField
                  key={field}
                  name={field}
                  label={field}
                  value={values[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched[field] && Boolean(errors[field])}
                  helperText={touched[field] && errors[field]}
                  fullWidth
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {["seatingheight", "weight", "material", "price", "oldprice", "off"].map((field) => (
                <TextField
                  key={field}
                  name={field}
                  label={field}
                  value={values[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched[field] && Boolean(errors[field])}
                  helperText={touched[field] && errors[field]}
                  fullWidth
                />
              ))}
            </div>

            {/* Image Upload */}
            <div>
              <label className="font-medium">Images</label>
              <input type="file" multiple onChange={handleImageAdd} />
              <div className="flex gap-4 mt-2 flex-wrap">
                {images.map((img) => (
                  <div key={img.id} className="relative">
                    <img
                      src={img.preview}
                      alt="preview"
                      className="w-24 h-24 object-cover border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProduct;
