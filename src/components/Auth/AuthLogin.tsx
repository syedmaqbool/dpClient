import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/AuthServiceInterface";
import { userLoginAction } from "../../redux/authSlice";
import { userLogin } from "../../services/AuthService";
import { get, set } from "../../utilities/LocalStorage";
import { SECOND_IN_MS } from "../../utilities/TimeConstants";
import MyModal from "../Dashboard/Dialog";

function AuthLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userInitialize = () => {
    const user = get<User>("USER");
    if (user) {
      dispatch(userLoginAction(user));
      navigate("/dashboard");
    }
  };

  const loginHandler = async () => {
    const data = {
      email: email,
      pwd: password,
    };
    const response = await userLogin(data);
    console.log("response", response);
    if (!response) return;

    if (response.status === 200) {
      dispatch(userLoginAction(response.data));
      set("USER", response.data);
      navigate("/dashboard");
    }

    if (response.status === 300) {
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, SECOND_IN_MS * 200);
    }
  };

  useEffect(() => {
    userInitialize();
  }, []);

  return (
    <>
      <MyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        message={"Invalid Credentials"}
        classNames={["bg-red-600"]}
      />
      <div className="container mx-auto flex h-screen items-center justify-center">
        <div className="w-[32rem]">
          <form className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-sm text-gray-700 shadow focus:outline-blue-400"
                id="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border  py-2 px-3 text-sm text-gray-700 shadow focus:outline-blue-400"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-blue-400"
                type="button"
                onClick={loginHandler}
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthLogin;
