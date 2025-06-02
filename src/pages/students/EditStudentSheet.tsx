import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';

import { toast } from 'sonner';
import { OrderBadge } from './OrderBadge';
import { type UpdatePayload, updateStudent } from './api';
import type { Student } from './columns';

type Props = {
	show: boolean;
	setShow: (show: boolean) => void;
	data: Student;
};

type MutationVariable = {
	updatePayload: UpdatePayload;
	id: string;
};

function EditStudentSheet(props: Props) {
	const [orderStatus, setOrderStatus] = React.useState(props.data.orderStatus);
	const [notes, setNotes] = React.useState(props.data.notes);
	const [size, setSize] = React.useState<string | undefined>(
		props.data.measurement?.size,
	);

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: ({ id, updatePayload }: MutationVariable) =>
			updateStudent(id, updatePayload),
		onSuccess: (data) => {
			console.log({ data });
			toast.success('Berhasil mengubah data!');
			queryClient.invalidateQueries({ queryKey: ['studentList'] });
			props.setShow(false);
		},
	});

	return (
		<Sheet open={props.show} onOpenChange={props.setShow}>
			<SheetContent side={'bottom'}>
				<SheetHeader>
					<SheetTitle className="text-3xl">Ubah Data</SheetTitle>
					<hr />
					<SheetDescription asChild>
						<div className="flex flex-col gap-5">
							<p className="text-xl font-bold dark:text-white text-black">
								{props.data.school}
							</p>
							<p className="text-xl font-bold dark:text-white text-black">
								Nama: {props.data.name}
							</p>
							<p className="text-xl font-bold dark:text-white text-black">
								Kelas: {props.data.grade}
							</p>
							<div>
								<Label className="text-xl font-bold dark:text-white text-black">
									Ukuran
								</Label>
								<Select defaultValue={size} onValueChange={setSize}>
									<SelectTrigger className="">
										<SelectValue placeholder="Pilih Ukuran" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="S">S</SelectItem>
										<SelectItem value="M">M</SelectItem>
										<SelectItem value="L">L</SelectItem>
										<SelectItem value="XL">XL</SelectItem>
										<SelectItem value="XXL">XXL</SelectItem>
										<SelectItem value="XXXL">XXXL</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label className="text-xl font-bold dark:text-white text-black">
									Order
								</Label>
								<Select
									defaultValue={orderStatus}
									onValueChange={setOrderStatus}
								>
									<SelectTrigger className="">
										<SelectValue placeholder="Pilih Status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="IN_PROGRESS">
											<OrderBadge status={'IN_PROGRESS'} />
										</SelectItem>
										<SelectItem value="READY">
											<OrderBadge status={'READY'} />
										</SelectItem>
										<SelectItem value="DONE">
											<OrderBadge status={'DONE'} />
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="grid w-full gap-3">
								<Label
									className="text-xl font-bold dark:text-white text-black"
									htmlFor="note"
								>
									Catatan
								</Label>
								<Textarea
									placeholder="Silahkan isi catatan..."
									id="note"
									defaultValue={props.data.notes}
									onChange={(e) => setNotes(e.target.value)}
								/>
							</div>
							<Button
								disabled={
									orderStatus === props.data.orderStatus &&
									notes === props.data.notes &&
									size === props.data.measurement?.size
								}
								onClick={() =>
									mutation.mutate({
										id: props.data.id,
										updatePayload: {
											orderStatus,
											notes,
											measurement: {
												student: props.data.id,
												size,
												id: props.data.measurement?.id,
											},
										},
									})
								}
							>
								Simpan
							</Button>
						</div>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}

export default EditStudentSheet;
