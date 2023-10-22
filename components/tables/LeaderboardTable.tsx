import { useState, useReducer } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import checkmark from '@/assets/icons/checkmark.svg';
import defaultData from '@/data/stats.json';
import { LeaderboardStat } from '@/types/stats';

const columnHelper = createColumnHelper<LeaderboardStat>();
const columns = [
  columnHelper.accessor('quota_verified', {
    header: () => <span>Quota Verified</span>,
    cell: (info) =>
      // eslint-disable-next-line @next/next/no-img-element
      info.getValue() ? <img src={checkmark.src} alt="checkmark" /> : '-',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.year, {
    id: 'year',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Year</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('company', {
    header: () => 'Company',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('market', {
    header: 'Market',
  }),
  columnHelper.accessor('quota_attainment_percent', {
    header: 'Quota Attainment Percent',
  }),
  columnHelper.accessor('avg_deal_size', {
    header: 'Avg Deal Size',
  }),
  columnHelper.accessor('avg_sales_cycle', {
    header: 'Avg Sales Cycle',
  }),
  columnHelper.accessor('leaderboard_rank', {
    header: 'Leaderboard Rank',
  }),
  columnHelper.accessor('industry', {
    header: 'Industry',
  }),
];

const LeaderboardTable = () => {
  const [data, setData] = useState(() => [...defaultData]);
  const rerender = useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <>
      <Row>
        <Col md={6} className="mb-3">
          <Row>
            <Col xs={3} sm={4} md={5} lg={4} xl={4}>
              <h2 className="with-marker">Klosers</h2>
            </Col>
            <Col>
              <h2 className="pt-4">leaderboard.</h2>
            </Col>
          </Row>
        </Col>
        <Col>
          <h4>Filters</h4>
          <Button className="pill-btn">Quota Verified</Button>
          <Button className="pill-btn m-1" variant="outline-primary">
            Quarter
          </Button>
          <Button className="pill-btn m-1" variant="outline-primary">
            Title
          </Button>
          <Button className="pill-btn m-1" variant="outline-primary">
            Industry
          </Button>
          <Button className="pill-btn m-1" variant="outline-primary">
            Market
          </Button>
          <Button className="pill-btn m-1" variant="outline-primary">
            % Quota Attainment
          </Button>
          <Button className="pill-btn m-1" variant="outline-primary">
            Avg Deal Size
          </Button>
          <Button className="pill-btn m-1" variant="outline-primary">
            Avg Sales Cycle
          </Button>
          <Button className="pill-btn m-1" variant="outline-primary">
            Leaderboard Rank
          </Button>
          <Button className="pill-btn m-1" variant="outline-primary">
            Company
          </Button>
        </Col>
      </Row>
      <Table responsive striped>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default LeaderboardTable;
