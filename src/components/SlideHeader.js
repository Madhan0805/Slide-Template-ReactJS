import React from "react"; //import react
import { Link, useNavigate } from "react-router-dom"; //import react router dom
import { setMenuAction } from "../redux/action/UserAction";
import { useSelector, useDispatch } from "react-redux";
// import { setLoginAction } from "../redux/action/UserAction";
// import { removeToken } from "../services/TokenService";
import Logout from "./Logout";

function SlideHeader(props) {
  //function slide header
  let { title, icon } = props;
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user.user);

  // let navigate = useNavigate();
  // let logout = () => {
  //   removeToken();
  //   dispatch(setLoginAction({ status: false, user: null }));
  //   navigate("/home");
  // };
  let getMenu = () => {
    dispatch(setMenuAction("slideIn"));
  };
  return (
    <>
      <header
        className="bg-light d-flex justify-content-between border-bottom border-3 title"
        style={{ height: "10vh" }}
      >
        <p className="my-1 p-2 h3 fa-lg-2x fw-bold">{title}</p>

        <div className="p-2 my-1 fa-2x d-lg-flex d-none">
          <Link
            to="/profile"
            className="h3 fa fa-user text-decoration-none text-black mx-4"
          ></Link>
          <Logout />
          <Link
            to="#"
            className="h3 fa fa-sign-out text-decoration-none text-black"
            data-bs-toggle="modal"
            data-bs-target="#modal"
          ></Link>
          {/* <span>
            <Logout title="Logout" icon="fa fa-sign-out" />
            Logout
          </span> */}
        </div>
        <p
          className="p-2 my-1 h3 fa fa-bars fa-2x d-lg-none"
          onClick={getMenu}
        ></p>
      </header>
    </>
  );
}

export default SlideHeader; //export slide header
