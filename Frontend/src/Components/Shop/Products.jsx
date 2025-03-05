import React, { useEffect } from 'react';
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
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
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
<<<<<<< HEAD
                {/* <Link to="/details"> */}
                  <ProductCard product={product} />
                {/* </Link> */}
=======
                  <ProductCard product={product} />
>>>>>>> cf033f53bf130d8818d1957bf3c5f7be2817a5f0
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