import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signUpUser } from "./authSlice";

export const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitHandler= (e)=>{
    e.preventDefault();
        const user = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };
        {
        const data = dispatch(signUpUser(user));
        data.then((res) =>res.error
                ? toast.error(res.payload)
                : toast.success("You signed up!") &&
                navigate("/login")
            )
            .catch((e) => toast.error(e));
        }
    }
return(
    <div className="py-5 main flex center-flex" >
    <form className="p-5 signup-form" onSubmit={(e)=> submitHandler(e)}>
        <p className="h5">Welcome to the your Jam, fam!!</p>
        <div className="my-5">
            <div className="py-5 flex flex-direction-col">
                <small className="py-2">E-mail</small>
                <input className="p-2" type="email" placeholder="heat@got-you.com" value={email} required  onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="pb-5 flex flex-direction-col">
                <small className="pb-2">Password</small>
                <input className="p-2" type="password" placeholder="password" value={password} required 
                onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className="pb-5 flex flex-direction-col">
                <small className="pb-2">Confirm Password</small>
                <input className="p-2" type="password" placeholder="Confirm password" value={confirmPassword} required 
                onChange={(e)=> setConfirmPassword(e.target.value)}/>
            </div>
            <div>{confirmPassword === password ? "" : <div class="alert alert-danger"><i class="fas fa-exclamation-triangle mr-2"></i>Password doesn't match</div>}
            </div>
            <div className="py-5">
                <button className="btn btn-primary text-bold login-btn">Register</button>
            </div>
            <Link to="/login"><p className="py-2">Already a member ? <span className="text-bold">Login</span></p></Link>
        </div>
    </form>
    </div>
    )
}