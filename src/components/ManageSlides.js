import React, { useRef, useEffect, useState } from "react"; //import react
import { Link, useNavigate } from "react-router-dom"; //import react router dom
import SlideHeader from "./SlideHeader"; //import slide header
import { useSelector, useDispatch } from "react-redux";
import {
  getSlidesService,
  saveNewSlide,
  saveNewTemplate,
} from "../services/TemplateService";
import { setLoginAction } from "../redux/action/UserAction";
import { removeToken } from "../services/TokenService";
import {
  saveSlideAction,
  addSlideItemAction,
  updateSlideItemAction,
} from "../redux/action/MyTemplateAction";
import { BASE_PUBLIC } from "../services/index";
import SlideLeftMenu from "./SlideLeftMenu";

//function
function ManageSlides(props) {
  let fileInput = useRef();
  let buttonInput = useRef();
  let dispatch = useDispatch();

  let defaultImage = "/images/default.jpg";
  let [file, setFile] = useState(null);

  let [imagePreview, setImagePreview] = useState(defaultImage);
  let slideList = useSelector((state) => state.myTemplate.slides);

  let getSlides = async () => {
    let slides = await getSlidesService();
    dispatch(saveSlideAction(slides));
  };

  let uploadSlide = async (event) => {
    if (file === null) return false;

    event.target.disabled = true;
    event.target.innerHTML = "Saving...";
    let formData = new FormData();
    formData.append("slide", file);

    let result = await saveNewSlide(formData);
    alert(result.message);

    if (result.status) {
      getSlides();
      fileInput.current.value = "";
      setImagePreview(defaultImage);
      setFile(null);
    }
    event.target.disabled = false;
    event.target.innerHTML = "Save";
  };

  let getFilesDetails = (event) => {
    if (event.target.files[0] === undefined) return false;

    let file = event.target.files[0];

    let reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result);
      setFile(file);
    };

    reader.readAsDataURL(file);
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
            <SlideHeader title="Manage Slides" icon="fa-file-image-o" />
            {/* <header className="bg-light d-flex justify-content-between border-bottom border-3" style={{ height: "10vh" }}>
                            <p className="p-2 my-1 h3 fa fa-image fa-2x"> Create New Slide</p>
                            <div className="p-2 my-1 fa-2x">
                                <a href="#" className="h3 fa fa-user text-decoration-none text-black mx-4"></a>
                                <a href="#" className="h3 fa fa-sign-out text-decoration-none text-black"></a>
                            </div>
                        </header> */}
            {/* <div
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
            </div> */}
            <div
              className="col-9 text-center image-area d-flex overflow-auto border-bottom border-3"
              style={{ height: "30.5vh", width: "100%" }}
            >
              <input
                type="file"
                id="myfile"
                name="myfile"
                onChange={getFilesDetails}
                ref={fileInput}
                className=" shadow border mx-3 mt-4 h-75 border-secondary"
              ></input>

              <img
                src={imagePreview}
                alt="1"
                className=" shadow border mx-5 border-secondary mt-4"
              />
              <button
                className="align-self-end btn btn-success"
                onClick={uploadSlide}
              >
                Save
              </button>
            </div>
            <div
              className="col-9 text-center image-area overflow-auto border-bottom border-3"
              style={{ height: "59.5vh", width: "100%" }}
            >
              {slideList.map((slide) => {
                return (
                  <img
                    key={slide._id}
                    src={`${BASE_PUBLIC}${slide.image}`}
                    alt="1"
                    className=" shadow border border-secondary mt-4 mx-3 img"
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

export default ManageSlides; //export create new slide
