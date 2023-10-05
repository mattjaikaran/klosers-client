/* eslint-disable @next/next/no-img-element */
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import checkmark from '@/assets/icons/checkmark.svg';
import { useRouter } from 'next/router';
import { CareerStatInputs } from '@/types/stats';

const CareerStatsTable = ({ data }: { data: CareerStatInputs[] }) => {
  const router = useRouter();
  return (
    <>
      <Table responsive striped>
        <thead>
          <tr>
            <th>Quota Verified</th>
            <th>Year</th>
            <th>Company</th>
            <th>Title</th>
            <th>Market</th>
            <th>% Quota Attainment</th>
            <th>Avg Deal Size</th>
            <th>Avg Sales Cycle</th>
            <th>Industry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: CareerStatInputs) => (
            <tr key={item.id}>
              <td>
                {item.quota_verified ? (
                  <img src={checkmark.src} alt="checkmark" />
                ) : (
                  '-'
                )}
              </td>
              <td>{item.year}</td>
              <td>{item.company}</td>
              <td>{item.title}</td>
              <td>{item.market}</td>
              <td>{item.quota_attainment_percentage}</td>
              <td>{item.average_deal_size}</td>
              <td>{item.average_sales_cycle}</td>
              <td>{item.industry}</td>
              <td>
                <Button
                  variant="link"
                  className="text-muted"
                  onClick={() => router.push(`/career-stats/edit/${item.id}`)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        className="my-3 pill-btn"
        variant="outline-primary"
        onClick={() => router.push(`/career-stats/new`)}
      >
        Add Year
      </Button>
    </>
  );
};
export default CareerStatsTable;
