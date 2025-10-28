import moment from 'moment'
import CurrencyFormat from 'react-currency-format';
import CheckOutProduct from './CheckOutProduct';

const Order = ({ order }) => {
  return (
    <div className='mt-4 p-5 border-2 border-gray-300 rounded-lg shadow-sm bg-white flex flex-col justify-between h-full'>
      <p className='text-gray-500 text-sm mb-1'>{moment.unix(order.data.created).format("MMMM DD, YYYY • h:mma")}</p>
      <p className='text-xs text-gray-400 mb-3 break-all'>Order ID: {order.id}</p>
      <div className='space-y-4'>
        {order.data.basket?.map((item) => (<CheckOutProduct key={item.id} product={item} hiddenButton={true} />))}
      </div>
      <CurrencyFormat renderText={(value) => (<h3 className='font-semibold text-right mt-6 text-lg text-gray-800'>Order Total: {value}</h3>)} decimalScale={2} value={order.data.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
    </div>
  )
}

export default Order
