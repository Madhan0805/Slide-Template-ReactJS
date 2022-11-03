import React from "react"; //import react
import { Link, useNavigate } from "react-router-dom"; //import react router dom
import SlideHeader from "./SlideHeader"; //import slide header components
import "../App.css";
import SlideLeftMenu from "./SlideLeftMenu";

function Home(props) {
  //function home
  return (
    <>
      <main className="container-fluid">
        <div className="row">
          <SlideLeftMenu />
          <section className="col-12 col-lg-9 p-0">
            <SlideHeader title="Home" icon="fa-file-image-o" />
            <section
              className="col-9"
              style={{ height: "80vh", width: "100%" }}
            >
              <div
                className="card-group px-5 m-auto py-5"
                style={{ width: "80%" }}
              >
                <div
                  className="card me-3 rounded-3 shadow text-end"
                  style={{ height: "25vh" }}
                >
                  <div className="card-body my-3 ">
                    <h1 className="card-title text-center fw-bolder text-primary">
                      45
                    </h1>
                    <p className="text-center text-dark">User Slides</p>
                    <a href="#" className="text-decoration-none">
                      View
                    </a>
                  </div>
                </div>
                <div
                  className="card me-3 rounded-3 shadow text-end"
                  style={{ height: "25vh" }}
                >
                  <div className="card-body my-3">
                    <h1 className="card-title text-center fw-bolder text-primary">
                      100
                    </h1>
                    <p className="text-center text-dark">Available Templates</p>
                    <a href="#" className="text-decoration-none">
                      Create New Slide
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </main>
    </>
  );
}

export default Home; //export home

{
  /* <form action="" id="reg-form2" onSubmit={submitForm}>
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
                  Change Details
                </button>
                <span>
                  After Edit Go Back to
                  <Link
                    to="/profile"
                    className="text-decoration-none text-primary"
                  >
                    {" "}
                    Profile
                  </Link>
                </span>
              </div>
            </form> */
}
