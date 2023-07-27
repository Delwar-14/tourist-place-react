import { SET_FORM_DATA, SEARCH_FILTER, UPDATE_ROW_DATA, DELETE_ROW_DATA, FILTER } from "../actions/actions";

const initialState = {
  formData: [],
  inputs: '',
  order: 'NORMAL',
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      const { id, name, address, image, rating, type } = action.payload;
      return {
        ...state,
        formData: [
          ...state.formData,
          {
            name,
            address,
            image,
            rating,
            type,
            id: id
          }
        ],
      };

    case DELETE_ROW_DATA:
      const newState = state.formData.filter((place) => place.id !== action.id.id);
      return {
        ...state,
        formData: [
          ...newState,
        ],
      };

    case UPDATE_ROW_DATA:
      const update = action.payload;
      const idx = state.formData.findIndex(obj => obj.id === update.data.id);
      state.formData[idx] = update.data;
      return {
        ...state,
        formData: [
          ...state.formData,
        ],
      };

    case FILTER:
      return {
        ...state,
        order: action.payload.data
      }

    case SEARCH_FILTER:
      return {
        ...state,
        inputs: action.payload.data
      }

    default:
      return state;
  }
};

export default placesReducer;
