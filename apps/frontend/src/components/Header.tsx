import { Navbar } from "react-bootstrap"
import Row from "react-bootstrap"

export function Header() {
  return (
    <Navbar>
        <img 
        src="/BannerDark.svg"
        alt="Logo"
        width="35"
        height="35"
        className="align-top d-inline-block"
        />
        <h1>Carpooly</h1>
        <button>My Carpools</button>
        <button>Profile</button>
    </Navbar>
  )
}
