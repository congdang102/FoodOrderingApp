export default function AddToCartButton({
    hasSizeOrExtras,onClick,basePrice}) {
    return(
        <button 
        onClick={onAddToCart}
        className="bg-red-500 text-white rounded-full px-8 py-2">
          {hasSizeOrExtras ? (
            <span>Add to cart (from ${basePrice}) </span>
          ) : (
            <span>Add to Cart ${basePrice}</span>
          )}
        
      </button>
    );
}