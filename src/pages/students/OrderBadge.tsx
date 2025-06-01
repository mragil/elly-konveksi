import { Badge } from '@/components/ui/badge';

type Props = {
	status: string;
};

export const OrderBadge = ({ status }: Props) => {
	if (status === 'IN_PROGRESS')
		return (
			<Badge variant="secondary" className="text-center">
				Sedang Dibuat
			</Badge>
		);
	if (status === 'READY')
		return (
			<Badge
				// variant="secondary"
				className="bg-blue-500 text-white dark:bg-blue-600 text-center"
			>
				Siap Diambil
			</Badge>
		);
	return (
		<Badge
			variant="secondary"
			className="bg-green-500 text-white dark:bg-green-600 text-center"
		>
			Sudah Diambil
		</Badge>
	);
};
