import CharacterLink from "./CharacterLink";
import React from 'react';

class RaiderIOLink extends React.Component {
    render() {
        return <CharacterLink title="RaiderIO Profile" icon="rio.svg" href={"https://raider.io/characters/eu/" + this.props.realm + "/" + this.props.name} />;
    }
}

export default RaiderIOLink