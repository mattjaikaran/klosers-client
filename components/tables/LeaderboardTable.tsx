import Table from 'react-bootstrap/Table';
import data from '@/data/stats.json';

const LeaderboardTable = () => {
  return (
    <>
      <Table responsive>
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
            <th>Leaderboard Rank</th>
            <th>Industry</th>
            <th>LinkedIn</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.quota_verified ? 'Verified' : '-'}</td>
              <td>{item.year}</td>
              <td>{item.company}</td>
              <td>{item.title}</td>
              <td>{item.market}</td>
              <td>{item.quota_attainment_percent}</td>
              <td>{item.avg_deal_size}</td>
              <td>{item.avg_sales_cycle}</td>
              <td>{item.leaderboard_rank}</td>
              <td>{item.industry}</td>
              <td>-</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default LeaderboardTable;
