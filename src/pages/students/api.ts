import PocketBase from 'pocketbase';
import type { Student } from './columns';

export type UpdatePayload = {
	orderStatus: string;
	notes: string;
};

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export const getStudents =
	(school = 'SMP') =>
	async () => {
		const records = await pb.collection('students').getFullList<Student>({
			filter: `school = '${school}'`,
			sort: 'no',
		});

		return records;
	};

export const updateOrderStatus = async (
	id: string,
	updatePayload: UpdatePayload,
) => {
	const result = await pb
		.collection('students')
		.update<Student>(id, updatePayload);

	return result;
};
