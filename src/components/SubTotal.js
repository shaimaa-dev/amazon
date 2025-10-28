import CurrencyFormat from "react-currency-format";
import { useAuth } from "../context/GlobalContext";
import { getBasketTotal } from "../context/AppReducer";
import { useNavigate } from "react-router-dom";

const SubTotal = () => {
    const { basket } = useAuth();
    const navigate = useNavigate();
  return (
    <div className="bg-white p-4 rounded-md mb-5 shadow-md">
      <CurrencyFormat renderText={(value) => {
        return (
            <>
            <p>
                Subtotal ({basket.length} items) : <strong>{value}</strong>
            </p>
            <input type="checkbox" id="gift" className="mr-2" />
            this order contain a gift
            </>
        )
      }}
        decimalScale={2}
        value={ getBasketTotal(basket) }
        thousandSeparator={true}
        displayType="text"
        prefix="$"
    />
    <button onClick={() => navigate('/payment')} className="bg-yellow-600 w-full py-2 rounded-md text-white font-bold mt-4">process to Chek out </button>
    </div>
  )
}

export default SubTotal
