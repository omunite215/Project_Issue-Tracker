"use client";

import { STATUS, issueSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/components/ErrorMessage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Issue } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import type { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema),
	});
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	return (
		<section className="max-w-xl">
			{error && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<form
				className="max-w-xl space-y-3"
				onSubmit={handleSubmit(async (data) => {
					try {
						setIsSubmitting(true);
						if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
						else await axios.post("/api/issues", data);
						router.push("/issues/list");
						router.refresh();
					} catch (error) {
						setIsSubmitting(false);
						setError("An unexpected Error Occured");
					}
				})}
			>
				<Input
					type="text"
					placeholder="Title"
					defaultValue={issue?.title}
					{...register("title")}
				/>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name="description"
					control={control}
					defaultValue={issue?.description}
					render={({ field }) => (
						<SimpleMDE placeholder="description" {...field} />
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				{issue && (
					<>
						<Controller
							name="status"
							control={control}
							defaultValue={issue.status}
							render={({ field }) => (
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue placeholder={issue.status} />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={STATUS[0]}>Open</SelectItem>
										<SelectItem value={STATUS[1]}>In Progress</SelectItem>
										<SelectItem value={STATUS[2]}>Closed</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						<ErrorMessage>{errors.status?.message}</ErrorMessage>
					</>
				)}
				<Button
					type="submit"
					disabled={isSubmitting}
					className="transition-all"
				>
					<Loader2
						className={`${
							isSubmitting ? "h-4 w-4 mr-2 animate-spin" : "hidden"
						}`}
					/>
					{isSubmitting
						? "Please Wait"
						: issue
							? "Update Issue"
							: "Submit New Issue"}
				</Button>
			</form>
		</section>
	);
};

export default IssueForm;
