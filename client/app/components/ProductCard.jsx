// components/ProductCard.jsx
const ProductCard = ({ product }) => {
    return (
        <div className="border rounded p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="mt-2 font-medium">₹{product.price}</p>
            <p className="text-sm">Qty: {product.quantity}</p>
            <p className="text-xs text-gray-500">
                Category: {product.category?.name}
            </p>
        </div>
    );
};

export default ProductCard;
