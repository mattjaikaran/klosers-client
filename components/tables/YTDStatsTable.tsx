/* eslint-disable @next/next/no-img-element */
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import checkmark from '@/assets/icons/checkmark.svg';
import { YTDStatInputs } from '@/types/stats';
import {
  createColumnHelper,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useState, useReducer } from 'react';

const YTDStatsTable = ({ data }: { data: YTDStatInputs[] }) => {
  const router = useRouter();

  const columnHelper = createColumnHelper<YTDStatInputs>();
  const columns = [
    columnHelper.accessor('quota_verified', {
      header: () => <span>Quota Verified</span>,
      cell: (info) =>
        // eslint-disable-next-line @next/next/no-img-element
        info.getValue() ? <img src={checkmark.src} alt="checkmark" /> : '-',
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.quarter, {
      id: 'quarter',
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Quarter</span>,
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
          onClick={() => router.push(`/ytd-stats/edit/${info.getValue()}`)}
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
