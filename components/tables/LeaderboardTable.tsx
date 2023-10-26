/* eslint-disable @next/next/no-img-element */
import { useState, useReducer, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
  ColumnFiltersState,
  FilterFn,
  SortingFn,
  SortingState,
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
import checkmark from '@/assets/icons/checkmark.svg';
import filter from '@/assets/icons/filter.svg';
import defaultData from '@/data/stats.json';
import { LeaderboardStat } from '@/types/stats';

import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils';

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

  // A debounced input react component
  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }

  return (
    <>
      <Row>
        <Col lg={7} md={6} className="mb-3">
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
          <div>
            <h4 className="mb-3 d-inline me-1">Filters</h4>
            <img src={filter.src} width={24} alt="filter icon" />
          </div>
          <Button
            className="pill-btn"
            // onClick={(e: any) => setGlobalFilter('route')}
          >
            Quota Verified
          </Button>
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
          <div>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={(value) => setGlobalFilter(String(value))}
              className="mt-3 p-2 font-lg border border-block"
              placeholder="Search all columns..."
            />
          </div>
        </Col>
      </Row>
      <Table className="mt-3" responsive striped>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="text-blue fw-medium"
                    colSpan={header.colSpan}
                  >
                    <img
                      onClick={header.column.getToggleSortingHandler()}
                      src={filter.src}
                      width={24}
                      alt="filter icon"
                    />
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
                          // asc: ' 🔼',
                          // desc: ' 🔽',
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
