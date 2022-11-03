import React from "react"; //import react
import SlideHeader from "./SlideHeader"; //import slide header
import SlideLeftMenu from "./SlideLeftMenu";

function About(props) {
  //function profile
  return (
    <>
      <main className="container-fluid">
        <div className="row">
          <SlideLeftMenu />
          <section className="col-12 col-lg-9 p-0">
            <SlideHeader title="About" icon="fa-file-image-o" />
            {/* <header className="bg-light d-flex justify-content-between border-bottom border-3">
                    <p className="p-2 my-1 h3 fa-2x fa fa-address-book"> About</p>
                    <p className="p-2 my-1 h3 fa fa-bars d-lg-none menu"></p>
                    <div className="p-2 my-1 fa-2x d-lg-flex d-none">
                        <a href="#" className="h3 fa fa-user text-decoration-none text-black mx-4"></a>
                        <a href="#" className="h3 fa fa-sign-out text-decoration-none text-black"></a>
                    </div>
                </header> */}
            <section
              className="col-12 col-lg-9"
              style={{ width: "100%", height: "80vh" }}
            >
              <div className="card-group m-auto py-5 " style={{ width: "80%" }}>
                <div className="card rounded-3 shadow text-center">
                  <div className="card-body">
                    <h2 className="text-center fw-bold">
                      My <span className="text-primary">Indegene</span>
                    </h2>
                    <h5 className="text-1 text-center fw-bold p-lg-0 px-5">
                      We are a technology-led healthcare solutions provider
                    </h5>
                    <p className="text-2 p-lg-0 p-5">
                      We are a technology-led healthcare solutions provider. We
                      combine deep industry expertise with fit-for-purpose
                      technology in an agile and scalable operating model. Many
                      of the leading, global healthcare organizations rely on us
                      to deliver effective and efficient clinical, medical and
                      commercial outcomes every day. From strategy to execution,
                      we enable healthcare organizations be future ready.
                    </p>
                    <p className="text-center my-lg-4">
                      All rights resolved{" "}
                      <span className="fa fa-copyright "> Slide</span>{" "}
                      <span className="text-primary"> Template</span>{" "}
                      <span className="fa fa-trademark align-top "></span> 2022
                    </p>
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

export default About; //export about
