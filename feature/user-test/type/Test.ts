export interface Test {
    testId: string;
    userId: string;
    code: Code;
    name: string;
    sectionList: Section[];
    currentSection: Section;
    status: Status;
    purchaseDate: string;
}

export type Section = "STRENGTH" | "INTEREST" | "CHARACTER" | "VALUE" | "KNOWLEDGE";

export type Status = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type Code = "ELM" | "MID" | "HIGH";