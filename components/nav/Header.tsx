import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} href="/" className="with-marker mb-3 mb-lg-2">
          Klosers
        </Navbar.Brand>
        {/* <Navbar.Toggle className="mb-0" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/" className="mt-lg-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/" className="mt-lg-3">
              About
            </Nav.Link>
            <Nav.Link as={Link} href="/" className="mt-lg-3">
              Pricing
            </Nav.Link>
            <Nav.Link as={Link} href="/" className="mt-lg-3">
              Services
            </Nav.Link>
            <Nav.Link as={Link} href="/" className="mt-lg-3">
              Tool Kit
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} href="/" className="mt-lg-3">
              Kloser Network
            </Nav.Link>
            <Nav.Link
              eventKey={2}
              as={Link}
              href="/leaderboard"
              className="mt-lg-3"
            >
              Kloser Leaderboard
            </Nav.Link>
            <Nav.Link as={Link} href="/">
              Twitter
            </Nav.Link>
            <Nav.Link as={Link} href="/">
              LinkedIn
            </Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default Header;
