import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../app/features/product/productThunk';
import TruckLoader from '../Partials/Loader';

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "loading" ? (
        <TruckLoader />
      ) : status === "failed" ? (
        <p>Error: {error}</p>
      ) : !Array.isArray(products) ? (
        <p>No products available</p>
      ) : (
        <div className="container w-full mx-auto px-4 py-8 bg-gray-50">
          <div className="flex flex-col gap-4 flex-wrap justify-center items-center">
            {products.map((product) => (
              <React.Fragment key={product._id}>
                  <ProductCard product={product} />
                <div className='w-full bg-black h-[1px]'></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;