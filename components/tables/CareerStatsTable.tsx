/* eslint-disable @next/next/no-img-element */
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import checkmark from '@/assets/icons/checkmark.svg';
import { useRouter } from 'next/router';
import { CareerStatInputs } from '@/types/stats';
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState, useReducer } from 'react';

const CareerStatsTable = ({ data }: { data: CareerStatInputs[] }) => {
  const router = useRouter();

  const columnHelper = createColumnHelper<CareerStatInputs>();
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
    columnHelper.accessor('quota_attainment_percentage', {
      header: 'Quota Attainment Percent',
    }),
    columnHelper.accessor('average_deal_size', {
      header: 'Avg Deal Size',
    }),
    columnHelper.accessor('average_sales_cycle', {
      header: 'Avg Sales Cycle',
    }),
    columnHelper.accessor('industry', {
      header: 'Industry',
    }),
    columnHelper.accessor('id', {
      header: () => <span>Actions</span>,
      cell: (info) => (
        <Button
          variant="link"
          className="text-muted"
          onClick={() => router.push(`/career-stats/edit/${info.getValue()}`)}
        >
          Edit
        </Button>
      ),
    }),
  ];

  const [statData, setStatData] = useState(() => [...data]);
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => {
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
            })
          ) : (
            <tr>
              <td colSpan={12}>No Career Stats</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button
        className="my-3 pill-btn"
        variant="outline-primary"
        onClick={() => router.push(`/career-stats/new`)}
      >
        Add Career Stat
      </Button>
    </>
  );
};
export default CareerStatsTable;
