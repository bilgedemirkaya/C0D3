import axios from 'axios';
import { apiCallBegan,apiCallSuccess, apiCallFailed } from '../../shared/constants/ActionTypes';

const api = ({dispatch}) => next => async action => {
    if (action.type !== apiCallBegan) return next(action);

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
    const response = await axios.request({
        baseURL: 'api.crwizard.com',
        url,
        method,
        data
    });

    dispatch(apiCallSuccess(response.data));

    if(onSuccess) dispatch({type: onSuccess, payload: response.data});
    }
    catch (error) {
        dispatch(apiCallFailed(error.message));
        if (onError) dispatch({type: onError, payload: error});
    }
}

export default api;