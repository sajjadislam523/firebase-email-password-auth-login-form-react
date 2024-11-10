import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../firebase/firebase.conf";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [loginError, setLoginError] = useState("");
    const emailRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setSuccess(false);
        setLoginError("");

        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user);
                if (!res.user.emailVerified) {
                    setLoginError("Please verify your email");
                } else {
                    setSuccess(true);
                }
            })
            .catch((err) => {
                console.log(err.message);
                setLoginError(err.message);
            });
    };

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log("Please provide a valid email");
        } else {
            sendPasswordResetEmail(auth, email).then(() => {
                alert(
                    "Password reset email has been sent, please check the inbox"
                );
            });
        }
    };

    return (
        <div className="min-h-screen hero bg-base-200">
            <div className="flex-col hero-content">
                <div className="items-start">
                    <h1 className="text-4xl font-bold">Login</h1>
                </div>
                <div className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered"
                                name="email"
                                ref={emailRef}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered"
                                name="password"
                                required
                            />
                            <label
                                onClick={handleForgetPassword}
                                className="label"
                            >
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="mt-6 form-control">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p>
                            Don&apos;t have an account?{" "}
                            <Link className="underline" to="/signup">
                                SignUp
                            </Link>
                        </p>
                    </form>
                    {loginError && (
                        <div className="p-2 m-4 text-xs font-semibold text-red-800 bg-red-100 border border-red-600 rounded-md">
                            {loginError}
                        </div>
                    )}
                    {success && (
                        <div className="p-2 m-4 text-xs font-semibold text-green-800 bg-green-100 border border-green-600 rounded-md">
                            Login successful!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
