import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { AwardRecognitionInputs } from '@/types/stats';

const AwardsRecognition = ({ data }: { data: AwardRecognitionInputs[] }) => {
  const router = useRouter();
  return (
    <div className="mt-3">
      <h5>Awards &amp; Recognition</h5>
      {data.length ? (
        data.map((award: AwardRecognitionInputs) => (
          <p key={award.id}>
            <Button
              variant="link"
              className="text-muted"
              onClick={() => router.push(`/awards/edit/${award.id}`)}
            >
              Edit
            </Button>
            <span>{award.text}</span>
          </p>
        ))
      ) : (
        <Spinner />
      )}

      <Button
        className="mt-3 pill-btn"
        variant="outline-primary"
        onClick={() => router.push(`/awards/new`)}
      >
        Add Award
      </Button>
    </div>
  );
};

export default AwardsRecognition;
