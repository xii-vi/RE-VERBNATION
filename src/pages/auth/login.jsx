import { getLoginDataFromServer } from "../../utilities/apis/apis";
import "./auth.css"
import { useReducer } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginReducer } from "../../reducer/authReducer";
import { useAuth } from "../../context/authContext";
import { LoadSpin } from "../../components/loader/loader";
import { useVideo } from "../../context/videoContext";

export const Login = () => {
    const {authDispatch}= useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const{isLoading, setIsLoading} = useVideo()
    const from = location.state?.from?.pathname || "/"; 
    const [{email,password},loginDispatch] = useReducer(loginReducer, {email:"", password:""});
    const testHandler=()=>[
    loginDispatch({type:"SET_EMAIL",payload:"adarshbalika@gmail.com"}),
    loginDispatch({type:"SET_PASSWORD",payload:"adarshBalika123"})
    ]
    const submitHandler= async (e, email, password)=>{
        e.preventDefault();
        try{
        setIsLoading(true);
        const loginResponse = await getLoginDataFromServer(email,password);
        localStorage.setItem("encodedToken", loginResponse.data.encodedToken)
        localStorage.setItem('userData', JSON.stringify(loginResponse.data.foundUser));
        authDispatch({ type: "USER_LOGIN" })
        authDispatch({ type: "USER_TOKEN", payload: loginResponse.data.encodedToken })
        authDispatch({ type: "USER_DATA", payload: loginResponse.data.foundUser })
        navigate(from, {replace : true} )
        setIsLoading(false);

    }catch(error){
        setIsLoading(true);
        console.log(error.message);
        navigate("/login");
    }
    }
    return( 
    <div className="flex login main">
        { isLoading ?<LoadSpin />:
        <form className="login-form p-5" onSubmit={(e)=> submitHandler(e, email,password)}>
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
                    <button className="btn btn-primary login-btn text-bold">Login</button>
                    <button className="btn btn-primary login-btn text-bold" onClick={testHandler}>Guest Login</button>
                </div>

                <span className="pb-2">Don't have account yet ? </span>
                <Link to="/signup"><span className="text-bold">Sign Up</span></Link>
            </div>
        </form>
}
    </div> 
    )
}