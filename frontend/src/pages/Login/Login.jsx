import {useState} from 'react'

//TODO
//work on svg logos
//forget password 

const Login = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-3 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} id="email" className="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Your Email" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" className="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Your Password" required />
                    </div>
                    <button type="submit" className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">Login</button>
                </form>
                <div className="flex items-center justify-between">
                    <hr className="w-full border-gray-300 dark:border-gray-600" />
                    <span className="px-2 my-7 text-gray-500 dark:text-gray-400">or</span>
                    <hr className="w-full border-gray-300 dark:border-gray-600" />
                </div>
                <div className="flex flex-col space-y-2">
                    <button type="button" className="flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white bg-[#3b5998] rounded-lg hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 dark:focus:ring-[#3b5998]/55">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                            <linearGradient id="awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1" x1="6.228" x2="42.077" y1="4.896" y2="43.432" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0d61a9"></stop><stop offset="1" stop-color="#16528c"></stop></linearGradient><path fill="url(#awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1)" d="M42,40c0,1.105-0.895,2-2,2H8c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h32	c1.105,0,2,0.895,2,2V40z"></path><path d="M25,38V27h-4v-6h4v-2.138c0-5.042,2.666-7.818,7.505-7.818c1.995,0,3.077,0.14,3.598,0.208	l0.858,0.111L37,12.224L37,17h-3.635C32.237,17,32,18.378,32,19.535V21h4.723l-0.928,6H32v11H25z" opacity=".05"></path><path d="M25.5,37.5v-11h-4v-5h4v-2.638c0-4.788,2.422-7.318,7.005-7.318c1.971,0,3.03,0.138,3.54,0.204	l0.436,0.057l0.02,0.442V16.5h-3.135c-1.623,0-1.865,1.901-1.865,3.035V21.5h4.64l-0.773,5H31.5v11H25.5z" opacity=".07"></path><path fill="#fff" d="M33.365,16H36v-3.754c-0.492-0.064-1.531-0.203-3.495-0.203c-4.101,0-6.505,2.08-6.505,6.819V22h-4v4	h4v11h5V26h3.938l0.618-4H31v-2.465C31,17.661,31.612,16,33.365,16z"></path>
                        </svg>
                        Login with Facebook
                    </button>
                    <button type="button" className="flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-black bg-[#f1efef] rounded-lg hover:bg-[#d7d7d7]/90 focus:ring-4 focus:outline-none focus:ring-[#DB4437]/50 dark:focus:ring-[#DB4437]/55">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        Login with Google
                    </button>
                </div>
                <div className="text-sm font-medium text-center  text-gray-500 dark:text-gray-300">
                    Don't have an account? <a href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Sing Up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
