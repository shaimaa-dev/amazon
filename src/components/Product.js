import { FaStar } from "react-icons/fa";
import { useAuth } from "../context/GlobalContext";

const Product = ({ product }) => {
    const { dispatch , basket } = useAuth();
    const addToBasket = () => {
      dispatch({ type: 'ADD_TO_BASKET', 
        product: product});
        console.log(basket);
    }
    return (
        <div className="group bg-white p-6 rounded-lg hover:cursor-pointer hover:bg-black hover:text-white transition duration-300 shadow-md"
        >
            <h6>{product.title}</h6>
            <p className="my-3">
                <small>$</small>
                <strong>{product.price}</strong>
            </p>
            <div className="flex gap-0">
                {Array(product.rating).fill().map((_, i) => {
                    return (
                        <FaStar key={i} className="text-yellow-400 text-xl" />
                    )
                })}
            </div>
            <img src={product.image} className="block my-6 mx-auto w-[200px] transition-all duration-200 group-hover:scale-[1.1] " alt="product-img" />
            <button onClick={addToBasket} className="bg-yellow-700 text-white px-6 py-2   block m-auto rounded-md  active:scale-[0.9] transition duration-300">
                Add to Basket
            </button>
        </div>
    )
}

export default Product
