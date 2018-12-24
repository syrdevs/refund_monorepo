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
// import * as i18n from 'i18next'
import * as i18n from 'i18next';
import * as React from 'react';
var MultilanguageComponent = /** @class */ (function (_super) {
    __extends(MultilanguageComponent, _super);
    function MultilanguageComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.onLanguageChange = _this.onLanguageChange.bind(_this);
        return _this;
    }
    MultilanguageComponent.prototype.componentDidMount = function () {
        i18n.on('languageChanged', this.onLanguageChange);
    };
    MultilanguageComponent.prototype.componentWillUnmount = function () {
        i18n.off('languageChanged', this.onLanguageChange);
    };
    MultilanguageComponent.prototype.onLanguageChange = function () {
        this.forceUpdate();
    };
    return MultilanguageComponent;
}(React.Component));
export default MultilanguageComponent;
//# sourceMappingURL=MultilanguageComponent.js.map