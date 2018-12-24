export interface ListData<T> {
    size: number;
    totalElements: number;
    totalPages: number;
    content: T[];
}
