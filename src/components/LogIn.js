import { useState } from 'react';
import { LogoLogin } from '../asstes';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';


const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    function createUserAccount(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if(userCredential) {
                    navigate('/');
                    setEmail('');
                    setPassword('');
                }
            }).catch(error => {
                alert(error.message);
            })
    }
    function SignIn(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth , email, password)
        .then((userCredential) => {
            if(userCredential) {
                navigate('/');
                setEmail('');
                setPassword('');
            }
        })
    }
    return (
        <>
            <Link to={"/"}>
                <div className='flex justify-center mt-4'>
                    <img src={LogoLogin} className='w-[120px]' alt='Logo' />
                </div>
            </Link>
            <div className='w-[90%] lg-w-[50%] mx-auto  mt-6 p-4 flex flex-col items-center justify-center rounded-md  border border-gray-300'>
                <h3 className='text-3xl font-bold'>Log In</h3>
                <form onSubmit={SignIn}>
                    <label className='block mt-4' id='email'>email</label>
                    <input required type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} id='email' className='w-full p-2 border border-gray-300 rounded-md' />
                    <label className='block mt-4' id='password'>Password</label>
                    <input required type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} id='password' className='w-full p-2 border border-gray-300 rounded-md' />
                    <button type='submit' className='w-full bg-[#cd9042] capitalize text-lg text-white p-2 mt-4 rounded-md'>sign in</button>
                </form>
                <p className='mt-5 text-center lg-w-[50%]'>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                <button onClick={(e) => createUserAccount(e)} className='lg-w-[50%] bg-[#dbdad7] text-lg text-black p-2 mt-4 rounded-md'>create an amazon account</button>
            </div>
        </>
    )
}

export default LogIn
