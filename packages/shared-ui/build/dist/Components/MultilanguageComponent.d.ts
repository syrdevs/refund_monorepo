import * as React from 'react';
declare class MultilanguageComponent<Props = {}, State = {}> extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onLanguageChange;
}
export default MultilanguageComponent;
