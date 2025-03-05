const ProductCard = ({ title, price, imageUrl, description }) => {
    return (
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 hover:shadow-xl transition-shadow duration-300">
        <img 
          className="w-full h-48 object-cover" 
          src={imageUrl} 
          alt={title}
        />
        <div className="px-6 py-4">
          <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600 text-base line-clamp-2">{description}</p>
        </div>
        <div className="px-6 pt-2 pb-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-green-600">${price}</span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition-colors duration-200">
            Add to 
          </button>
        </div>
      </div>
    );
  };
  
  
  export default ProductCard;