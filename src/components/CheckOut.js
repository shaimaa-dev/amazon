import { checkOutImg } from '../asstes/index';
import { useAuth } from '../context/GlobalContext';
import SubTotal from './SubTotal';
import CheckOutProduct from './CheckOutProduct';

const CheckOut = () => {
  const { user, basket } = useAuth();
  const basketProducts = basket.map((product) => {
    return <CheckOutProduct key={product.id} product={product} />;
  });

  return (
    <div className='w-[97%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4'>
      <div className='col-span-8'>
        <img src={checkOutImg} alt="checkout-img" className='w-full object-cover rounded-lg' />
        <p className='mt-5 text-lg font-semibold text-center lg:text-left'>Hello {user ? `${user.email}` : 'Guest'}</p>
        <h6 className='font-bold text-xl mt-4 text-center lg:text-left'>Your Shopping Basket</h6>
        <hr className='mt-4 text-black' />
        <div className='flex flex-col mt-4'>
          {basket.length > 0 ? (
            basketProducts
          ) : (
            <p className='text-lg font-bold flex items-center justify-center h-32'>Your basket is empty</p>
          )}
        </div>
      </div>
      <div className='col-span-4'>
        <SubTotal />
      </div>
    </div>
  );
};

export default CheckOut;
