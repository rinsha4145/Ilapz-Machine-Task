import React, {  useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import {  setProduct } from "../redux/features/Product";

function ProductList() {

   const dispatch = useDispatch();
  const products = useSelector((state) => state.product);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      dispatch(setProduct(res.data));
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <div className="mx-auto max-w-screen-2xl">
        <main className="grid grid-cols-2 gap-x-6 gap-y-10 px-2 pb-20 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-4 lg:px-0">
          {products.map((product,index) => (
            <article className="relative" key={index}>
              <div className="aspect-square overflow-hidden">
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                    src={product.image[0]}
                    alt=""
                  />
                </Link>
              </div>
              <div className="absolute top-0 m-1 rounded-full bg-white">
                <p className="rounded-full bg-red-600 p-1 text-[10px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                  offer
                </p>
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div className="">
                  <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                    <a href="#" title="" className="">
                     {product.shortname}
                      <span className="absolute" aria-hidden="true"></span>
                    </a>
                  </h3>
                  
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
