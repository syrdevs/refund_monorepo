var LocalStorageMock = /** @class */ (function () {
    function LocalStorageMock() {
        this.length = 0;
        this.store = {};
    }
    LocalStorageMock.prototype.clear = function () {
        this.store = {};
        this.length = 0;
    };
    LocalStorageMock.prototype.getStore = function () {
        return this.store;
    };
    LocalStorageMock.prototype.getItem = function (key) {
        return this.store[key] || null;
    };
    LocalStorageMock.prototype.key = function (index) {
        var counter = 0;
        for (var key in this.store) {
            if (this.store.hasOwnProperty(key)) {
                if (counter === index) {
                    return key;
                }
                counter += 1;
            }
        }
        return null;
    };
    LocalStorageMock.prototype.setItem = function (key, value) {
        if (!this.store.hasOwnProperty(key)) {
            this.length += 1;
        }
        this.store[key] = value;
    };
    LocalStorageMock.prototype.removeItem = function (key) {
        if (this.store.hasOwnProperty(key)) {
            this.length -= 1;
        }
        delete this.store[key];
    };
    return LocalStorageMock;
}());
export default LocalStorageMock;
//# sourceMappingURL=LocalStorageMock.js.map