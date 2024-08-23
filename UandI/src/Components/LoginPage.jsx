import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setIsFetching, loginSuccess, loginFailure } from '../Redux/Slice/userSlice'; // import the actions
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/baseUrl';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const togglePasswordVisibility = (e) => {
    e.preventDefault(); 
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }
    setError("");

    dispatch(setIsFetching());
    const config = {
      method: 'POST',
      url: API_URL+'/api/auth/login',
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: password,
      },
      // withCredentials: true,
    };

    try {
      const response = await axios.request(config);
      console.log(response.data);
      if (response.status === 200) {
        console.log('Login success');
        const { token, role } = response.data;
        dispatch(loginSuccess({ email, role, token }));

        navigate('/redirect');
      } else {
        dispatch(loginFailure());
        console.log('Login failed');
      }
    } catch (error) {
      dispatch(loginFailure());
      console.error('Error during login:', error.message);
      console.error('Full error:', error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://static.tildacdn.one/tild6361-3537-4031-a666-656336393839/UI_Logo_FINAL_Red.png"
          className="mx-auto h-28 w-28"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="flex text-sm font-medium text-gray-900 outline-none" 
                
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#cb0100] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm flex font-medium text-gray-900"
              style={{ outline: 'none' }} 
            >
              Password
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-semibold focus:ring-2 focus:ring-[#cb0100] sm:text-sm sm:leading-6 pr-10" 
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#cb0100] hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={handleLogin}
              className="flex w-full justify-center rounded-md bg-[#cb0100] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cb0100]"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
