import { FaStar } from 'react-icons/fa';
import { useAuth } from '../context/GlobalContext';

const CheckOutProduct = ({ product, hiddenButton }) => {
  const { dispatch } = useAuth();
  const incrementQuantity = () => { dispatch({ type: 'INCREMENT_QUANTITY', product: product }); }
  const decrementQuantity = () => { dispatch({ type: 'DECREMENT_QUANTITY', product: product }); }

  if (!product) return null;

  return (
    <div key={product.id} className='flex flex-col sm:flex-row items-center sm:items-start justify-between p-3 mb-6 border border-gray-200 rounded-lg shadow-sm'>
      <img src={product.image} alt={product.title} className='w-32 h-32 object-contain mb-3 sm:mb-0' />
      <div className='flex-1 sm:ml-4 text-center sm:text-left'>
        <h5 className='text-lg font-semibold'>{product.title}</h5>
        <div className="flex gap-1 mt-2 justify-center sm:justify-start">
          {Array(product.rating).fill().map((_, i) => <FaStar key={i} className="text-yellow-400 text-xl" />)}
        </div>
        <p className='text-sm ml-2 mt-4 text-gray-600'>$<span className='text-black font-extrabold'>{product.price}</span></p>
        <div style={{ display: hiddenButton ? 'none' : 'flex' }} className='w-fit flex items-center gap-4 mt-2 border-2 border-yellow-500 py-2 px-6 rounded-[30px] justify-center mx-auto sm:mx-0'>
          <button onClick={incrementQuantity} className='increment text-lg font-bold'>+</button>
          <p className='font-bold'>{product.quantity}</p>
          <button onClick={decrementQuantity} disabled={product.quantity <= 1} className='font-bold disabled:text-gray-400 text-lg'>-</button>
        </div>
        <button style={{ display: hiddenButton ? 'none' : 'block' }} onClick={() => dispatch({ type: 'REMOVE_FROM_BASKET', product: product })} className='bg-yellow-600 py-2 px-4 mt-3 font-bold rounded-lg active:scale-90 mx-auto sm:mx-0'>Remove from basket</button>
      </div>
    </div>
  );
};

export default CheckOutProduct;
