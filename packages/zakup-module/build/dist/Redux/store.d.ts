import { History } from 'history';
import { Store } from 'redux';
import { State } from './StateModels';
export declare const initStore: (history: History<any>) => void;
export declare const getStore: () => Store<State, import("redux").AnyAction>;
