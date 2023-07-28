import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import TouristPlaceHeading from './HeaderPart/TouristPlaceHeading';
import PlaceDataShow from './PlaceDataShow/PlaceDataShow';
import NotFoundData from './NotFoundData/NotFoundData';
import { searchFilter } from '../../services/actions/actions';
import { getPlaces } from '../../services/apiServices/apiServices';
import './table.css';

const ShowTouristPlace = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.placeReducers.order);
  const searchInputValues = useSelector((state) => state.placeReducers.inputs);
  const [searchInput, setSearchInput] = useState({ name: searchInputValues });
  const [isDeletePlace, setIsDeletePlace] = useState(false);
  const [listTouristPlaces, setListTouristPlaces] = useState();

  const handleSearchTextChange = (event) => {
    setSearchInput({
      name: event.target.value,
    });
  };

  dispatch(searchFilter(searchInput));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const places = await getPlaces(order, searchInputValues);

        setListTouristPlaces(places.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isDeletePlace, order, searchInputValues]);

  const touristPlaceInfoView = (
    <>
      {listTouristPlaces?.length > 0 ? (
        listTouristPlaces.map((place) => {
          return (
            <PlaceDataShow
              id={place.id}
              key={place.id}
              place={place}
              setIsDeletePlace={setIsDeletePlace}
              isDeletePlace={isDeletePlace}
            ></PlaceDataShow>
          );
        })
      ) : (
        <NotFoundData></NotFoundData>
      )}
    </>
  );

  return (
    <div className="container">
      <Form>
        <Form.Group as={Row} className="search-input-form" controlId="name">
          <Col sm={8}>
            <Form.Control
              className="form-control"
              type="text"
              value={searchInputValues}
              placeholder="Search Place By Name"
              onChange={handleSearchTextChange}
              required
            />
          </Col>
        </Form.Group>
      </Form>
      <br />
      <div className="table">
        <TouristPlaceHeading></TouristPlaceHeading>
        {touristPlaceInfoView}
      </div>
      <Link className="create-btn" to="/create-tourist-place">
        Create New Tourist Place{' '}
      </Link>
      <br />
    </div>
  );
};

export default ShowTouristPlace;
