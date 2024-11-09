import { Link } from "react-router-dom";
import auth from "../firebase/firebase.conf";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="max-w-xl px-4 py-4 mx-auto border rounded-xl">
            <h2 className="my-4 text-4xl">Register</h2>
            <form
                onSubmit={handleRegister}
                className="flex flex-col items-center gap-4 mx-auto"
            >
                <label className="flex items-center w-full gap-2 input input-bordered">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                    >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        type="email"
                        name="email"
                        className="grow"
                        placeholder="Email"
                    />
                </label>
                <label className="flex items-center w-full gap-2 input input-bordered">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="password"
                        className="grow"
                        name="password"
                        placeholder="Password"
                    />
                </label>
                <button className="w-full btn btn-primary">Register</button>
                <p>
                    Already have an account?{" "}
                    <Link className="underline" to="/login">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
