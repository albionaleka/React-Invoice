import { Link, Route, Routes } from "react-router-dom";
import SignupImage from "../assets/signup.svg";
import { ArrowDownToDotIcon } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import Login from "./Login";

const Signup = () => {
    const [formData, setFormData] = useState(() => {
        return {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            profilePicture: null,
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        try {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const url = "http:localhost:3000/api/user/signup";
            const user = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            }
            const {data: res} = axios.post(url, user);
            console.log(res);
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Error signing up. Please try again.");
        }
    }

    return (
        <div className="bg-slate-800 rounded-lg shadow-lg p-4 md:p-8 h-lvh flex flex-items items-center justify-center space-y-4 md:space-y-8">
            <div className="hidden md:block mb-4 w-full">
                <img src={SignupImage} alt="Signup illustration" />
            </div>
            
            <div className="mb-4 w-full">
                <h1 className="text-2xl font-bold text-center mb-4 text-rose-600">Sign Up</h1>
                <form className="flex flex-col items-center">
                    <input type="text" placeholder="Full Name" value={formData.name} className="md:w-80 mb-4 px-6 py-2 rounded-full text-white border border-white"
                        required onChange={e => setFormData({...formData, name: e.target.value})} />

                    <input type="email" placeholder="Email" value={formData.email} className="md:w-80 mb-4 px-6 py-2 rounded-full text-white border border-white"
                        required onChange={e => setFormData({...formData, email: e.target.value})} />

                    <input type="password" placeholder="Password" value={formData.password} className="md:w-80 mb-4 px-6 py-2 rounded-full text-white border border-white"
                        required onChange={e => setFormData({...formData, password: e.target.value})} />

                    <input type="password" placeholder="Confirm Password" value={formData.confirmPassword} className="md:w-80 mb-4 px-6 py-2 rounded-full text-white border border-white" 
                        required onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                    <div className="flex justify-start items-center mb-4">
                        <ArrowDownToDotIcon className="w-6 h-6 text-rose-500" />
                        <label className="text-sm text-slate-400">Upload your profile picture</label>
                    </div>
                    <input
                        type="file"
                        onChange={e => setFormData({...formData, profilePicture: e.target.files[0]})}
                        className="md:w-80 mb-4 file:mr-4 file:rounded-full file:border-0 file:bg-rose-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-rose-700 hover:file:bg-rose-100 dark:file:bg-rose-600 dark:file:text-rose-100 dark:hover:file:bg-rose-500"
                    />
                    <button type="submit" className="bg-rose-300 text-white py-2 px-4 rounded-full" onClick={handleSubmit}>Sign Up</button>
                </form>
                <p className="text-center mt-4">Already have an account? 
                    <Link to="/login">Login</Link>
                </p> 
            </div>

            <Routes className="hidden md:block mb-4 w-full">
                <Route path="/login" element={<Login />} />
            </Routes>
            
        </div>
    )
}

export default Signup;