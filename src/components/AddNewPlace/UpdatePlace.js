import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import UserForm from './UserForm';

const UpdatePlace = (props) => {
    const { id } = useParams();
    const touristPlaces = useSelector(state => state.placeReducers.formData);
    const touristPlace = touristPlaces.find(place => place.id.toString() === id)

    return (
        <div className='container'>
            <h3 className='text-center'>Update Tourist Place</h3>
            <UserForm name={touristPlace.name} address={touristPlace.address} rating={touristPlace.rating} type={touristPlace.type} image={''} id={touristPlace.id}></UserForm>
        </div>
    );
};

export default (UpdatePlace);
