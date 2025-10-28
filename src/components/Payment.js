import { useAuth } from '../context/GlobalContext'
import { getBasketTotal } from '../context/AppReducer'
import CurrencyFormat from 'react-currency-format';
import axios from './Axios'
import { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import CheckOutProduct from './CheckOutProduct';

const Payment = () => {
  const navigate = useNavigate();
  const { user, basket, dispatch } = useAuth();
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // ⬇️ جلب clientSecret من السيرفر لما السلة تتغير
  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });

        // ✅ تأكد إن السيرفر رجّع clientSecret فعلاً
        if (response.data?.clientSecret) {
          setClientSecret(response.data.clientSecret);
        } else {
          throw new Error("Missing client secret from server");
        }
      } catch (err) {
        console.error("Error fetching client secret:", err);
        setError("⚠️ Failed to initialize payment. Please try again later.");
      }
    };

    if (basket?.length > 0) getClientSecret();
  }, [basket]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      // ⛔ لو مفيش clientSecret نوقف العملية
      if (!clientSecret) {
        throw new Error("Payment failed: No client secret available.");
      }

      // ⛔ تأكد إن stripe جاهز
      if (!stripe || !elements) {
        throw new Error("Stripe not initialized properly.");
      }

      const cardElement = elements.getElement(CardElement);

      // ⬇️ تأكيد الدفع
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      // ⛔ لو حصل خطأ من Stripe
      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // ✅ الدفع نجح — خزّن البيانات في Firebase
      const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
      await setDoc(ref, {
        basket: basket,
        amount: paymentIntent.amount / 100,
        created: paymentIntent.created,
      });

      setSucceeded(true);
      setProcessing(false);
      navigate('/orders', { replace: true });
      dispatch({ type: 'EMPTY_BASKET' });
    } catch (err) {
      // ⛔ عرض الخطأ في الواجهة
      setError(err.message || "Something went wrong with payment.");
      setProcessing(false);
    }
  };

  const basketProducts = basket.map((product) => (
    <CheckOutProduct key={product.id} product={product} />
  ));

  return (
    <>
      <h2 className='text-2xl font-bold text-center my-8'>
        CheckOut ({basket.length} items)
      </h2>

      <div className='bg-white w-[97%] mx-auto rounded-lg shadow-sm'>
        
        {/* Delivery Address */}
        <div className='flex flex-col md:flex-row py-4 border-b-2 border-gray-300 gap-6 px-3'>
          <h3 className='font-bold text-lg w-full md:w-[20%] text-center md:text-left'>
            Delivery address
          </h3>
          <div className='w-full md:w-[80%] text-center md:text-left'>
            <p className='text-lg font-semibold'>{user?.email}</p>
            <p className='text-lg font-semibold'>Alexandria, Egypt</p>
          </div>
        </div>

        {/* Review items */}
        <div className='flex flex-col md:flex-row py-4 border-b-2 border-gray-300 gap-6 px-3'>
          <h3 className='font-bold text-md w-full md:w-[20%] text-center md:text-left'>
            Review items and delivery
          </h3>
          <div className='w-full md:w-[80%]'>
            {basket.length > 0 
              ? basketProducts 
              : <p className='text-lg font-bold flex items-center justify-center'>
                  Please add products to basket
                </p>}
          </div>
        </div>

        {/* Payment section */}
        <div className='flex flex-col md:flex-row py-4 border-gray-300 gap-6 px-3'>
          <h3 className='font-bold text-lg w-full md:w-[20%] text-center md:text-left'>
            Payment method
          </h3>
          <form className='w-full md:w-[80%]' onSubmit={handlePaymentSubmit}>
            <CardElement onChange={handleChange} className='border rounded-md p-3 mb-3'/>
            
            <div>
              <CurrencyFormat 
                renderText={(value) => (
                  <h2 className='font-bold text-lg text-center md:text-left'>
                    Order total: {value}
                  </h2>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                thousandSeparator={true}
                displayType="text"
                prefix="$"
              />

              <button 
                type='submit' 
                disabled={processing || disabled || succeeded}
                className='bg-yellow-600 w-full py-2 rounded-md text-white font-bold mt-4 hover:bg-yellow-700 transition-all'
              >
                {processing ? "Processing..." : "Buy Now"}
              </button>
            </div>

            {/* عرض الخطأ لو حصل */}
            {error && <div className='text-red-500 mt-2 text-center md:text-left'>{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
