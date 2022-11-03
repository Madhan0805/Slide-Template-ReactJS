import React, { useState, useEffect } from "react"; //import react
import { Link, useNavigate } from "react-router-dom"; //import react router dom
import SlideHeader from "./SlideHeader"; //import slide header components
// import axios from "axios"; //import axios
import {
  getMyTemplateService,
  deleteTemplateService,
} from "../services/TemplateService";
import { useSelector, useDispatch } from "react-redux";
import {
  saveMyTemplateAction,
  updateTemplateListAction,
} from "../redux/action/MyTemplateAction";
import { removeToken } from "../services/TokenService";
import { setLoginAction } from "../redux/action/UserAction";
import { BASE_PUBLIC } from "../services";
import SlideLeftMenu from "./SlideLeftMenu";

//function
function MySlide(props) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [preCount, setPreCount] = useState(0);
  let [preview, setPreview] = useState({
    name: "",
    slides: [],
    slidesCount: 0,
  });
  let [slidePreviewImage, setSlidePreviewImage] = useState(
    "/images/slides/thumbnails/default.jpg"
  );

  let logout = () => {
    removeToken();
    dispatch(setLoginAction({ status: false, user: null }));
    navigate("/home");
  };
  let { myTemplateList } = useSelector(({ myTemplate }) => myTemplate);
  let getMyTemplateList = async () => {
    try {
      let myTemplateList = await getMyTemplateService();
      console.log(myTemplateList);
      dispatch(saveMyTemplateAction(myTemplateList));
    } catch (error) {
      console.log(error);
      alert("Connection error/server error");
    }
  };

  let getSlidesDetails = (id) => {
    let _template = myTemplateList.find((template) => {
      return id === template._id;
    });
    setPreview({ ..._template });
    setPreCount(0);
  };

  let deleteMyTemplate = async (id) => {
    try {
      let status = await deleteTemplateService(id);
      if (status) {
        let _updateTemplate = myTemplateList.filter((template) => {
          return id !== template._id;
        });
        dispatch(updateTemplateListAction(_updateTemplate));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyTemplateList();
  }, []);

  useEffect(() => {
    let _length = preview.slides.length;

    if (preCount <= -1) setPreCount(_length - 1);
    if (preCount >= _length) setPreCount(0);

    if (preview.slides[preCount] !== undefined)
      setSlidePreviewImage(BASE_PUBLIC + preview.slides[preCount].image);
  }, [preCount, preview]);

  // let [myTemplateList, setMyTemplateList] = useState([]);
  // let getMyTemplateList = async () => {
  //   try {
  //     let myTemplate = await getMyTemplateService();
  //     setMyTemplateList([...myTemplate]);
  //   } catch (error) {
  //     console.log(error);
  //     alert("Connection error/server error");
  //   }
  // };
  // let deleteMyTemplateList = async (id) => {
  //   templateid = id;
  //   let URL = `http://localhost:4501/api/delete-a-slide?mtid=${templateid}`;
  //   let { data } = await axios.delete(URL);
  //   let { message, status } = data;
  //   if (status) {
  //     getMyTemplateList();
  //   } else {
  //     alert(message);
  //   }
  // };

  return (
    <>
      <div
        className="modal fade"
        id="my-template-slides"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="my-template-slides-lable"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title fw-bold h4 text-primary"
                id="my-template-slides-label"
              >
                {preview.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row px-3 justify-content-center">
                <div className="col-6 mb-4">
                  <div className="border border-4 w-75 mx-5">
                    <img
                      src={slidePreviewImage}
                      alt=""
                      className="w-100 h-100"
                      id="carousel-image"
                    />

                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary"
                        onClick={() => setPreCount(preCount - 1)}
                      >
                        <i>Previous</i>
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => setPreCount(preCount + 1)}
                      >
                        <i>Next</i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex gap-2 flex-wrap justify-content-center">
                  {preview.slides.map((slide, index) => {
                    return (
                      <div
                        key={index}
                        className="slide-thumbnail border border-2 "
                      >
                        <img
                          src={BASE_PUBLIC + slide.image}
                          alt=""
                          className="w-100 h-100"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
      <main className="container-fluid">
        {/* <button onClick={getMyTemplateList}>Get Template List</button> */}
        <div className="row">
          <SlideLeftMenu />
          <section className="col-12 col-lg-9 p-0">
            <SlideHeader title="My Slide" icon="fa-file-image-o" />
            {/* <header className="bg-light d-flex justify-content-between border-bottom border-3" style = {{height:"10vh"}}>
                            <p className="p-2 my-1 h3 fa-2x fa fa-folder"> My Slide</p>
                            <div className="p-2 my-1 fa-2x">
                                <a href="#" className="h3 fa fa-user text-decoration-none text-black mx-4"></a>
                                <a href="#" className="h3 fa fa-sign-out text-decoration-none text-black"></a>
                            </div>
                        </header> */}
            <div
              className="col-9 border-bottom border-3"
              style={{ height: "11vh", width: "100%" }}
            >
              <input
                type="text"
                placeholder="Enter Slide Name"
                className="p-2 mt-3 w-50 mx-2 rounded rounded-5 border border-primary"
              />
              <button className="fa fa-search text-light mx-1 bg-primary border-0 p-3 rounded-1 rounded rounded-5 border border-primary"></button>
            </div>

            <div
              className="col-9 d-flex justify-content-evenly flex-wrap image-area-1 overflow-auto border-bottom border-3"
              style={{ height: "79vh", width: "100%" }}
            >
              {myTemplateList.map((template) => {
                return (
                  <div key={template._id} className="relative">
                    <img
                      src={`${BASE_PUBLIC}${template.slides[0].image}`}
                      alt="1"
                      className=" shadow border border-secondary mt-4"
                    />
                    <p className="absolute bg-primary w-100 text-light bg-opacity-75">
                      {template.name}
                    </p>
                    <div className="dropdown absolute-1">
                      <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="fa fa-list"></span>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => getSlidesDetails(template._id)}
                            data-bs-toggle="modal"
                            data-bs-target="#my-template-slides"
                          >
                            <a className="fa fa-eye text-success text-decoration-none set-my-template-slides"></a>
                          </button>
                        </li>
                        <li>
                          <Link
                            to={`/edit-slide/${template._id}`}
                            className="dropdown-item"
                          >
                            <span className="fa fa-edit text-primary"></span>
                          </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => deleteMyTemplate(template._id)}
                          >
                            <a className="fa fa-trash text-danger text-decoration-none"></a>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default MySlide; //export myslide
