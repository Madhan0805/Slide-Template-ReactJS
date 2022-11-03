let newSlide = {
  name: "",
  slides: [],
  slidesCount: 0,
};
let initialState = {
  myTemplateList: [],
  slides: [],
  newSlide: { ...newSlide },
};

export const myTemplateReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case "GET_MY_TEMPLATE":
      return { ...state, myTemplateList: payload };

    case "SAVE_SLIDES":
      return { ...state, slides: payload };

    case "ADD_NEW_SLIDE_ITEM":
      let _newSlide = { ...state.newSlide };
      let _slides = [..._newSlide.slides];
      _slides.push({ ...payload });
      _newSlide = { ..._newSlide, slides: [..._slides] };
      return {
        ...state,
        newSlide: {
          ..._newSlide,
          slides: [..._slides],
          slidesCount: _slides.length,
        },
      };

    case "UPDATE_SLIDE_ITEM":
      let _newUpdateSlide = { ...state.newSlide };
      // let slides = [..._newSlide.slides];
      // _slides.push({ ...payload });
      _newUpdateSlide = { ..._newUpdateSlide, slides: [...payload] };
      return {
        ...state,
        newSlide: {
          ..._newUpdateSlide,
          slides: [...payload],
          slidesCount: payload.length,
        },
      };

    case "RESET_CREATE_TEMPLATE":
      return { ...state, newSlide: { ...newSlide } };

    case "UPDATE_TEMPLATE_LIST":
      return { ...state, myTemplateList: [...payload] };

    default:
      return { ...state };
  }
};
