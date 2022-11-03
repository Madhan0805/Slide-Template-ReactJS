import React, { useEffect, useState } from "react"; //import react
import { Link, useNavigate } from "react-router-dom"; //import react router dom
import SlideHeader from "./SlideHeader"; //import slide header components
import { getUserProfileService } from "../services/UserService";
import SlideLeftMenu from "./SlideLeftMenu";

function EditProfile(props) {
  //function home

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
            <SlideHeader title="Edit Profile" icon="fa-file-image-o" />
            {/* <header className="bg-light d-flex justify-content-between border-bottom border-3 title">
                    <p className="my-1 p-2 h3 fa-2x fa fa-home"> Home</p>
                    <div className="p-2 my-1 fa-2x">
                        <a href="#" className="h3 fa fa-user text-decoration-none text-black mx-4"></a>
                        <a href="#" className="h3 fa fa-sign-out text-decoration-none text-black"></a>
                    </div>
                </header> */}
            <section
              className="col-9"
              style={{ height: "80vh", width: "100%" }}
            >
              <div className="mx-4">
                {user ? (
                  <form action="" id="reg-form2">
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
                        defaultValue={user.fullname}
                      />
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
                        id="phonenumber"
                        defaultValue={user.phonenumber}
                      />
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
                        id="email-id"
                        defaultValue={user.email}
                      />
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
                        id="username"
                        defaultValue={user.username}
                      />
                    </div>

                    <div className="mb-4 text-center">
                      <button className="btn btn-primary me-2" id="submit">
                        Save Details
                      </button>
                      <span>
                        After Edit Go to
                        <Link
                          to="/profile"
                          className="text-decoration-none text-primary"
                        >
                          {" "}
                          Profile
                        </Link>
                      </span>
                    </div>
                  </form>
                ) : null}
              </div>
            </section>
          </section>
        </div>
      </main>
    </>
  );
}

export default EditProfile; //export home
