import type { ColumnDef } from '@tanstack/react-table';
import { OrderBadge } from './OrderBadge';
import type { Measurement } from './api';

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
	measurement: Measurement;
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
		accessorFn: (student) => student.measurement?.size,
		header: 'Ukuran',
	},
	{
		accessorFn: (student) =>
			student.gender === 'L' ? 'Laki-laki' : 'Perempuan',
		header: 'Jenis Kelamin',
	},
	{
		accessorKey: 'school',
		header: 'Sekolah',
	},
	{
		accessorKey: 'notes',
		header: 'Catatan',
	},
	{
		accessorKey: 'orderStatus',
		header: 'Status Order',
		cell(props) {
			return <OrderBadge status={props.cell.getValue() as string} />;
		},
	},
];
