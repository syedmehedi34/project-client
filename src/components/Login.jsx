import { useContext, useState } from "react";
import { GrGoogle } from "react-icons/gr";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const Login = () => {
  const { signInUser, signInWithGoogle, setUser, setLoginMail, setLoading } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(""); // State for error message

  // Sign in function using email and password
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoginMail(email);

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setLoading(false);
        e.target.reset();
        setError(""); // Clear error on successful login
        toast.success("Logged in successfully!", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        }); // Success toast

        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again."); // Set error message
        toast.error("Login failed. Please check your credentials.", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        }); // Error toast
        console.error("ERROR", error.message);
        e.target.password.value = "";
      });
  };

  // Sign in using Google
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success("Logged in successfully!", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        }); // Success toast
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError("Failed to sign in with Google. Please try again."); // Set Google error message
        toast.error("Login failed. Please check your credentials.", {
          position: "top-left",
          autoClose: 2000,
          pauseOnHover: true,
        }); // Error toast
        console.error("ERROR", error.message);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="card bg-base-100 w-full max-w-lg shrink-0 p-10 mt-0 border shadow-lg">
          <h2 className="text-2xl font-semibold text-center">
            Login to your account
          </h2>

          <form onSubmit={handleLogin} className="card-body pb-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {passwordVisible ? (
                    <IoIosEye size={24} />
                  ) : (
                    <IoIosEyeOff size={24} />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm  my-4 font-semibold">
                  {error}
                </p>
              )}
              <label className="label">
                <Link
                  to="/reset-password"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-neutral">Login</button>
            </div>
          </form>
          <div
            onClick={handleGoogleSignIn}
            className="flex items-center gap-3 btn btn-neutral mx-8 mb-5"
          >
            <GrGoogle />
            <span>Login with Google</span>
          </div>
          <p className="text-center font-semibold">
            Don’t Have An Account?{" "}
            <Link className="text-red-500" to="/auth/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
