import Data from './Data';
export const initalState = {
    products: Data,
    basket: [],
    user: null
}
export const getBasketTotal = (basket) => {
  return basket.length === 0 ? 0 :
  basket.reduce((amount, item) => item.price * item.quantity + amount, 0);
}
function removeFromBasket(state = initalState, action) {

   const updateData ={
    ...state,
    basket: state.basket.filter((item) => {
      return item.id !== action.product.id;
    })
   } 
  return updateData;
}
function addBasket(state = initalState, action) {
    const productExists = state.basket.find(item => item.id === action.product.id);

  if (productExists) {
    return {
      ...state,
      basket: state.basket.map(item =>
        item.id === action.product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    };
  } else {
    return {
      ...state,
      basket: [...state.basket, { ...action.product, quantity: 1 }]
    };
  }
}
const AppReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return addBasket(state, action);
        case 'INCREMENT_QUANTITY':
            return {
                ...state,
                basket: state.basket.map(item => 
                    item.id === action.product.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                )
            };
        case 'DECREMENT_QUANTITY':
          return {
                ...state,
                basket: state.basket.map(item => 
                    item.id === action.product.id 
                    ? { ...item, quantity: item.quantity - 1 } 
                    : item
                )
            };
          case 'REMOVE_FROM_BASKET':
            return removeFromBasket(state, action);
          case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }

}


export default AppReducer
