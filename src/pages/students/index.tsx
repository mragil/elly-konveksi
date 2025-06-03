import * as React from 'react';

import { useQuery } from '@tanstack/react-query';

import { useSearchParams } from 'react-router';
import EditStudentSheet from './EditStudentSheet';
import { getStudents } from './api';
import { type Student, columns } from './columns';
import { DataTable } from './data-table';

function Students() {
	const [searchParams] = useSearchParams();
	const [showEdit, setShowEdit] = React.useState(false);
	const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(
		null,
	);
	const school = searchParams.get('school') || '';
	const orderStatus = searchParams.get('orderStatus');

	const { isPending, data, error } = useQuery({
		queryKey: ['studentList', school, orderStatus],
		queryFn: getStudents(school, orderStatus),
	});

	if (isPending)
		return (
			<div className="container mx-auto py-10">
				<h1>Memuat...</h1>
			</div>
		);

	if (error)
		return (
			<div className="container mx-auto py-10">
				<h1>Oops ada error... {error.message}</h1>
			</div>
		);

	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={columns}
				data={data}
				onSelectedRow={(student) => {
					setShowEdit(true);
					setSelectedStudent(student);
				}}
			/>
			{selectedStudent && (
				<EditStudentSheet
					show={showEdit}
					setShow={setShowEdit}
					data={selectedStudent}
				/>
			)}
		</div>
	);
}

export default Students;
