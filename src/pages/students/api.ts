import PocketBase from 'pocketbase';
import type { Student } from './columns';

export type UpdatePayload = {
	orderStatus: string;
	notes: string;
	measurement: Partial<Measurement>;
};

export type Measurement = {
	id: string;
	student: string;
	size: string;
};

type UpdateNewMeasurement = {
	measurement?: string;
} & Omit<UpdatePayload, 'measurement'>;

type StudentRecord = Student & {
	expand: {
		measurement: Measurement;
	};
};

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export const getStudents =
	(school: string, orderStatus: string | null) => async () => {
		const schoolFilter = school ? `school='${school}'` : '';
		const orderStatusFilter = orderStatus ? `orderStatus='${orderStatus}'` : '';
		const filterArr = [schoolFilter, orderStatusFilter];

		const filter = filterArr.reduce((prev, curr) => {
			if (prev === '') return `${curr}`;
			return `${prev} && ${curr}`;
		}, '');
	
		console.log(filter ? { filter } : {});
		const records = await pb.collection('students').getFullList<StudentRecord>({
			...(filter ? { filter } : {}),
			sort: 'no',
			expand: 'measurement',
		});

		return records.map((student) => ({
			...student,
			measurement: student.expand?.measurement,
		}));
	};

export const updateStudent = async (
	id: string,
	updatePayload: UpdatePayload,
) => {
	const { measurement, ...restPayload } = updatePayload;
	let payload: UpdateNewMeasurement = { ...restPayload };

	if (measurement.size) {
		if (measurement.id) {
			await pb
				.collection('measurements')
				.update<Measurement>(measurement.id, { size: measurement.size });
		} else {
			const measurementData = {
				student: id,
				size: measurement.size,
			};
			const measurementRecord = await pb
				.collection('measurements')
				.create(measurementData);

			payload = { measurement: measurementRecord.id, ...restPayload };
		}
	}

	const result = await pb.collection('students').update<Student>(id, payload);

	return result;
};
