export default {
    required: function (value, allValues, props, name) {
        var valid = false;
        if (Array.isArray(value)) {
            valid = value.length > 0;
        }
        else {
            valid = !!value;
        }
        return valid ? undefined : 'Обязательное поле';
    },
};
//# sourceMappingURL=Validators.js.map