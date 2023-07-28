import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import UserForm from './UserForm';
import { getSpecificPlace } from '../../services/apiServices/apiServices';

const UpdatePlace = (props) => {
  const { id } = useParams();
  const [touristPlace, setTouristPlace] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const places = await getSpecificPlace(id);

        setTouristPlace(places.data.places);
      } catch (error) {
        console.error('Error fetching getSpecificPlace data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      <h3 className="text-center">Update Tourist Place</h3>
      {touristPlace && (
        <UserForm
          name={touristPlace.name}
          address={touristPlace.address}
          rating={touristPlace.rating}
          type={touristPlace.type}
          image={''}
          id={touristPlace.id}
        ></UserForm>
      )}
    </div>
  );
};

export default UpdatePlace;
