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
import * as React from 'react';
import kzFlag from '../../Images/kzFlag.svg';
import ruFlag from '../../Images/ruFlag.svg';
import { setUserLanguage } from '../../utils';
var languages = [
    {
        name: 'ru',
        label: 'Русский',
        imgSrc: ruFlag,
    },
    {
        name: 'kz',
        label: 'Казахский',
        imgSrc: kzFlag,
    },
];
var LanguageSelector = /** @class */ (function (_super) {
    __extends(LanguageSelector, _super);
    function LanguageSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleSelectionOpen = function (evt) {
            evt.stopPropagation();
            _this.setState({
                selectionOpen: !_this.state.selectionOpen,
            });
        };
        _this.renderLanguageItem = function (currentLanguageObj) {
            return (React.createElement("div", { className: "language-selector__item" },
                React.createElement("p", null, currentLanguageObj.label)));
        };
        _this.renderSelections = function (currentLanguageName) {
            return (React.createElement("div", { className: "language-selector__options" }, languages.map(function (lngObj) {
                return (React.createElement("div", { className: "language-selector__item " + (lngObj.name === currentLanguageName ? 'selected' : ''), key: lngObj.name, onClick: function () { return _this.onSelectFlag(lngObj.name); } }, lngObj.label));
            })));
        };
        _this.onSelectFlag = function (countryCode) {
            _this.setState({
                selectionOpen: false,
                currentLanguage: countryCode,
            });
            setUserLanguage(countryCode);
        };
        _this.state = {
            currentLanguage: _this.props.defaultLanguage,
            selectionOpen: false,
        };
        _this.hideSelectOptions = _this.hideSelectOptions.bind(_this);
        return _this;
    }
    LanguageSelector.prototype.render = function () {
        var _a = this.state, currentLanguage = _a.currentLanguage, selectionOpen = _a.selectionOpen;
        var currentLanguageObj = currentLanguage && languages.find(function (lngObj) { return lngObj.name === currentLanguage; });
        return (React.createElement("div", { className: "language-selector", onClick: this.toggleSelectionOpen },
            React.createElement("div", { className: "language-selector__bar" },
                (currentLanguageObj && this.renderLanguageItem(currentLanguageObj)) || React.createElement("p", null, "\u042F\u0437\u044B\u043A"),
                React.createElement("p", { className: "language-selector__arrow " + (selectionOpen ? 'opened' : '') })),
            selectionOpen && this.renderSelections(currentLanguageObj && currentLanguageObj.name)));
    };
    LanguageSelector.prototype.componentDidMount = function () {
        window.addEventListener('click', this.hideSelectOptions);
    };
    LanguageSelector.prototype.componentWillUnmount = function () {
        window.removeEventListener('click', this.hideSelectOptions);
    };
    LanguageSelector.prototype.hideSelectOptions = function () {
        if (this.state.selectionOpen) {
            this.setState({
                selectionOpen: false,
            });
        }
    };
    return LanguageSelector;
}(React.PureComponent));
export default LanguageSelector;
//# sourceMappingURL=LanguageSelector.js.map