import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Form, Row, Col, } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import TouristPlaceHeading from './HeaderPart/TouristPlaceHeading';
import PlaceDataShow from './PlaceDataShow/PlaceDataShow';
import NotFoundData from './NotFoundData/NotFoundData';
import PleaseInsert from './PleaseInsert/PleaseInsert';
import { searchFilter } from '../../services/actions/actions';
import './table.css';

const ShowTouristPlace = () => {
    const dispatch = useDispatch();
    let result = [];

    const touristPlaces = useSelector(state => state.placeReducers.formData);
    const order = useSelector(state => state.placeReducers.order);
    const searchInputValues = useSelector(state => state.placeReducers.inputs);
    const [searchInput, setSearchInput] = useState({ name: searchInputValues });
    const [listTouristPlaces, setListTouristPlaces] = useState([]);
    let inputValue;

    function getAscSort(data) {
        data.sort((a, b) => {
            if (a.rating < b.rating)
                return -1;
            if (a.rating > b.rating)
                return 1;
            return 0;
        });
        return data;
    }

    const handleChange = (event) => {
        setSearchInput({
            name: event.target.value,
        });
    }

    dispatch(searchFilter(searchInput));

    if (searchInputValues) {
        let res = [];
        inputValue = searchInputValues.toLowerCase();
        touristPlaces.forEach((item) => {
            if (item.name.toLowerCase().indexOf(inputValue) !== -1) {
                res.push(item);
            }
        })
        result = [...res];
    }

    function getTouristPlaceList(ascOrderTemp, temp) {
        if (order === 'ASC') {
            setListTouristPlaces(ascOrderTemp);
        } else if (order === 'DESC') {
            ascOrderTemp.reverse();
            setListTouristPlaces(ascOrderTemp);
        }
        else if (order === 'NORMAL')
            setListTouristPlaces([...temp]);
    }

    useEffect(() => {
        let temp;
        let ascOrderTemp;

        if (inputValue)
            temp = [...result];
        else
            temp = ([...touristPlaces]);

        ascOrderTemp = [...temp];
        getAscSort(ascOrderTemp);
        getTouristPlaceList(ascOrderTemp, temp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order, touristPlaces, inputValue])

    const touristPlaceInfoView = <>
        {touristPlaces.length > 0 ?
            listTouristPlaces.length > 0 ?
                listTouristPlaces.map((place) => {
                    return (
                        <PlaceDataShow id={place.id} key={place.id} place={place}></PlaceDataShow>
                    )
                })
                :
                <NotFoundData></NotFoundData>
            :
            <PleaseInsert></PleaseInsert>}
    </>

    return (
        <div className='container'>
            <Form>
                <Form.Group as={Row} className='search-input-form' controlId='name'>
                    <Col sm={8}>
                        <Form.Control
                            className='form-control'
                            type="text"
                            value={searchInputValues}
                            placeholder='Search Place By Name'
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Form.Group >
            </Form>
            <br />
            <div className='table'>
                <TouristPlaceHeading></TouristPlaceHeading>
                {touristPlaceInfoView}
            </div>
            <Link className='create-btn' to='/create-tourist-place'>Create New Tourist Place </Link><br />
        </div>
    );
};

export default ShowTouristPlace;
