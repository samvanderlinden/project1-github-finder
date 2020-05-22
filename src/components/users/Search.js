import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Search = ({searchUsers, showClear, clearUsers, setAlert}) => {
    const [text, setText] = useState('');
    const onChange = (e) => setText(e.target.value)

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert('Please enter a search query', 'light')
        } else {
            searchUsers(text);
            setText('');
        }
    }
        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input type="text" value={text} name="text" placeholder="Search Users" onChange={onChange} />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {/*Only show button if there are users present*/}
                {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
            </div>
        )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}

export default Search
