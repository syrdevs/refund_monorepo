var _a;
import { KzTranslation, LANGUAGES, RuTranslation } from '@vitacore/shared-ui';
import * as i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import { getUserLanguage } from './utils';
i18n.use(reactI18nextModule).init({
    resources: (_a = {},
        _a[LANGUAGES.RU] = RuTranslation,
        _a[LANGUAGES.KZ] = KzTranslation,
        _a),
    lng: getUserLanguage(),
    interpolation: {
        escapeValue: false,
    },
});
//# sourceMappingURL=i18n.js.map