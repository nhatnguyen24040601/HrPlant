import {useSelector} from 'react-redux';
import {TGLOBAL_STATE} from 'redux/rootReducer';

export const useProfile = () => {
    return useSelector((state: TGLOBAL_STATE) => state.profile.profile);
};
