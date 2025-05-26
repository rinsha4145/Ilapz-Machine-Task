import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import api, { socket } from "../utils/api";

function ProductList() {

  // Fetch all products or search results
  
    const [products, setProducts] = useState([]);

    const dispatch=useDispatch()
  const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    dispatch(setProducts(res.data)); 
  } catch (err) {
    console.error('Failed to load products', err);
  }
};

useEffect(() => {
  fetchProducts();
}, []);

  // Real-time update listeners
  useEffect(() => {
    // Listen for product added event
    socket.on("productAdded", (newProduct) => {
      setProducts((prev) => [newProduct, ...prev]);
    });

    // Listen for product updated event
    socket.on("productUpdated", (updatedProduct) => {
      setProducts((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      );
    });

    // Cleanup on unmount
    return () => {
      socket.off("productAdded");
      socket.off("productUpdated");
    };
  }, [socket]);

  return (
    <>
      <div className="mx-auto max-w-screen-2xl">
        <main className="grid grid-cols-2 gap-x-6 gap-y-10 px-2 pb-20 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-4 lg:px-0">
          {products.map((product) => (
            <article className="relative">
              <div className="aspect-square overflow-hidden">
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                    src={product.image}
                    alt=""
                  />
                </Link>
              </div>
              <div className="absolute top-0 m-1 rounded-full bg-white">
                <p className="rounded-full bg-black p-1 text-[10px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                  Sale
                </p>
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div className="">
                  <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                    <a href="#" title="" className="">
                      Arabian Musk
                      <span className="absolute" aria-hidden="true"></span>
                    </a>
                  </h3>
                  <div className="mt-2 flex items-center">
                    <svg
                      className="block h-3 w-3 align-middle text-pink-600 sm:h-4 sm:w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        className=""
                      ></path>
                    </svg>
                    <svg
                      className="block h-3 w-3 align-middle text-pink-600 sm:h-4 sm:w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        className=""
                      ></path>
                    </svg>
                    <svg
                      className="block h-3 w-3 align-middle text-pink-600 sm:h-4 sm:w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        className=""
                      ></path>
                    </svg>
                    <svg
                      className="block h-3 w-3 align-middle text-pink-600 sm:h-4 sm:w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        className=""
                      ></path>
                    </svg>
                    <svg
                      className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        className=""
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="text-right">
                  <del className="mt-px text-xs font-semibold text-gray-600 sm:text-sm">
                    {" "}
                    {product.oldprice}{" "}
                  </del>
                  <p className="text-xs font-normal sm:text-sm md:text-base">
                    {product.price}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>
    </>
  );
}

export default ProductList;
