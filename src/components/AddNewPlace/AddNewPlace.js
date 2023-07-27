import UserForm from './UserForm'
const AddNewPlace = (props) => {

    return (
        <div className='container'>
            <h3 className='text-center'>Add new Tourist Place</h3>
            <UserForm name={''} address={''} rating={1} type={'Beach'} image={''} id={''}></UserForm>
        </div>
    );
};

export default (AddNewPlace);
