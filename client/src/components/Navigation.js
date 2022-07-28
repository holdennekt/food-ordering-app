import { Badge, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Navigation({ cart }) {
  const location = useLocation();

  const cartLength = cart.reduce((acc, val) => acc + val.count, 0);

  return (
    <Navbar>
      <Nav className="ms-2 align-items-center">
        <Nav.Item>
          <Nav.Link
            className={location.pathname === "/" ? "active" : ""}
            as={Link}
            to="/main"
          >
            Foods
          </Nav.Link>
        </Nav.Item>
        <div
          style={{
            borderLeft: "1px solid var(--bs-nav-link-color)",
            height: "25px",
          }}
        ></div>
        <Nav.Item>
          <Nav.Link
            className={
              "d-flex align-items-center" +
              (location.pathname === "/cart" ? " active" : "")
            }
            as={Link}
            to="/cart"
          >
            Cart
            {!!cartLength && (
              <Badge className="ms-1" pill>
                {cartLength}
              </Badge>
            )}
          </Nav.Link>
        </Nav.Item>
        <div
          style={{
            borderLeft: "1px solid var(--bs-nav-link-color)",
            height: "25px",
          }}
        ></div>
        <Nav.Item>
          <Nav.Link
            className={
              "d-flex align-items-center" +
              (location.pathname.includes("/admin") ? " active" : "")
            }
            as={Link}
            to="/admin"
          >
            Admin
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default Navigation;
