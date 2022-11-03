import React, { useState } from "react"; //import react
import axios from "axios"; //import axios
import { Link, useNavigate } from "react-router-dom"; //import react router dom
import Swal from "sweetalert2";

function Signup(props) {
  //function Signup
  let navigate = useNavigate();
  let initValue = {
    userfullname: "",
    mobile: "",
    email: "",
    username: "",
    pass: "",
    confirmpass: "",
  };
  let [forms, setForm] = useState({ ...initValue });
  let [errors, setErrors] = useState({ ...initValue });

  let handleforms = (event) => {
    let { name, value } = event.target;
    forms[name] = value;
    setForm({ ...forms });
    // validate();
    valideteInput(name, value);
  };

  let submitForm = async (event) => {
    event.preventDefault();
    console.log(forms);
    if (validate()) return false;

    let URL = "http://localhost:4501/api/user-signup";
    let sendData = {
      fullname: forms.userfullname,
      email: forms.email,
      phonenumber: forms.mobile,
      username: forms.username,
      password: forms.pass,
    };
    try {
      let { data } = await axios.post(URL, sendData);
      let { status, message } = data;
      if (status) {
        Swal.fire("User Added Successfully");
        navigate("/");
      } else {
        Swal.fire(message);
      }
    } catch (error) {
      Swal.fire("Server error");
      console.log(error);
    }
  };

  let validate = () => {
    let isError = false;
    let array = Object.entries(forms);

    array.forEach((value) => {
      if (value[1] === "") {
        errors[value[0]] = "Please enter the " + [value[0]];
        isError = true;
      } else {
        let _text = "";
        switch (value[0]) {
          case "userfullname":
            _text = testRegEx("user", value[1]) ? "" : "Invalid user full name";
            break;
          case "mobile":
            _text = testRegEx("mobile", Number(value[1]))
              ? ""
              : "Invalide mobile number";
            break;
          case "email":
            _text = testRegEx("email", value[1]) ? "" : "Invalide email id";
            break;
          case "username":
            _text = testRegEx("username", value[1])
              ? ""
              : "Username without space";
            break;
          case "confirmpass":
            _text =
              forms.pass === forms.confirmpass
                ? ""
                : "Password is not matching";
            break;
          default:
        }
        isError = _text === "" ? false : true;
        errors[value[0]] = _text;
      }
    });
    setErrors({ ...errors });
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
        case "userfullname":
          _text = testRegEx("user", value) ? "" : "Invalid user full name";
          break;
        case "mobile":
          _text = testRegEx("mobile", Number(value))
            ? ""
            : "Invalid mobile number";
          break;
        case "email":
          _text = testRegEx("email", value) ? "" : "Invalid email id";
          break;
        case "username":
          _text = testRegEx("username", value) ? "" : "Username without space";
          break;
        case "confirmpass":
          _text =
            forms.pass === forms.confirmpass ? "" : "Password is not matching";
          break;
        default:
          break;
      }
      isError = _text === "" ? false : true;
      errors[name] = _text;
    }
    setErrors({ ...errors });
  };

  let testRegEx = (type, string) => {
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
    <>
      <main className="container-fluid bg-primary main">
        <div className="row d-flex justify-content-center p-5 w-75 log-in">
          <div className="col-lg-6 col-12 mt-2 rounded-3 bg-light d-flex justify-content-center box">
            <form action="" id="reg-form2" onSubmit={submitForm}>
              <div className="mb-2 mt-4">
                <label htmlFor="userfullname">
                  {" "}
                  <i className="fa fa-user fw-bold text-primary">
                    {" "}
                    User Full Name{" "}
                  </i>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userfullname"
                  name="userfullname"
                  value={forms.userfullname}
                  onChange={handleforms}
                  placeholder="Enter User Full Name"
                />
                {errors.userfullname ? (
                  <span className="text-danger">{errors.userfullname}</span>
                ) : null}
              </div>
              <div className="mb-2">
                <label htmlFor="phonenumber">
                  {" "}
                  <i className="fa fa-phone-square fw-bold text-primary">
                    {" "}
                    Phone Number{" "}
                  </i>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="mobile"
                  value={forms.mobile}
                  onChange={handleforms}
                  id="phonenumber"
                  placeholder="Enter Phone Number"
                />
                {errors.mobile ? (
                  <span className="text-danger">{errors.mobile}</span>
                ) : null}
              </div>
              <div className=" mb-2">
                <label htmlFor="email-id">
                  {" "}
                  <i className="fa fa-envelope-square fw-bold text-primary">
                    {" "}
                    Email Address{" "}
                  </i>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={forms.email}
                  onChange={handleforms}
                  id="email-id"
                  placeholder="Enter Email-ID"
                />
                {errors.mobile ? (
                  <span className="text-danger">{errors.email}</span>
                ) : null}
              </div>
              <div className=" mb-2">
                <label htmlFor="username">
                  {" "}
                  <i className="fa fa-user-plus fw-bold text-primary">
                    {" "}
                    User Name{" "}
                  </i>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={forms.username}
                  onChange={handleforms}
                  id="username"
                  placeholder="Enter User Name"
                />
                {errors.username ? (
                  <span className="text-danger">{errors.username}</span>
                ) : null}
              </div>
              <div className="mb-2">
                <label htmlFor="password">
                  {" "}
                  <i className="fa fa-key fw-bold text-primary"> Password </i>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="pass"
                  value={forms.pass}
                  onChange={handleforms}
                  id="pass"
                  placeholder="Enter Password"
                />
                {errors.pass ? (
                  <span className="text-danger">{errors.pass}</span>
                ) : null}
              </div>
              <div className="mb-2">
                <label htmlFor="confirm-password">
                  {" "}
                  <i className="fa fa-key fw-bold text-primary">
                    Confirm Password{" "}
                  </i>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="confirmpass"
                  value={forms.confirmpass}
                  onChange={handleforms}
                  id="confirm-password"
                  placeholder="Enter Confirm Password"
                />
                {errors.confirmpass ? (
                  <span className="text-danger">{errors.confirmpass}</span>
                ) : null}
              </div>
              <div className="mb-4 text-center">
                <button className="btn btn-primary me-1" id="submit">
                  Create Account
                </button>
                <span>
                  Have an Account?
                  <Link to="/" className="text-decoration-none text-primary">
                    {" "}
                    Log In
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signup; //export signup
