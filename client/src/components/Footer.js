import twitter from "../assets/twitter.svg"
import hackThisFall from "../assets/hackthisfall.svg"
import discord from "../assets/discord.svg"

function SocialMedia() {
  return(
    <div class="socialMediaTray">
      <img src={twitter} style={{"height": "60px", "padding": "20px"}} alt="TwitterLogo" />
      <img src={hackThisFall} style={{"backgroundColor": "#000", "padding": "10px"}} alt="HackThisFallLogo" />
      <img src={discord} style={{"height": "60px", "padding": "20px"}} alt="DiscordLogo" />
    </div>
  )
}

function Footer() {
  return (
  <footer>
      <SocialMedia />
      { /*
      <ListOfLinksThatLeadSomewhereLegal />
      <CopyRightShitForAuthenticity />
      */ }
  </footer>
  );
}

export default Footer;
