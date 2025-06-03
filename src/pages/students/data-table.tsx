import * as React from 'react';

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useSearchParams } from 'react-router';
import type { Student } from './columns';

interface DataTableProps {
	columns: ColumnDef<Student>[];
	data: Student[];
	onSelectedRow: (student: Student) => void;
}

export function DataTable({ columns, data, onSelectedRow }: DataTableProps) {
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [rowSelection, setRowSelection] = React.useState({});
	const [searchParams, setSearchParams] = useSearchParams();
	const school = searchParams.get('school');
	const orderStatus = searchParams.get('orderStatus');

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: (state) => {
			setRowSelection(state);
			onSelectedRow(table.getSelectedRowModel().rows[0]?.original);
		},
		enableMultiRowSelection: false,
		state: {
			columnFilters,
			rowSelection,
		},
	});

	return (
		<div>
			<h1 className="text-center text-3xl">{school}</h1>
			<div className="flex flex-col gap-5 items-center py-4 lg:justify-between">
				<Input
					placeholder="Cari berdasarkan nama..."
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<div className="flex gap-2">
					<Badge
						className={`cursor-pointer ${!school ? 'bg-green-500' : ''}`}
						onClick={() => {
							searchParams.set('school', '');
							setSearchParams(searchParams);
						}}
					>
						Semua
					</Badge>
					<Badge
						className={`cursor-pointer ${
							school === 'SMP' ? 'bg-green-500' : ''
						}`}
						onClick={() => {
							searchParams.set('school', 'SMP');
							setSearchParams(searchParams);
						}}
					>
						SMP
					</Badge>
					<Badge
						className={`cursor-pointer ${
							school === 'SMA' ? 'bg-green-500' : ''
						}`}
						onClick={() => {
							searchParams.set('school', 'SMA');
							setSearchParams(searchParams);
						}}
					>
						SMA
					</Badge>
				</div>
				<div className="flex gap-2">
					<Badge
						className={`cursor-pointer ${!orderStatus ? 'bg-green-500' : ''}`}
						onClick={() => {
							searchParams.set('orderStatus', '');
							setSearchParams(searchParams);
						}}
					>
						Semua
					</Badge>
					<Badge
						className={`cursor-pointer ${
							orderStatus === 'IN_PROGRESS' ? 'bg-green-500' : ''
						}`}
						onClick={() => {
							searchParams.set('orderStatus', 'IN_PROGRESS');
							setSearchParams(searchParams);
						}}
					>
						Sedang Dibuat
					</Badge>
					<Badge
						className={`cursor-pointer ${
							orderStatus === 'READY' ? 'bg-green-500' : ''
						}`}
						onClick={() => {
							searchParams.set('orderStatus', 'READY');
							setSearchParams(searchParams);
						}}
					>
						Siap Diambil
					</Badge>
					<Badge
						className={`cursor-pointer ${
							orderStatus === 'DONE' ? 'bg-green-500' : ''
						}`}
						onClick={() => {
							searchParams.set('orderStatus', 'DONE');
							setSearchParams(searchParams);
						}}
					>
						Sudah Diambil
					</Badge>
				</div>
			</div>
			<Label className="text-xl">Total siswa {data.length}</Label>
			<div className="rounded-md border mt-5">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									className="cursor-pointer"
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									onClick={row.getToggleSelectedHandler()}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-center space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Sebelumnya
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Selanjutnya
				</Button>
			</div>
		</div>
	);
}
