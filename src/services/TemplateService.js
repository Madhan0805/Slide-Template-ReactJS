import { BASE_URL, GET, POST, DELETE, PUT } from "./index";
import Swal from "sweetalert2";

export const getMyTemplateService = async () => {
  try {
    let response = await GET(BASE_URL + "get-template-list");
    let { status, myTemplate: List } = response.data;
    if (status) {
      console.log(List);
      return List;
    } else {
      Swal.fire("List is not available");
      return [];
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSingleTemplateDetailsService = async (id) => {
  try {
    let response = await GET(BASE_URL + "get-template-details-by-id/" + id);
    let { status, result, message } = response.data;
    if (status) {
      return result;
    } else {
      Swal.fire(message);
      return null;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSlidesService = async () => {
  try {
    let response = await GET(BASE_URL + "slides");
    let { status, slides } = response.data; // se
    if (status) {
      return slides;
    } else {
      Swal.fire("List Not Available");
      return [];
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTemplateService = async (id) => {
  try {
    let result = await Swal.fire({
      title: "Are you sure to delete?",
      // text: "You won't be able to revert this!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      let response = await DELETE(BASE_URL + "delete-a-slide?mtid=" + id);
      let { status, message } = response.data; // se
      // alert(message);
      return status;
    } else {
      return false;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const saveNewTemplate = async (sendData) => {
  try {
    let response = await POST(BASE_URL + "create-new-slide", sendData);
    let { status, message } = response.data;
    Swal.fire(message);
    return status;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const saveNewSlide = async (formData) => {
  try {
    let response = await POST(BASE_URL + "add-slide", formData);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTemplateService = async (sendData) => {
  try {
    let response = await PUT(BASE_URL + "update-a-slide", sendData);
    let { status, message } = response.data;
    Swal.fire(message);
    return status;
  } catch (error) {
    return Promise.reject(error);
  }
};

// export const getNewSlidesService = async () => {
//   try {
//     let response = await GET(BASE_URL + "create-a-new-slide");

//     let { status, slides } = response.data;

//     if (status) {
//       return slides;
//     } else {
//       alert("List is not added");
//       return [];
//     }
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };
