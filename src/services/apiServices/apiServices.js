import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const createPlace = async (newPlaceData) => {
  try {
    const response = await axios.post(`${BASE_URL}/places/`, newPlaceData);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getSpecificPlace = async (placeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/places/${placeId}/`);

    return response;
  } catch (error) {
    return error;
  }
};

export const updatePlace = async (updatePlaceData, placeId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/places/${placeId}/`,
      updatePlaceData
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deletePlace = async (placeId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/places/${placeId}/`);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPlaces = async (order, searchInput) => {
  try {
    const queries = `sort_rating_order=${order}&search=${searchInput}`;

    const response = await axios.get(`${BASE_URL}/places/?${queries}`);

    return response;
  } catch (error) {
    return error;
  }
};
