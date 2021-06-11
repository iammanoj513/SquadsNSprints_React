export interface IStoryIdList {
    name: string;
    storyId: number | string
}

export interface Isprint {
    squadId: number;
    sprintId: number;
    sprintName: string;
    storyIdList: Array<IStoryIdList>
}

export interface IMemberList {
    name: string
}

export interface ISquad {
    squadId: number | string;
    squadName: string;
    memberList: Array<IMemberList>;
    sprint?: Array<Isprint>
}