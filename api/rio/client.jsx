import { RateLimiter } from "limiter";
import * as cheerio from 'cheerio';

const limiter = new RateLimiter({ tokensPerInterval: 120, interval: "minute" });
const pubLimiter = new RateLimiter({ tokensPerInterval: 80, interval: "minute" });

export default class rioClient {
  constructor() { }

  async getCharacter(name, realm) {
    return await this.getJson("https://raider.io/api/v1/characters/profile?region=eu&realm=" + realm + "&name=" + encodeURIComponent(name) + "&fields=mythic_plus_scores_by_season:current,gear,mythic_plus_weekly_highest_level_runs");
  }

  async getGuild(name, realm) {
    return await this.getJson("https://raider.io/api/v1/guilds/profile?region=eu&realm=" + realm + "&name=" + encodeURIComponent(name) + "&fields=members");
  }

  async getCharacterMain(name, realm, region = "eu") {
    var markup = await this.getText("https://raider.io/characters/" + region + "/" + realm + "/" + encodeURIComponent(name));

    if (markup == null) {
      return null;
    }

    const $ = cheerio.load(markup);
    let main = null;

    $(".about-container header span").each((index, element) => {
      let span = cheerio.load(element);
      let text = span.text();

      if (text.indexOf("Alt of" != -1)) {
        main = text.replace("(Alt of ", "").replace(")", "");
      }
    });

     return main;
  }

  async getJson(uri, attempt = 0) {
    await limiter.removeTokens(1);

    let response;

    try {
      response = await fetch(uri);
    }
    catch (error) {
      console.log(error);
      console.log("uri: " + uri + ", attempt: " + attempt);

      if (response?.status == 400) {
        return null;
      }

      if (attempt < 3)
      {
        return await this.getJson(uri, attempt + 1);
      }
    }

    return await response?.json(); 
  }

  async getText(uri, attempt = 0) {
    await pubLimiter.removeTokens(1);

    let response;

    try {
      response = await fetch(uri, { headers: {'Content-Type': 'text/html;charset=UTF-8', 'Accept-Language': 'en-GB'}, method: "GET" }); 
    }
    catch (error) {
      console.log(error);
      console.log("uri: " + uri + ", attempt: " + attempt);

      if (response?.status == 400) {
        return null;
      }

      if (attempt < 3)
      { 
        return await this.getText(uri, attempt + 1);
      }
    }

    return await response?.text(); 
  }
}