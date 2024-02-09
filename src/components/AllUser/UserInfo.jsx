import PropTypes from 'prop-types';

const UserInfo = ({ value }) => {
    // destructuring values
    const { firstName, lastName, email, image, id } = value;
    const company = value?.company?.name;
    const city = value?.address?.city;
    const state = value?.address?.state;
    const postalCode = value?.address?.postalCode;
    const street = value?.address?.address;
    // console.log(id);
    return (
        <div className='flex flex-col rounded-md shadow p-4 gap-2 text-left'>
            <img className='w-1/6 rounded-lg shadow m-auto' src={image} alt="user-image" />
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Email: {email}</p>
            <p>Company Name: {company}</p>
            <p>Address: {street}, {city}, {state}, {postalCode}.</p>
        </div>
    );
};

// defining propTypes
UserInfo.propTypes = {
    value: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        company: PropTypes.shape({
            name: PropTypes.string
        }),
        address: PropTypes.shape({
            city: PropTypes.string,
            state: PropTypes.string,
            postalCode: PropTypes.string,
            address: PropTypes.string
        })
    }).isRequired
};

export default UserInfo;