import TermsOfServiceData from '@/components/legal/TermsOfService';
import Container from 'react-bootstrap/Container';

export default function TermsOfService() {
  return (
    <div>
      <Container>
        <h1>Terms Of Service</h1>
        <TermsOfServiceData />
      </Container>
    </div>
  );
}
