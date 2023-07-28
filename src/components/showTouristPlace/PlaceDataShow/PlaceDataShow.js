import React from 'react';
import { Link } from 'react-router-dom';

import './RowDataShow.css';
import { deletePlace } from '../../../services/apiServices/apiServices';

const PlaceDataShow = (props) => {
  const data = props?.place;
  const id = props?.place?.id;
  const { setIsDeletePlace, isDeletePlace } = props;

  const handleDelete = async () => {
    await deletePlace(id);
    setIsDeletePlace(!isDeletePlace);
  };

  return (
    <div className="list-row" id="row">
      <div id="listName" className="row-data">
        {data?.name}
      </div>
      <div className="row-data">{data?.address}</div>
      <div className="row-data" id="list-rating">
        {data?.rating}
      </div>
      <div className="row-data">
        <img src={data.image} alt="" />
      </div>
      <div className="row-data-btn">
        <Link className="update-btn" to={`/update-tourist-place/${id}`}>
          {' '}
          Update{' '}
        </Link>
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default PlaceDataShow;
