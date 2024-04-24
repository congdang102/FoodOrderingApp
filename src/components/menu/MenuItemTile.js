import { ToastContainer, toast } from 'react-toastify';
export default function MenuItemTile({onAddToCart,item}) {
    const { image, name, description, basePrice, sizes, extraIngredientPrices } = item;
    const hasSizeOrExtras = sizes?.length ||  extraIngredientPrices?.length > 0;
    return(
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <ToastContainer />
        <div className="flex flex-col justify-between h-full">
          <div className="text-center mb-4">
            {/* Sử dụng ảnh từ localStorage nếu có */}
            {image || localStorage.getItem(`${item._id}_selectedImage`) ? (
              <img
                src={image || localStorage.getItem(`${item._id}_selectedImage`)}
                className="h-32 w-auto mx-auto mb-4 rounded-md"
                alt={name}
              />
            ) : (
              <div className="w-12 h-12 mr-2 rounded-md bg-gray-200"></div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h4 className="font-semibold text-xl my-3">{name}</h4>
            <p className="text-gray-500 text-sm mb-4 line-clamp-3">{description}</p>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={onAddToCart}
              className="bg-red-500 text-white rounded-full px-8 py-2">
                {hasSizeOrExtras ? (
                  <span>Add to cart (from ${basePrice}) </span>
                ) : (
                  <span>Add to Cart ${basePrice}</span>
                )}
              
            </button>
          </div>
        </div>
      </div>
    );
}