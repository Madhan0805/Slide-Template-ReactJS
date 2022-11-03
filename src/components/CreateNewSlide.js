import React, { useRef, useEffect, useState } from "react"; //import react
import { Link, useNavigate } from "react-router-dom"; //import react router dom
import SlideHeader from "./SlideHeader"; //import slide header
import { useSelector, useDispatch } from "react-redux";
import { getSlidesService, saveNewTemplate } from "../services/TemplateService";
import { setLoginAction } from "../redux/action/UserAction";
import { removeToken } from "../services/TokenService";
import {
  saveSlideAction,
  addSlideItemAction,
  resetCreateTemplate,
  updateSlideItemAction,
} from "../redux/action/MyTemplateAction";
import { BASE_PUBLIC } from "../services/index";
import SlideLeftMenu from "./SlideLeftMenu";

//function
function CreateNewSlide(props) {
  let createSlideInput = useRef();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let logout = () => {
    removeToken();
    dispatch(setLoginAction({ status: false, user: null }));
    navigate("/home");
  };
  let slideList = useSelector((state) => state.myTemplate.slides);
  let newSlides = useSelector((state) => state.myTemplate.newSlide.slides);
  let slideToSave = useSelector((state) => state.myTemplate.newSlide);

  let getSlides = async () => {
    let slides = await getSlidesService();
    dispatch(saveSlideAction(slides));
  };
  let addToSlide = (slide) => {
    slide = JSON.parse(slide);
    let isFound = newSlides.find((slide_item) => {
      return slide_item._id === slide._id;
    });
    if (isFound === undefined) {
      dispatch(addSlideItemAction(slide));
    }
    // console.log(slide);
  };
  let deleteSlideItem = (id) => {
    let _updatedArray = newSlides.filter((slide) => {
      return id !== slide._id;
    });
    dispatch(updateSlideItemAction(_updatedArray));
  };
  let createNewTemplate = async () => {
    let slide_name = createSlideInput.current.value;
    if (slide_name === "") return false;
    let sendData = {
      ...slideToSave,
      name: slide_name,
    };
    let status = await saveNewTemplate(sendData);
    if (status) {
      dispatch(resetCreateTemplate());
      navigate("/my-slide");
    }
  };
  useEffect(() => {
    getSlides();
  }, []);
  return (
    <>
      <main className="container-fluid">
        <div className="row">
          <SlideLeftMenu />
          <section className="col-12 col-lg-9 p-0">
            <SlideHeader title="Create New Slide" icon="fa-file-image-o" />
            {/* <header className="bg-light d-flex justify-content-between border-bottom border-3" style={{ height: "10vh" }}>
                            <p className="p-2 my-1 h3 fa fa-image fa-2x"> Create New Slide</p>
                            <div className="p-2 my-1 fa-2x">
                                <a href="#" className="h3 fa fa-user text-decoration-none text-black mx-4"></a>
                                <a href="#" className="h3 fa fa-sign-out text-decoration-none text-black"></a>
                            </div>
                        </header> */}
            <div
              className="col-9 text-center border-bottom border-3"
              style={{ height: "11vh", width: "100%" }}
            >
              <input
                type="text"
                placeholder="Enter Slide Name"
                className="p-2 mt-3 w-50 rounded rounded-5 border border-primary"
                ref={createSlideInput}
              />
              <button
                className="fa fa-save text-light mx-2 bg-primary border-0 p-2 rounded-1 rounded rounded-5 border border-primary"
                onClick={createNewTemplate}
              ></button>
            </div>
            <div
              className=" text-center d-flex overflow-auto main-image border-bottom border-3"
              style={{ height: "30.5vh", width: "100%" }}
            >
              {newSlides.length === 0 ? (
                <img
                  src="./images/default.jpg"
                  alt="1"
                  className=" shadow border mx-5 border-secondary mt-4"
                />
              ) : (
                newSlides.map((slide) => {
                  return (
                    <div
                      key={slide._id}
                      className=" slides border border-dark border-1 p-0 mt-3  ms-3 position-relative"
                      style={{ height: "160px", width: "300px" }}
                    >
                      <img src={`${BASE_PUBLIC}${slide.image}`} alt="" />
                      <button
                        onClick={() => deleteSlideItem(slide._id)}
                        className=" remove position-absolute top-0 end-0 btn btn-danger"
                      >
                        <span className="fa fa-trash"></span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div
              className="col-9 text-center image-area overflow-auto border-bottom border-3"
              style={{ height: "48.5vh", width: "100%" }}
            >
              {slideList.map((slide) => {
                return (
                  <img
                    onClick={() => addToSlide(JSON.stringify(slide))}
                    key={slide._id}
                    src={`${BASE_PUBLIC}${slide.image}`}
                    alt="1"
                    className="shadow border border-secondary mt-4 mx-3"
                  />
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default CreateNewSlide; //export create new slide
