import { Link } from 'react-router-dom';
import './Signup.css';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [formDatas, setFormDatas] = useState({});
    const refContainer = useRef();
    useEffect(() => {
        refContainer.current.focus();
    }, []);
    useEffect(() => {
        const postTodo = async () => {
            try {
                await fetch('http://localhost:4000/api/v1/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formDatas),
                });
            } catch (err) {
                toast.error(err, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        };
        if (formDatas.username) postTodo();
    }, [formDatas]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setFormDatas(Object.fromEntries(formData));
        e.currentTarget.reset();
        toast.success('Your account has been created!', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };
    return (
        <div>
            <Link to='/home'>
                <IconContext.Provider
                    value={{
                        color: '#554231',
                        size: '4rem',
                        className: 'login-icon',
                    }}
                >
                    <AiFillHome />
                </IconContext.Provider>
            </Link>

            <form className='login-form' onSubmit={handleSubmit}>
                <IconContext.Provider
                    value={{
                        color: '#554231',
                        size: '8rem',
                        className: 'login-icon',
                    }}
                >
                    <BiSolidUser />
                </IconContext.Provider>
                <div className='input-container'>
                    <input
                        name='username'
                        id='username'
                        className='username-input'
                        type='text'
                        placeholder='username'
                        ref={refContainer}
                    />
                    <input
                        name='password'
                        id='password'
                        className='password-input'
                        type='password'
                        placeholder='password'
                    />
                    <input
                        name='email'
                        id='email'
                        className='email-input'
                        type='email'
                        placeholder='email'
                    />
                </div>
                <button type='submit' className='signup-submit-btn'>
                    Sign up
                </button>
            </form>
            <ToastContainer
                position='top-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </div>
    );
}
