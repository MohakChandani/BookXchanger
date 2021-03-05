import React,{useEffect} from 'react'
import Navbar from "../Navbar/Navbar.js"
import Description from "./Description/Description.js"
import SearchBox from "./SearchBar/SearchBox.js"
import Chatbot from "./Chatbot/chatbot.js"
import DisplayBooks from '../AllBooksComponents/AllBooks'
import {getBooks} from '../../actions/books'
import {useDispatch} from 'react-redux'
import Footer from "../Footer/footer.js"

const Home = () => {
    const dispatch = useDispatch()
    return (
        <>
         <Navbar />
      
          { /* <SearchBox /> */}
            <Description /> 
        
          <DisplayBooks/> 
        
            {/* <Chatbot /> */}
            <Footer/>
        </>
    )
}

export default Home;
