import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.conf";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;

        setError("");
        setSuccess(false);

        if (!terms) {
            setError("Please agree to the terms and conditions");
            return;
        }

        if (password.length < 6) {
            setError("Password should be at least 6 characters long");
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            );
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                // Add additional user data if needed
                // e.g. result.user.updateProfile({ displayName: 'John Doe' });
                setSuccess(true);
            })
            .catch((err) => {
                console.error(err);
                // Handle error
                setError(err.message);
                setSuccess(false);
            });
    };

    return (
        <div className="min-h-screen hero bg-base-200">
            <div className="flex-col hero-content lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">SignUp now!</h1>
                    <p className="py-6">
                        SignUp and become a member of our community.
                    </p>
                </div>
                <div className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0">
                    <form onSubmit={handleSignup} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered"
                                name="email"
                                required
                            />
                        </div>
                        <div className="relative form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Password"
                                className="input input-bordered"
                                name="password"
                                required
                            />
                            <button
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-4 top-12 btn btn-xs"
                            >
                                {showPass ? <RiEyeCloseFill /> : <FaEye />}
                            </button>

                            <label className="label">
                                <Link
                                    to="#"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </Link>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="justify-start gap-4 cursor-pointer label">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    className="checkbox"
                                />
                                <span className="label-text">
                                    Accept our terms and conditions.
                                </span>
                            </label>
                        </div>

                        <div className="mt-6 form-control">
                            <button className="btn btn-primary">SignUp</button>
                        </div>
                    </form>
                    {error && (
                        <div className="p-2 m-4 text-xs font-semibold text-red-800 bg-red-100 border border-red-600 rounded-md">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-2 m-4 text-xs font-semibold text-green-800 bg-green-100 border border-green-600 rounded-md">
                            Sign up successful! Please check your email to
                            verify your account.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
