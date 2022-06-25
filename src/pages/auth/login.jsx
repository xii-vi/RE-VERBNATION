import "./auth.css"
import { useEffect, useState } from "react";
import { loginUser } from "./authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadSpin } from "../../components/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


export const Login = () => {
    const { encodedToken,isLoading } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const from = location.state?.from?.pathname || -1; 
    useEffect(() => {
        localStorage.setItem("loginToken", encodedToken);
    }, [encodedToken]);
    
    const testHandler=()=>
    {
    const user = {
    email: "rohitabhishek@gmail.com",
    password: "rohit123",
    };
    setEmail(user.email);
    setPassword(user.password);
    const data = dispatch(loginUser(user));
    data
    .then((res) =>
        res.error
        ? toast.error(res.payload)
        : toast.success("Logged in!") && navigate(from, {replace : true})
    )
    .catch((e) => toast.error(e));
  };
    const submitHandler= (e)=>{
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        };
        const loginData = dispatch(loginUser(user));
        loginData.then((res) =>res.error
            ? toast.error(res.payload)
            : toast.success("User logged in!") && navigate(from, {replace : true} ) )
            .catch(error=>{
                toast.error("something is wrong");
                navigate("/login");
            })
    }
    return( 
    <div className="flex login main">
        { isLoading ?<LoadSpin />:
        <form className="login-form p-5" onSubmit={(e)=> submitHandler(e)}>
            <p className="h5">Login</p>
            <div className="my-5 ">
                <div className="py-5 flex flex-direction-col">
                    <small className="py-2">E-mail</small>
                    <input className="p-2 email" type="email" placeholder="username/e-mail" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div className="pb-5 flex flex-direction-col">
                    <small className="pb-2">Password</small>
                    <input className="p-2 password" type="password" placeholder="password" value={password} required onChange={(e)=> setPassword(e.target.value)}/>
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