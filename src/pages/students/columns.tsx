import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { OrderBadge } from './OrderBadge';

export type Student = {
	id: string;
	no: number;
	name: string;
	gender: string;
	school: 'SMP' | 'SMA';
	grade: number;
	address: string;
	district: string;
	subDistrict: string;
	fatherName: string;
	fatherPhoneNumber: string;
	motherName: string;
	motherPhoneNumber: string;
	previousSchool: string;
	orderStatus: string;
	notes: string;
};

export const columns: ColumnDef<Student>[] = [
	{
		accessorKey: 'no',
		header: 'No',
	},
	{
		accessorKey: 'name',
		header: 'Nama',
	},
	{
		accessorKey: 'gender',
		header: 'Jenis Kelamin',
	},
	{
		accessorKey: 'school',
		header: 'Sekolah',
	},
	{
		accessorKey: 'grade',
		header: 'Kelas',
	},
	{
		accessorKey: 'orderStatus',
		header: 'Status Order',
		cell(props) {
			return <OrderBadge status={props.cell.getValue() as string}/>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const student = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(student.id)}
						>
							Ubah Status Order
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Lihat Data Ukuran</DropdownMenuItem>
						<DropdownMenuItem>Lihat Nota</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
