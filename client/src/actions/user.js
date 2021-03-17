import {FETCH_FAV, GET_PROFILE, EDIT_PROFILE} from '../constants/actions'
import api from '../api/index';

export const getProfile = () => async (dispatch) => {

    try {
        const {data} = await api.getProfile();
        //console.log(data);
        //console.log("before dispatch");
        dispatch({ type: GET_PROFILE, payload: data });
        //console.log("after dispatch");
    } catch (error) {
        console.log(error);
    }
    
};


export const editProfile = (userData) => async (dispatch) => {

    try {
        console.log("in actions");
        const {data} = await api.editProfile(userData);
        console.log(data);
        dispatch({type:EDIT_PROFILE,payload:data});
    } catch (error) {
        console.log(error);
    }
    
};

export const getWishList = (id) => async (dispatch)=>{
    try {
        const {data} = await api.getWishList(id);
        console.log(data)
        dispatch({type:FETCH_FAV,payload:data})
    } catch (err) {
        console.log(err)
    }
}