import { useRouter } from 'next/router';
import Link from 'next/link';
import { Reference } from '@/types/user';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const References = ({ data }: { data: Reference[] }) => {
  const router = useRouter();
  return (
    <div className="mt-3">
      <h5>References</h5>
      <Row>
        {data?.length > 0 ? (
          data.map((reference: Reference) => (
            <Col key={reference.id} md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>
                    {reference.first_name} {reference.last_name}
                  </Card.Title>
                  <Card.Text>
                    <span>
                      <strong>Email: </strong>
                      <span>{reference.email}</span>
                    </span>
                    <br />
                    <span>
                      <strong>Phone: </strong>
                      <span>{reference.phone}</span>
                    </span>
                  </Card.Text>
                  {router.pathname === '/profile' ? (
                    <small>
                      {' '}
                      <Link
                        className="text-muted"
                        href={`/references/edit/${reference.id}`}
                      >
                        Edit
                      </Link>
                    </small>
                  ) : null}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No references added yet.</p>
          </Col>
        )}
      </Row>

      {router.pathname === '/profile' ? (
        <Button
          className="mt-3 pill-btn"
          variant="outline-primary"
          onClick={() => router.push(`/references/new`)}
        >
          Add Reference
        </Button>
      ) : null}
    </div>
  );
};

export default References;
