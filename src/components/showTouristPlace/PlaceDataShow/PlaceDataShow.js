import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRowData } from '../../../services/actions/actions';
import  './RowDataShow.css'

const PlaceDataShow = (props) => {
    const dispatch = useDispatch();
    const data = props?.place;
    const id = props?.place?.id;

    return (
            <div className="list-row" id="row">
                <div id="listName" className="row-data">{data?.name}</div>
                <div className="row-data">{data?.address}</div>
                <div className="row-data" id="list-rating">{data?.rating}</div>
                <div className="row-data"><img src={data.image} alt="" /></div>
                <div className="row-data-btn">
                    <Link className='update-btn' to={`/update-tourist-place/${id}`} > Update </Link>
                    <button onClick={() => dispatch(deleteRowData({ id }))} className="delete-btn">Delete</button>
                </div>
            </div>
    );
};

export default PlaceDataShow;