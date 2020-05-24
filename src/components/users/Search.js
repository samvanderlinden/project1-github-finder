import React, {useState, useContext} from 'react';
import GitHubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const githubContext = useContext(GitHubContext);
    const alertContext = useContext(AlertContext);
    const [text, setText] = useState('');
    const onChange = (e) => setText(e.target.value)

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            alertContext.setAlert('Please enter a search query', 'light')
        } else {
            githubContext.searchUsers(text);
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
                {githubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}
            </div>
        )
}

export default Search
