import React, { useState, useEffect } from "react"; //import react
import { Link, useNavigate } from "react-router-dom"; //import react router dom
import SlideHeader from "./SlideHeader"; //import slide header
import { useDispatch } from "react-redux";
import { getUserProfileService } from "../services/UserService";
import { setLoginAction } from "../redux/action/UserAction";
import { removeToken } from "../services/TokenService";
import SlideLeftMenu from "./SlideLeftMenu";

function Profile(props) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let logout = () => {
    removeToken();
    dispatch(setLoginAction({ status: false, user: null }));
    navigate("/home");
  };
  let [user, setUser] = useState(null);

  let getUserProfileAction = async () => {
    try {
      let { status, userDetails } = await getUserProfileService();
      if (status) {
        setUser({ ...userDetails });
      } else {
        alert("user not found");
      }
    } catch (error) {
      alert("server error");
    }
  };

  useEffect(() => {
    getUserProfileAction();
  }, []);
  return (
    <>
      <main className="container-fluid">
        <div className="row">
          <SlideLeftMenu />
          <section className="col-12 col-lg-9 p-0">
            <SlideHeader title="Profile" icon="fa-file-image-o" />
            {/* <header className="bg-light d-flex justify-content-between border-bottom border-3" style={{ height: "10vh" }}>
                    <p className="p-2 my-1 h3 fa-2x fa fa-user"> Profile</p>
                    <div className="p-2 my-1 fa-2x">
                        <a href="#" className="h3 fa fa-user text-decoration-none text-black mx-4"></a>
                        <a href="#" className="h3 fa fa-sign-out text-decoration-none text-black"></a>
                    </div>
                </header> */}
            {user ? (
              <div
                className="col-9 d-flex justify-content-center"
                style={{ height: "10vh", width: "100%" }}
              >
                <div
                  className="card text-center lh-1 mt-5"
                  style={{ height: "75vh", width: "20%" }}
                >
                  <img
                    src="./images/default.jpg"
                    className=" p-1 mt-3 mx-3 rounded-circle bg-secondary"
                    style={{ height: "24vh", width: "12vw" }}
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bolder">{user.fullname}</h5>
                    <p>{user.username}</p>
                    <p className="text-primary fs-6">{user.email}</p>
                    <a href="#" className="btn btn-primary">
                      Slide Template
                    </a>
                  </div>
                </div>
                <div
                  className="card lh-1 mt-5"
                  style={{ height: "75vh", width: "40%" }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h3 className="card-title mt-3 fw-bolder">
                        Personal Information
                      </h3>
                      <Link
                        to="/edit-profile"
                        className="fa fa-edit fa-2x mt-3 text-decoration-none"
                      ></Link>
                    </div>
                    <div className="mt-4 fs-5">
                      <div>Full Name</div>
                      <div className="text-primary mt-1">{user.fullname}</div>
                    </div>
                    <div className="mt-5 fs-5">
                      <div>Mobile Phone</div>
                      <div className="text-primary mt-1">
                        {user.phonenumber}
                      </div>
                    </div>
                    <div className="mt-5 fs-5">
                      <div>User Name</div>
                      <div className="text-primary mt-1">{user.username}</div>
                    </div>
                    <div className="mt-5 fs-5">
                      <div>Email-ID</div>
                      <div className="text-primary mt-1">{user.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </main>
    </>
  );
}

export default Profile; //export profile
