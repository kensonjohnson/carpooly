import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles.scss";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import "./root.css"
import { Container } from "react-bootstrap";

// create a static page 
export function Root() {
  return(
    <Container className="vh-100">
      <Header/>
      <div>Hello, world</div>
      <Footer />
    </Container>)
}
