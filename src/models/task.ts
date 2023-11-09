export enum TaskStatus {
    Created = 0,
    Progress = 1,
    Review = 2,
    Completed = 3,
    Canceled = 4
}

// Interface Equals Solidity
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

// Interface Equals Front
export interface TaskFront {
    taskId: number;
    status: string;
    title: string;
    description: string;
    reward: string;
    endDate: string;
    authorizedRoles: string;
    creatorRole: string;
    assignee: string;
    metadata: string
}
