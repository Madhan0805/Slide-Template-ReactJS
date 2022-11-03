import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoginAction, setMenuAction } from "../redux/action/UserAction";
import { removeToken } from "../services/TokenService";

function SlideLeftMenu(props) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let user = useSelector((state) => state.user.user);
  let menu_class = useSelector((state) => state.user.menu);

  let hideMenu = () => {
    dispatch(setMenuAction("slideOut"));
  };
  let logout = () => {
    removeToken();
    dispatch(setLoginAction({ status: false, user: null }));
    navigate("/home");
  };
  return (
    <>
      <div
        className={`col-11 col-lg-3 border border-3 left-area ${menu_class}`}
        style={{ height: "100vh" }}
      >
        <h4 className="p-2 my-1 text-primary fw-bold d-flex justify-content-between">
          Slide Template
          <div
            className=" fw-bold close text-danger d-lg-none"
            onClick={hideMenu}
          >
            X
          </div>
        </h4>

        <div className="btn-group-vertical" style={{ width: "100%" }}>
          <Link
            to="/home"
            className="btn btn-outline-primary my-2 border-2 rounded-pill fa fa-home"
          >
            <span className="ms-1">Home</span>
          </Link>
          <Link
            to="/create-new-slide"
            className="btn btn-outline-primary my-2 border-2 rounded-pill fa fa-image"
          >
            <span className="ms-1">Create New Slide</span>
          </Link>
          <Link
            to="/my-slide"
            className="btn btn-outline-primary my-2 border-2 rounded-pill fa fa-folder"
          >
            <span className="ms-1">My Slide</span>
          </Link>
          <Link
            to="/manage-slides"
            className="btn btn-outline-primary my-2 border-2 rounded-pill fa fa-chain-broken"
          >
            <span className="ms-1">Manage Slides</span>
          </Link>
          <Link
            to="#"
            className="btn btn-outline-primary my-2 border-2 rounded-pill fa fa-trash"
          >
            <span className="ms-1">Trash Slides</span>
          </Link>
          <Link
            to="/profile"
            className="btn btn-outline-primary my-2 border-2 rounded-pill fa fa-user"
          >
            <span className="ms-1">Profile</span>
          </Link>
          <Link
            to="/about"
            className="btn btn-outline-primary my-2 border-2 rounded-pill fa fa-address-book"
          >
            <span className="ms-1">About</span>
          </Link>
          <Link
            to="/"
            className="btn btn-outline-primary my-2 border-2 rounded-pill fa fa-sign-out"
            onClick={logout}
          >
            <span className="ms-1">Log Out</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SlideLeftMenu;
