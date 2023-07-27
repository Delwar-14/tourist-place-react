import React, { useState } from 'react';
import { Form, Row, Col, } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import AddNewPlaceStyle from './AddNewPlaceStyle.css';
import { setInputFormData, updateRowData } from '../../services/actions/actions';
import { userSchema } from '../../Validation/Validation';

const AddNewPlace = (props) => {
    const history = useHistory();
    const [name, setName] = useState({ value: props.name });
    const [address, setAddress] = useState({ value: props.address });
    const [rating, setRating] = useState({ value: props.rating });
    const [type, setType] = useState({ value: props.type });
    const [image, setImage] = useState({ value: props.image });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const id = props.id;

    const handleNameChange = (event) => {
        setName({
            ...name,
            value: event.target.value
        })
    }

    const handleAddressChange = (event) => {
        setAddress({
            ...address,
            value: event.target.value
        })
    }

    const handleRatingChange = (event) => {
        setRating({
            ...rating,
            value: event.target.value
        })
    }

    const handleTypeChange = (event) => {
        setType({
            ...type,
            value: event.target.value
        })
    }

    const handleImageChange = (event) => {
        uploadImage(event);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const uploadImage = async (event) => {
        const file = event.target.files[0];
        const base64Image = await convertBase64(file);
        setImage({
            value: base64Image
        })

        return;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        userSchema.validate({ name: name.value, address: address.value, rating: rating.value, type: type.value, image: image.value }, { abortEarly: false })
            .then(() => {
                if (!id)
                    dispatch(setInputFormData({ name, address, rating, type, image }))
                else
                    dispatch(updateRowData({ name: name.value, address: address.value, type: type.value, rating: rating.value, image: image.value, id: id }))
                history.push('/');
            })
            .catch((err) => {
                const newErrors = {};
                err.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors);
            })
    }

    const resetBtnHandler = () => {
        setName({
            value: ''
        })
        setAddress({
            value: ''
        })
        setType({
            value: 'Beach'
        })
        setRating({
            value: 1
        })
        setImage({
            value: ''
        })
        setErrors({});
    }

    return (
        <Form style={AddNewPlaceStyle} onSubmit={handleSubmit} >
            <Form.Group as={Row} className='input-form' controlId='name'>
                <Form.Label column sm={2}>Name:</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        className='form-control'
                        type="text"
                        placeholder='tourist place name'
                        value={name.value}
                        onChange={handleNameChange}
                        required
                    />
                    {errors.name && Touch.name && <p className='error'>{errors.name}</p>}
                </Col>
            </Form.Group >
            <Form.Group as={Row} className='input-form' controlId='address'>
                <Form.Label column sm={2}>Address:</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        className='form-control'
                        type="text"
                        placeholder='tourist place address'
                        value={address.value}
                        onChange={handleAddressChange}
                        required
                    />
                    {errors.address && <p className='error'>{errors.address}</p>}
                </Col>
            </Form.Group >
            <Form.Group className='input-form' as={Row} controlId='rating'>
                <Form.Label column sm={2}>Rating:</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        className='form-control'
                        type="number"
                        min="1"
                        max="5"
                        placeholder='tourist place rating'
                        value={rating.value}
                        onChange={handleRatingChange}
                        required
                    />
                    {errors.rating && <p className='error'>{errors.rating}</p>}
                </Col>
            </Form.Group >
            <Form.Group className='input-form' as={Row} controlId='type'>
                <Form.Label column sm={2}>Type:</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        as='select'
                        className='form-control'
                        value={type.value}
                        onChange={handleTypeChange}
                        required
                    >
                        <option value="Beach">Beach</option>
                        <option value="Hills">Hills</option>
                        <option value="Landmark">Landmark</option>
                        <option value="Fountain">Fountain</option>
                    </Form.Control>
                    {errors.type && <p className='error'>{errors.type}</p>}
                </Col>
            </Form.Group >
            <Form.Group className='input-form' as={Row} controlId='image'>
                <Form.Label column sm={2}>Type:</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        className='form-control'
                        type="file"
                        accept='image/*'

                        onChange={handleImageChange}
                        required
                    />
                    {errors.image && <p className='error'>{errors.image}</p>}
                </Col>
            </Form.Group >
            <Form.Group className='input-form' as={Row}>
                <Col className='btn-div'>
                    <button className='btn btn-success submit-reset-btn' type='submit'>submit</button>
                    <button onClick={resetBtnHandler} className='btn btn-warning submit-reset-btn center' type='reset'>reset</button>
                    <br />
                    <br />
                    <Link to='/' > back to tourist place list</Link>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default (AddNewPlace);
