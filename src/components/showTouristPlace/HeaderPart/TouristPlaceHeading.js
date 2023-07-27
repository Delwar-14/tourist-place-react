import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeaderPart from './HeaderPart.css';
import { orderFilter } from '../../../services/actions/actions';

const TouristPlaceHeading = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.placeReducers.order);

    return (
        <div style={HeaderPart} className='root'>
            <div className='table-heading'>Name</div>
            <div className='table-heading'>Address</div>
            <div className='table-heading' onClick={() => dispatch(orderFilter({ order }))}>
                <button className='sort-btn'> Rating
                    {(order === 'DESC') ?
                        <i className="fa-solid fa-sort-up"></i> :
                        (order === 'ASC') ?
                            <i className="fa-solid fa-sort-down"></i> : ''}</button></div>
            <div className='table-heading'>Picture</div>
            <div className='table-heading'>Action</div>
        </div>
    );
};

export default TouristPlaceHeading;