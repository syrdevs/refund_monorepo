export interface NoticeApplicant {
    id: number;
    name: string;
    docs: NoticeApplicantDoc[];
}
export interface NoticeApplicantDoc {
    docName: string;
    decision: number;
    rejectReason?: string;
}
