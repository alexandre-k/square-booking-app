interface FooterProps {
  routes: Array<string>;
}
const Footer = ({ routes }: FooterProps) => {
  return (
      <div id="footer-content">
        Footer... work in progress
        {routes.map((route) => (
          <p key={route}>{route}</p>
        ))}
      </div>
  );
};

export default Footer;
