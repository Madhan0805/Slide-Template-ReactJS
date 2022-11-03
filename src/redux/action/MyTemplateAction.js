export const saveMyTemplateAction = (payload) => {
  return {
    type: "GET_MY_TEMPLATE",

    payload: payload,
  };
};

export const saveSlideAction = (payload) => {
  return {
    type: "SAVE_SLIDES",
    payload: payload,
  };
};

export const addSlideItemAction = (payload) => {
  return {
    type: "ADD_NEW_SLIDE_ITEM",

    payload: payload,
  };
};

export const updateSlideItemAction = (payload) => {
  return {
    type: "UPDATE_SLIDE_ITEM",
    payload: payload,
  };
};

export const resetCreateTemplate = () => {
  return { type: "RESET_CREATE_TEMPLATE", payload: null };
};

export const updateTemplateListAction = (payload) => {
  return { type: "UPDATE_TEMPLATE_LIST", payload: payload };
};
