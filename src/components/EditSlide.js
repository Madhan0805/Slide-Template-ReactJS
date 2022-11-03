import React, { useEffect, useRef, useState } from "react";
import {
  getSingleTemplateDetailsService,
  getSlidesService,
  saveNewTemplate,
  updateTemplateService,
} from "../services/TemplateService";
import SlideHeader from "./SlideHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewSlideItemAction,
  resetCreateTemplate,
  saveSlideAction,
  updateSlideItemListAction,
} from "../redux/action/MyTemplateAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_PUBLIC } from "../services";
import SlideLeftMenu from "./SlideLeftMenu";

function EditSlide(props) {
  let { id } = useParams();

  let navigate = useNavigate();
  let createSlideInput = useRef();
  let dispatch = useDispatch();
  let slideList = useSelector((state) => state.myTemplate.slides);

  let [editTemplate, setEditTemplate] = useState({
    name: "",
    slides: [],
    slidesCount: 0,
    _id: "",
  });

  let getSlides = async () => {
    let slides = await getSlidesService();
    dispatch(saveSlideAction(slides));
  };

  let addToSlide = (slide) => {
    slide = JSON.parse(slide);
    let isFound = editTemplate.slides.find((slide_item) => {
      return slide_item._id === slide._id;
    });
    if (isFound === undefined) {
      let _editTemplate = { ...editTemplate };
      let _slides = [..._editTemplate.slides];
      _slides.push(slide);
      setEditTemplate({
        ..._editTemplate,
        slides: [..._slides],
        slidesCount: _slides.length,
      });
    }
  };

  let deleteSlideItem = (id) => {
    let _updatedArray = editTemplate.slides.filter((slide) => {
      return id !== slide._id;
    });
    setEditTemplate({
      ...editTemplate,
      slides: [..._updatedArray],
      slidesCount: _updatedArray.length,
    });
  };

  let updateTemplate = async () => {
    let slide_name = createSlideInput.current.value;

    if (slide_name === "" || editTemplate.slides.length === 0) return false;
    let sendData = {
      ...editTemplate,
      name: slide_name,
    };
    await updateTemplateService(sendData);
    setEditTemplate({
      name: "",
      slides: [],
      slidesCount: 0,
      _id: "",
    });
    navigate("/my-slide");
  };

  let getSingleTemplateDetails = async (id) => {
    let result = await getSingleTemplateDetailsService(id);
    if (result !== null) {
      setEditTemplate(result);
      createSlideInput.current.value = result.name;
    } else {
      navigate("/my-slide");
    }
  };

  useEffect(() => {
    getSlides();
    getSingleTemplateDetails(id);
  }, []);

  return (
    <>
      <main className="container-fluid">
        <div className="row">
          <SlideLeftMenu />
          <section className="col-9 p-0">
            <SlideHeader title="Edit Slide" icon="fa-file-image-o" />
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
                onClick={updateTemplate}
              ></button>
            </div>
            <div
              className="col-9 text-center image-area d-flex overflow-auto border-bottom border-3"
              style={{ height: "30.5vh", width: "100%" }}
            >
              {editTemplate.slides.length === 0 ? (
                <img
                  src="./images/default.jpg"
                  alt="1"
                  className=" shadow border mx-5 border-secondary mt-4"
                />
              ) : (
                editTemplate.slides.map((slide) => {
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
                    className=" shadow border border-secondary mt-4 mx-3"
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

export default EditSlide;
