import React, {useContext} from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import GitHubContext from '../../context/github/githubContext';

const Users = () => {
    const githubContext = useContext(GitHubContext); //simply bring this in any component to use its state. Do not need to do any 'prop drilling' to pass state to other components
    const { loading, users } = githubContext;
    console.log({githubContext});
    if (loading) {
        return <Spinner />
    } else {
        return (
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

Users.Proptypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

export default Users
