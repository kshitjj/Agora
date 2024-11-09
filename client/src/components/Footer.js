function SocialMedia() {
  return(
    <div class="socialMediaTray">
      <img src={Twitter} alt="TwitterLogo" />
      <img src={Instagram} alt="InstagramLogo" />
      <img src={HackThisFall} alt="HackThisFallLogo" />
      <img src={Discord} alt="DiscordLogo" />
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
