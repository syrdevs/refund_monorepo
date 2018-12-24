var leftMenuItems = [
    {
        name: 'Объявления',
        hrefPrefix: '/notices',
        iconName: 'database',
        translationKey: 'leftMenu.contracts.notices._',
        subItems: [],
    },
    {
        name: 'Заявки',
        hrefPrefix: '/requests',
        iconName: 'book',
        translationKey: 'leftMenu.contracts.requests._',
        subItems: [
            {
                name: 'Включение в базу данных субъектов здравоохранения',
                href: '/applications',
                translationKey: 'leftMenu.contracts.requests.applications',
            },
            {
                name: 'На объемы',
                href: '/proposals',
                translationKey: 'leftMenu.contracts.requests.proposals',
            },
        ],
    },
    // {
    //   name: 'Регистр поставщиков',
    //   hrefPrefix: '/suppliers',
    //   iconName: 'table',
    //   translationKey: 'leftMenu.contracts.suppliers._',
    //   subItems: [],
    // },
    {
        name: 'Комиссии',
        hrefPrefix: '/commissions',
        iconName: 'audit',
        translationKey: 'leftMenu.contracts.commissions._',
        subItems: [],
    },
    {
        name: 'Протоколы',
        hrefPrefix: '/protocols',
        iconName: 'schedule',
        translationKey: 'leftMenu.contracts.protocols._',
        subItems: [],
    }
];
export default leftMenuItems;
//# sourceMappingURL=leftMenuItems.js.map