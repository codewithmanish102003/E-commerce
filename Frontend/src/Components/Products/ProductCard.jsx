const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }
  
  const ProductCard = ({ product }) => {
    const discountedPrice = product.price - product.discount
  
    return (
      <div className="flex flex-row gap-5 w-[95vw] h-50 rounded-lg overflow-hidden">

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
        <div className="w-3/4 px-4 py-4 h-20" >
          <div className="font-bold text-sm mb-2">{product.name}</div>
          <p className="text-base mb-2">
            {product.discount > 0 ? (
              <>
                <span className="line-through">{formatCurrency(product.price)}</span>
                <span className="ml-2 text-sm font-bold">{formatCurrency(discountedPrice)}</span>
                <span className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded">{product.discount}Rs/ OFF</span>
              </>
            ) : (
              <span className="font-bold">{formatCurrency(product.price)}</span>
            )}
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti totam quis qui autem tempora optio nisi sint, corporis quo aliquam voluptatem nemo delectus dicta illo?
          </p>
        </div>
      </div>
    )
  }
  
  export default ProductCard
  
  