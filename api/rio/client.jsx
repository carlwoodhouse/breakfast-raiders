import fetch from 'sync-fetch'

export default class rioClient {
  constructor() { }

  getCharacter(name, realm) {
    return this.send("https://raider.io/api/v1/characters/profile?region=eu&realm=" + realm + "&name=" + encodeURIComponent(name) + "&fields=mythic_plus_scores_by_season:current,gear,mythic_plus_weekly_highest_level_runs");
  }

  getGuild(name, realm) {
    return this.send("https://raider.io/api/v1/guilds/profile?region=eu&realm=" + realm + "&name=" + encodeURIComponent(name) + "&fields=members");
  }

  send(uri) {
    return fetch(uri).json();
  }
}