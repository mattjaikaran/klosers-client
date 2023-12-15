import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { AwardRecognitionInputs } from '@/types/stats';
import { useAppSelector } from '@/lib/store/redux';
import Link from 'next/link';

const AwardsRecognition = ({ data }: { data: AwardRecognitionInputs[] }) => {
  const router = useRouter();
  const auth: any = useAppSelector((state) => state.auth);
  const { user }: any = useAppSelector((state) => state.user);

  return (
    <div className="mt-3">
      <h5>Awards &amp; Recognition</h5>
      {data?.length ? (
        data.map((award: AwardRecognitionInputs) => (
          <p key={award.id}>
            {router.pathname === '/profile' ? (
              <>
                <Link className="text-muted" href={`/awards/edit/${award.id}`}>
                  Edit
                </Link>{' '}
              </>
            ) : null}
            <span>{award.text}</span>
          </p>
        ))
      ) : (
        <p>No Awards</p>
      )}

      {router.pathname === '/profile' ? (
        <Button
          className="pill-btn"
          variant="outline-primary"
          onClick={() => router.push(`/awards/new`)}
        >
          Add Award
        </Button>
      ) : null}
    </div>
  );
};

export default AwardsRecognition;
