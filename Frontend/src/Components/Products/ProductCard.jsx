import { Star, StarHalf } from "lucide-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addToCart } from "../../services/api/cartApi"
import { useNavigate } from "react-router-dom"

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

const ProductCard = ({ product }) => {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      console.log("Add to cart");
      dispatch(addToCart(product));
      navigate("/cart");
    } catch (err) {
      setError(err?.message || "Failed to add to cart");
    }
  };
  const discount = (product.discount / 100) * product.price
  const discountedPrice = product.price - discount

  return (
    <>
    {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    )}
    <div className="flex flex-col sm:flex-row w-full max-w- rounded-lg overflow-hidden border border-gray-200 shadow-md bg-white">
      {/* Image container - full width on mobile, 1/4 on tablet+ */}
      <div className="w-full sm:w-1/3 md:w-1/4 relative border-b sm:border-b-0 sm:border-r border-gray-200 flex items-center justify-center p-4">
        {product.image ? (
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.name}
            className="w-30 max-h-48 lg:max-h-40 sm:max-h-full object-contain"
          />
        ) : (
          <div className="w-full aspect-square max-h-48 sm:max-h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
            No Image Available
          </div>
        )}
      </div>

      {/* Content container */}
      <div className="flex flex-col w-full sm:w-2/3 md:w-3/4 p-4">
        <div className="flex-grow">
          {/* Product name */}
          <h3 className="font-bold text-lg mb-2">{product.name}</h3>

          {/* Price information */}
          <p className="text-base mb-3">
            {product.discount > 0 ? (
              <span className="flex flex-wrap items-center gap-2">
                <span className="line-through text-gray-500">{formatCurrency(product.price)}</span>
                <span className="font-bold text-primary">{formatCurrency(discountedPrice)}</span>
                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">{product.discount}% OFF</span>
              </span>
            ) : (
              <span className="font-bold">{formatCurrency(product.price)}</span>
            )}
          </p>

          {/* Description */}
          <div className="mb-1">
            <strong>Description:</strong>
          </div>
          <p className="text-sm text-gray-600 mb-3 line-clamp-3 sm:line-clamp-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti totam quis qui autem tempora optio nisi
            sint, corporis quo aliquam voluptatem nemo delectus dicta illo?
          </p>

          {/* Ratings */}
          <div className="flex items-center gap-1 mb-4">
            <strong className="text-sm mr-1">Ratings:</strong>
            <Star size={16} className="text-yellow-500" />
            <Star size={16} className="text-yellow-500" />
            <Star size={16} className="text-yellow-500" />
            <StarHalf size={16} className="text-yellow-500" />
          </div>
        </div>

        {/* Add to cart button */}
        <div className="mt-auto">
          <button
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded transition-colors"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductCard

