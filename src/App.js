import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LogIn from './components/LogIn';
import { auth } from './firebase/config';
import { useAuth } from './context/GlobalContext';
import { useEffect } from 'react';
import Home from './components/Home';
import CheckOut from './components/CheckOut';
import Payment from './components/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Orders from './components/Orders';
function App() {
  const { dispatch } = useAuth();
  const stripePromise  = loadStripe("pk_test_51Ruv5kK4eh60uO22UTQhKzDuEDXH5qw1lJQxKxJdri2YPIy0rzN0wvy4aWtcjo1DEvkzXQtVPPCGEivclEjQCV0h00TdKzmLtD")
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: 'SET_USER', user: authUser });
      } else {
        dispatch({ type: 'SET_USER', user: null });
      }
    })
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<><Header /><Home /></>} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/checkOut" element={<><Header /><CheckOut /></>} />
        <Route path="/payment" element={<><Header /><Elements stripe={stripePromise} ><Payment /></Elements></>} />
        <Route path="/orders" element={<><Header /><Orders /></>} />
        < Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
