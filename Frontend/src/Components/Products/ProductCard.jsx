import { useContext, useState } from "react";
import Products from "../Shop/Products";
import style from "./ProductCard.module.css";
import { CartListData } from "../../Store/cart-list-store";
import { Star, StarHalf } from "lucide-react";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartListData);
  const discountedPrice = product.price - product.discount;

  return (
    <div
      className={`flex flex-row gap-5 w-[95vw] h-50 rounded-lg overflow-hidden ${style.cardColor}`}
    >
      <div className="w-1/4 relative border-r-2 border-gray-400 flex items-center justify-center">
        {product.image ? (
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.name}
            className="w-25 object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            No Image
          </div>
        )}
      </div>
      <div className="w-3/4 px-4 py-4 h-20">
        <div className="font-bold text-sm mb-2">{product.name}</div>
        <p className="text-base mb-2">
          {product.discount > 0 ? (
            <>
              <span className="line-through">
                {formatCurrency(product.price)}
              </span>
              <span className="ml-2 text-sm font-bold">
                {formatCurrency(discountedPrice)}
              </span>
              <span className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded">
                {product.discount}Rs/ OFF
              </span>
            </>
          ) : (
            <span className="font-bold">{formatCurrency(product.price)}</span>
          )}
        </p>
        <div><strong>Description : </strong></div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          totam quis qui autem tempora optio nisi sint, corporis quo aliquam
          voluptatem nemo delectus dicta illo?
        </p>
        <div className="flex items-center gap-2">
          <strong>Ratings : </strong>
          <Star size={20} className="text-yellow-500" />
          <Star size={20} className="text-yellow-500" />
          <Star size={20} className="text-yellow-500" />
          <StarHalf size={20} className="text-yellow-500" />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={(event) => addToCart(product)}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;