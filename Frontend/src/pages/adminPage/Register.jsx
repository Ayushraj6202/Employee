import { useState } from "react";
import { registerAdmin } from "../../databaseFunctions/admin.js";
import { useNavigate } from "react-router-dom";

const RegisterAdmin = ()=>{
    const [fullname,setfullname] = useState("")
    const [email,setemail] = useState("")
    const [username,setusername] = useState("")
    const [password,setpassword] = useState("")
    const [error,seterror] = useState("");
    const navigate = useNavigate();

    const HandleRegisterAdmin = async ()=>{
        if(!fullname||!email||!username||!password)return;
        try {
            const result = await registerAdmin(fullname,email,username,password);
            console.log(result);
            seterror("");
            navigate('/admin/profile');
        } catch (error) {
            console.log(error);
            seterror(error.response.data.message);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 text-black dark:bg-background-primary dark:text-text-primary">
          <div className="w-full max-w-md p-8 bg-white dark:bg-background-secondary rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
            {error && (
                <div className="text-red-500 bg-orange-100 p-1 text-lg mb-4">
                    {error}
                </div>
            )}
            {/* Fullname Field */}
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="fullname"
              >
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                value={fullname}
                onChange={(e) => setfullname(e.target.value)}
                required
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-400 rounded bg-gray-100 text-black placeholder-gray-500 dark:bg-background-primary dark:border-border-primary dark:text-text-primary dark:placeholder-text-placeholder focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
              />
            </div>
      
            {/* Email Field */}
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-400 rounded bg-gray-100 text-black placeholder-gray-500 dark:bg-background-primary dark:border-border-primary dark:text-text-primary dark:placeholder-text-placeholder focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
              />
            </div>
      
            {/* Username Field */}
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
                placeholder="Enter your username"
                className="w-full p-3 border border-gray-400 rounded bg-gray-100 text-black placeholder-gray-500 dark:bg-background-primary dark:border-border-primary dark:text-text-primary dark:placeholder-text-placeholder focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
              />
            </div>
      
            {/* Password Field */}
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                placeholder="Create Password"
                className="w-full p-3 border border-gray-400 rounded bg-gray-100 text-black placeholder-gray-500 dark:bg-background-primary dark:border-border-primary dark:text-text-primary dark:placeholder-text-placeholder focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
              />
            </div>
      
            {/* Register Button */}
            <button
              onClick={HandleRegisterAdmin}
              className="w-full p-3 bg-gray-800 text-white font-medium rounded hover:bg-gray-700 dark:bg-background-primary dark:hover:bg-background-tertiary transition duration-300"
            >
              Register
            </button>
          </div>
        </div>
      );
}
export default RegisterAdmin;