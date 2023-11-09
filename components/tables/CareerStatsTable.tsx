/* eslint-disable @next/next/no-img-element */
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import checkmark from '@/assets/icons/checkmark.svg';
import { useRouter } from 'next/router';
import { CareerStatInputs } from '@/types/stats';
import {
  ColumnFiltersState,
  FilterFn,
  SortingFn,
  SortingState,
  Updater,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from '@tanstack/react-table';
import { useState, useReducer } from 'react';
import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils';
import { useAppSelector } from '@/lib/store/redux';
declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const CareerStatsTable = ({ data }: { data: CareerStatInputs[] }) => {
  const router = useRouter();
  const auth: any = useAppSelector((state) => state.auth);
  const { user }: any = useAppSelector((state) => state.user);

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

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
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
      {auth.user.data.username === user.data.username ? (
        <Button
          className="my-3 pill-btn"
          variant="outline-primary"
          onClick={() => router.push(`/career-stats/new`)}
        >
          Add Career Stat
        </Button>
      ) : null}
    </>
  );
};
export default CareerStatsTable;
