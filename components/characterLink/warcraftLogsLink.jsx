import CharacterLink from "./characterLink";

class WarcraftLogsLink extends CharacterLink {
    render() {
        return <CharacterLink title="Warcraft Logs" icon="wcl.png" href={"https://www.warcraftlogs.com/character/eu/" + this.props.realm + "/" + this.props.name} />;
    }
}

export default WarcraftLogsLink