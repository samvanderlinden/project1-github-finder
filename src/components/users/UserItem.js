import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({user: {avatar_url, html_url, login}}) => {
	return (
		<div className="card text-center">
			<img src={avatar_url} alt="user" className="round-img" style={{ width: '60px' }} />
			<h3>{login}</h3>
			<a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
		</div>
	)
}

UserItem.propTypes = {
	user: PropTypes.object.isRequired
}

export default UserItem
