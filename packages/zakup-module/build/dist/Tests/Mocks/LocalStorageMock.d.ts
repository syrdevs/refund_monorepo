declare class LocalStorageMock {
    length: number;
    private store;
    clear(): void;
    getStore(): {};
    getItem(key: string): any;
    key(index: number): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
export default LocalStorageMock;
