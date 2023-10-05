/* eslint-disable @next/next/no-img-element */
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import checkmark from '@/assets/icons/checkmark.svg';
import { useRouter } from 'next/router';
import { YTDStatInputs } from '@/types/stats';

const YTDStatsTable = ({ data }: { data: YTDStatInputs[] }) => {
  const router = useRouter();

  if (!data?.length) return <Spinner />;

  return (
    <>
      <Table responsive striped>
        <thead>
          <tr>
            <th>Quota Verified</th>
            <th>Quarter</th>
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
          {data?.length ? (
            data.map((item: YTDStatInputs) => (
              <tr key={item.id}>
                <td>
                  {item.quota_verified ? (
                    <img src={checkmark.src} alt="checkmark" />
                  ) : (
                    '-'
                  )}
                </td>
                <td>{item.quarter}</td>
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
                    onClick={() => router.push(`/ytd-stats/edit/${item.id}`)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12}>No Year To Date Stats</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button
        className="my-3 pill-btn"
        variant="outline-primary"
        onClick={() => router.push('/ytd-stats/new')}
      >
        Add YTD Stat
      </Button>
    </>
  );
};
export default YTDStatsTable;
