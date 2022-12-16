import React from 'react';

class CharacterLink extends React.Component {
    render() {
        return <a title={this.props.title} className='d-inline' href={this.props.href} target="_blank"><img src={"icons/" + this.props.icon} className="icon" alt={this.props.title} /></a>;
    }
}

export default CharacterLink