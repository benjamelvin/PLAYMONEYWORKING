import { useState } from 'react'
import './App.css'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import axios from 'axios'
import { useEffect } from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from "./pages/SignIn"
import AppNav from './components/AppNav'
import MainPage from './pages/MainPage'
import SingleStockPage from './pages/SingleStockPage'
import Wallet from './components/Wallet'
import Sell from './pages/Sell'
import { Container } from "reactstrap";


import 'react-bootstrap'



function App() {
 
  const [user, setUser] = useState(null)
  

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common['X-CSRFToken']= csrftoken

const signOut= async() => {
  
  let myResponse = await axios.post('signOut/')
  
 
  if (myResponse.data['signout']==true) {
   
  window.location.href='/'
  console.log(myResponse.data)
  }
}

const current_user=async()=>{
  let myResponse = await axios.get('current_user')
  let user=myResponse.data && myResponse.data[0] && myResponse.data[0].fields
  
  setUser(user)
}
useEffect(()=> {
  current_user()

}, [])
  return (
   
    <div className="App">
      <Container className="p-0 background-image" fluid={true}>
     {user && <Navbar bg="light" variant="light">
            <Nav  className="container-fluid">
                <br/>
                <Nav.Link ><span className='nav'> Account User: {user.email}  </span></Nav.Link>
                <br/>
                <Nav.Link  href="/#/mainPage"> <span className='nav'>  Home   </span></Nav.Link>
                <Nav.Link  className="border-left pl-2 ms-auto" href="/"><button className='nav'onClick={signOut}>Sign Out</button></Nav.Link>
            </Nav>

        </Navbar>}

       { !user &&   <AppNav />}
     
      <br>
      </br>
     {/* { user &&<h3>{user.email}</h3>} */}
     {!user && <h1 className='intro'>WELCOME TO PLAY MONEY!!</h1>}
     <br/>
     <br/>
     <br/>
      {!user &&<h1 className='intro'>Play like a day trader or watch your investments grow over time</h1>}
        {!user &&<h1 className='intro'>Risk Free!!</h1>}
      <div>
     
       
        <Router >
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path='/mainPage' element={<MainPage />} />
            <Route path='/singleStockPage' element={<SingleStockPage />} />
            <Route path='/sell' element={<Sell />} />

          </Routes>
        </Router>
        </div>
        </Container>
    </div>
  )
}

export default App
