import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({ value }) => {
    // destructuring values
    const { name, email, image, company, id } = value;
    const city = value?.address?.city;
    const state = value?.address?.state;
    const postalCode = value?.address?.postalCode;
    const street = value?.address?.address;

    // for navigating eachUser page
    const navigate = useNavigate();

    return (
        <div className='flex flex-col rounded-md shadow p-4 gap-2 text-left'>
            <img className='w-1/6 rounded-lg shadow m-auto' src={image} alt="user-image" />
            <p>Name: <span className='underline decoration-blue-700 hover:cursor-pointer hover:text-gray-500' onClick={() => {
                navigate(`/user/${id}`)
            }}>{name}</span> </p>
            <p>Email: {email}</p>
            <p>Company Name: {company}</p>
            <p>Address: {street}, {city}, {state}, {postalCode}.</p>
        </div>
    );
};

// defining propTypes
UserInfo.propTypes = {
    value: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        address: PropTypes.shape({
            city: PropTypes.string,
            state: PropTypes.string,
            postalCode: PropTypes.string,
            address: PropTypes.string
        })
    }).isRequired
};

export default UserInfo;