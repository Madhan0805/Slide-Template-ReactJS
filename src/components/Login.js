import React, { useState, useEffect } from "react"; //import react
// import axios from "axios"; //import axios
import { Link, useNavigate } from "react-router-dom"; //import react router dom
import { loginService } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setLoginAction } from "../redux/action/UserAction";
import { decodeToken, getToken } from "../services/TokenService";

function Login() {
  //function login
  let navigate = useNavigate();
  let isLogin = useSelector((state) => state.user.login);
  useEffect(() => {
    if (isLogin) navigate("/home");
  }, [isLogin]);

  let dispatch = useDispatch();
  let initValue = {
    username: "",
    pass: "",
  };
  let [forms, setForm] = useState({ ...initValue });
  let [errors, setError] = useState({ ...initValue });

  let handleForms = (event) => {
    let { name, value } = event.target;
    forms[name] = value;
    setForm({ ...forms });
    valideteInput(name, value);
  };

  let onSubmit = async (event) => {
    event.preventDefault();
    if (validete()) return false;
    try {
      let { status, message } = await loginService(forms);
      // console.log(status);

      if (status) {
        navigate("/home");
        let user = decodeToken(getToken());
        dispatch(setLoginAction({ status: true, user: user }));
        // window.location.reload("/home");
      } else {
        alert(message);
        dispatch(setLoginAction({ status: false, user: null }));
      }
    } catch (error) {
      //error msg for connection error
      alert("Error message");
      console.log(error);
    }
  };

  let validete = () => {
    let isError = false;
    let array = Object.entries(forms);
    array.forEach((value) => {
      if ([value[1]] == "") {
        errors[value[0]] = "Please Enter the " + [value[0]];
        isError = true;
      } else {
        let _text = "";
        switch (value[0]) {
          case "username":
            _text = testRegEx("username", value[1]) ? "" : "Invalid user name";
            break;
          default:
            break;
        }
        isError = _text === "" ? false : true;
        errors[value[0]] = _text;
      }
    });
    setError({ ...errors });
    return isError;
  };
  let valideteInput = (name, value) => {
    let isError = false;
    if (value == "") {
      errors[name] = "Please Enter the " + name;
      isError = true;
    } else {
      let _text = "";
      switch (name) {
        case "username":
          _text = testRegEx("username", value)
            ? ""
            : "Only characters are allowed";
          break;
        default:
          break;
      }
      isError = _text === "" ? false : true;
      errors[name] = _text;
    }

    setError({ ...errors });
  };
  let testRegEx = (type, string) => {
    //regular expression
    let expression = {
      email: /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)$/g,
      mobile: /^[6-9]\d{9}$/g,
      username: /^([a-zA-z])+$/g,
      user: /^([ A-Za-z])+$/g,
      c_mobile: /^\+\d{2}[7-9]\d{9}$/g,
    };
    const regex = new RegExp(expression[type]);
    return regex.test(string);
  };

  return (
    <main className="container-fluid w-100 bg-primary main">
      <section className="row d-flex justify-content-center p-5 ">
        <div className="col-lg-6 col-12 shadow rounded-3 bg-light sign-in">
          <form action="" id="reg-form" onSubmit={onSubmit}>
            <h4 className="p-2 fw-bold text-primary">Sign-In</h4>
            <div className="mt-3 mb-2">
              <label htmlFor="username">
                {" "}
                <i className="fa fa-user-plus text-primary fw-bold">
                  {" "}
                  User Name{" "}
                </i>
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={forms.username}
                onChange={handleForms}
                placeholder="Enter User Name"
              />
              {errors.username ? (
                <span className="text-danger">{errors.username}</span>
              ) : null}
            </div>
            <div className="mb-2">
              <label htmlFor="password">
                {" "}
                <i className="fa fa-key text-primary fw-bold"> Password </i>
              </label>
              <input
                type="text"
                className="form-control"
                name="pass"
                value={forms.pass}
                onChange={handleForms}
                placeholder="Enter Password"
              />
              {errors.pass ? (
                <span className="text-danger">{errors.pass}</span>
              ) : null}
            </div>
            <div className="mb-2 text-center">
              <button className="btn btn-primary" id="submit">
                Log-In
              </button>
              <span className="ms-2">
                Don't Have an Account ?
                <Link
                  to="/sign-up"
                  className="text-decoration-none text-primary"
                >
                  {" "}
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login; //export login
