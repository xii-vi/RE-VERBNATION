import { getLoginDataFromServer } from "../../utilities/apis/apis";
import "./auth.css"
import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginReducer } from "../../reducer/authReducer";
import { useAuth } from "../../context/authContext";
import { Sidebar } from "../../components/sidebar/sidebar";

export const Login = () => {
    const {authDispatch}= useAuth();
    const navigate = useNavigate();

    const [{email,password},loginDispatch] = useReducer(loginReducer, {email:"", password:""});
    const testHandler=()=>[
    loginDispatch({type:"SET_EMAIL",payload:"adarshbalika@gmail.com"}),
    loginDispatch({type:"SET_PASSWORD",payload:"adarshBalika123"})
    ]
    const submitHandler= async (e, email, password)=>{
        e.preventDefault();
        try{
        const loginResponse = await getLoginDataFromServer(email,password);
        console.log(loginResponse)
        localStorage.setItem("encodedToken", loginResponse.data.encodedToken)
        localStorage.setItem('userData', JSON.stringify(loginResponse.data.foundUser));
        authDispatch({ type: "USER_LOGIN" })
        authDispatch({ type: "USER_TOKEN", payload: loginResponse.data.encodedToken })
        authDispatch({ type: "USER_DATA", payload: loginResponse.data.foundUser })
        navigate("/")
    }catch(error){
        console.log(error.message);
    }
    }
    return( 
    <div className="app-layout">
    <Sidebar />
    <div className="flex center-flex login">
        <form className="login-form" onSubmit={(e)=> submitHandler(e, email,password)}>
            <p className="h5">Login</p>
            <div className="my-5 ">
                <div className="py-5 flex flex-direction-col">
                    <small className="py-2">E-mail</small>
                    <input className="p-2 email" type="email" placeholder="username/e-mail" required value={email} onChange={(e)=> loginDispatch({type:"SET_EMAIL",payload:e.target.value})}/>
                </div>
                <div className="pb-5 flex flex-direction-col">
                    <small className="pb-2">Password</small>
                    <input className="p-2 password" type="password" placeholder="password" value={password} required onChange={(e)=> loginDispatch({type:"SET_PASSWORD",payload:e.target.value})}/>
                </div>
                <div className="flex">
                <label>
                <input type="checkbox"/>
                Remember me
                </label>
                <div className=" margin-left-auto">
                    Forgot Password ?
                </div>
                </div>
                
                <div className="py-4">
                    <button className="btn btn-outline-primary login-btn">Login</button>
                    <button className="btn btn-outline-primary login-btn" onClick={testHandler}>Guest Login</button>
                </div>

                <span className="pb-2">Don't have account yet ? </span>
                <Link to="/signup"><span className="text-bold">Sign Up</span></Link>
            </div>
        </form>
    </div>
    </div>  
    )
}