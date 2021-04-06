import {combineReducers} from 'redux'
import books from './books'
import book from './book'
import authData from './auth'
import user from './user'
import filterData from './filter'
import wishList from './wishList'
import chats from './chats'


export default combineReducers({books,authData,filterData,wishList,user,book,chats})
