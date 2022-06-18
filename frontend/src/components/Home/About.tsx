import { Location } from "types/Location";
import Jumbotron from "./Jumbotron";
import SquareLocation from "./SquareLocation";

interface HomeProps {
  location: Location;
}

const About = ({ location }: HomeProps) => (
  <>
    <Jumbotron location={location} />
    <SquareLocation location={location} />
  </>
);
export default About;
