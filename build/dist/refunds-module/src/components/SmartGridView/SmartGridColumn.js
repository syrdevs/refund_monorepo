var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SmartGridColumn = /** @class */ (function (_super) {
    __extends(SmartGridColumn, _super);
    function SmartGridColumn(props) {
        return _super.call(this, props) || this;
    }
    SmartGridColumn.prototype.render = function () {
        console.log(this.props.value);
        return this.props.value;
    };
    return SmartGridColumn;
}(PureComponent));
export default SmartGridColumn;
//# sourceMappingURL=SmartGridColumn.js.map