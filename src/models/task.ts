export enum TaskStatus {
	New = 0,
	Created = 1,
	Progress = 2,
	Review = 3,
	Completed = 4,
	Canceled = 5,
}

export interface Task {
	status: TaskStatus;
	title: string;
	description: string;
	reward: bigint;
	endDate: bigint;
	authorizedRoles: readonly bigint[];
	creatorRole: bigint;
	assignee: `0x${string}`;
	metadata: string;
}
