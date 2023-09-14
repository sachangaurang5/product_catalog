import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { BsCart3, BsFillGrid3X3GapFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCompareArrows } from "react-icons/md";

function NavigationBar({
  currentView,
  handleToggleView,
  handleCanvasShow,
  cartItems,
  handleCompareCanvasShow,
  compareItems,
}) {
  return (
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#home">FlipZon</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button variant="" onClick={handleCompareCanvasShow}>
              <MdCompareArrows size={25} />
              {"  "} {compareItems}
            </Button>
            <Button variant="" onClick={handleToggleView}>
              {currentView !== "tabular" && <GiHamburgerMenu size={25} />}
              {currentView === "tabular" && <BsFillGrid3X3GapFill size={25} />}
            </Button>
            <Button variant="" onClick={handleCanvasShow}>
              <BsCart3 size={25} />
              {"  "} {cartItems}
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
