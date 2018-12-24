import { RouterState } from 'connected-react-router';
import BusinessDataState from '../../Redux/StateModels/BusinessDataState';
import DictionariesDataState from './DictionariesDataState';
import InfrastructureState from './InfrastructureState';
export default interface State {
    router: RouterState;
    infrastructureState: InfrastructureState;
    businessDataState: BusinessDataState;
    dictionariesDataState: DictionariesDataState;
}
