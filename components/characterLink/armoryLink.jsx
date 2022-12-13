import CharacterLink from "./characterLink";
import React from 'react';

class ArmoryLink extends CharacterLink {
    render() {
        return <CharacterLink title="Armory Profile" icon="wow.svg" href={"https://worldofwarcraft.com/en-gb/character/eu/" + this.props.realm + "/" + this.props.name} />;
    }
}

export default ArmoryLink