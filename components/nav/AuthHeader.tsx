import { useLogout } from '@/lib/auth';
import { userLogout } from '@/lib/store/authSlice';
import { useAppDispatch } from '@/lib/store/redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AuthHeader = ({
  user,
  isLoggedIn,
}: {
  user: any;
  isLoggedIn: boolean;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await useLogout(user);
      console.log('response', response);

      if (response.status === 200) {
        router.push('/signin');
        dispatch(userLogout(user));
      }
      return response;
    } catch (error: any) {
      console.log('error in handleLogout', error);
      console.log('error.message', error.message);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          as={Link}
          href="/dashboard"
          className="with-marker mb-3 mb-lg-2"
        >
          Klosers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user.leaderboard_access ? (
              <Nav.Link as={Link} href="/leaderboard" className="mt-lg-3">
                Leaderboard
              </Nav.Link>
            ) : null}
            <Nav.Link as={Link} href="/profile" className="mt-lg-3">
              Profile
            </Nav.Link>
            {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
            <Nav.Link onClick={() => handleLogout()} className="mt-lg-3">
              Logout
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} href="/" className="mt-lg-3">
              Kloser Network
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AuthHeader;
