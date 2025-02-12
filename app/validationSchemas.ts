import { z } from "zod";

export const STATUS = ["OPEN", "IN_PROGRESS", "CLOSED"] as const;

export const issueSchema = z.object({
	title: z.string().min(1, "Title is Required").max(255),
	description: z.string().min(1, "Description is required").max(65535),
	status: z.enum(STATUS).default("OPEN").optional(),
});

export const patchIssueSchema = z.object({
	title: z.string().min(1, "Title is Required").max(255).optional(),
	description: z
		.string()
		.min(1, "Description is required")
		.max(65535)
		.optional(),
	assignedTouserId: z
		.string()
		.min(1, "AssignedToUserId is required.")
		.max(255)
		.optional()
		.nullable(),
	status: z.enum(STATUS),
});
