export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-p">© Nishant Acharekar {new Date().getFullYear()}</p>

        <div className="footer-links">
          <a href="https://github.com/NishantA9/Manga-Kun-Reviews" target="_blank">About Us</a>
          <a href="https://nishantacharekarportfolio.netlify.app/" target="_blank">Portfolio</a>
          <a href="https://github.com/NishantA9" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/nishantacharekar/" target="_blank">LinkedIn</a>
          <a href="https://www.youtube.com/channel/UCut0FMt4ec_60Vzw149jdiQ" target="_blank">YouTube</a>
        </div>
      </div>
    </footer>
  );
}
