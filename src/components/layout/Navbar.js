import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        const {icon, title} = this.props;
        return (
            <nav className="navbar bg-primary">
                <h1><i className={icon}></i>{title}</h1>
            </nav>
        )
    }
}

export default Navbar
