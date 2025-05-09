import { useState } from 'react';
import SignupImage from '../assets/signup.svg';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState(() => {
        return {
            email: "",
            password: "",
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:3000/api/user/login";
            const user = {
                email: formData.email,
                password: formData.password
            }
            const {data: res} = axios.post(url, user);
            console.log(res);
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Error logging in. Please try again.");
        }
    }


    return (
        <div className="bg-slate-800 rounded-lg shadow-lg p-4 md:p-8 h-lvh flex flex-items items-center justify-center space-y-4 md:space-y-8">
            <div className="hidden md:block mb-4 w-full">
                <img src={SignupImage} alt="Login illustration" />
            </div>
            
            <div className="mb-4 w-full">
                <h1 className="text-2xl font-bold text-center mb-4 text-rose-600">Log In</h1>
                <form className="flex flex-col items-center">
                    <input type="email" placeholder="Email" value={formData.email} className="md:w-80 mb-4 px-6 py-2 rounded-full text-white border border-white"
                        required onChange={e => setFormData({...formData, email: e.target.value})} />

                    <input type="password" placeholder="Password" value={formData.password} className="md:w-80 mb-4 px-6 py-2 rounded-full text-white border border-white"
                        required onChange={e => setFormData({...formData, password: e.target.value})} />

                    <button type="submit" className="bg-rose-300 text-white py-2 px-4 rounded-full" onClick={handleSubmit}>Sign Up</button>
                </form>
                <p className="text-center mt-4">Don't have an account? 
                    <Link to="/signup">Signup</Link>
                </p> 
            </div>
        </div>
    )
}

export default Login;