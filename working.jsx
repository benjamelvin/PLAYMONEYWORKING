import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from "./pages/SignIn"
import AppNav from './components/AppNav'


function App() {
  const [count, setCount] = useState(0)
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

// const signIn= async() => {
//     event.preventDefault()
//   let email = document.getElementById('signInEmail').value
//   let password = document.getElementById('signInPassword').value
//   let myResponse = await axios.post('signIn/',{
//     'email': email,
//     'password': password
//   })
//   console.log(myResponse.data)
//   if (myResponse.data['success'] ==true) {
//     window.location.reload()
//   }
// }
// const signUp= async() => {
//   event.preventDefault()
//   let email = document.getElementById('signUpEmail').value
//   let password = document.getElementById('signUpPassword').value
//   console.log(email, password)
  
//   let myResponse = await axios.post('signUp/',{
//     'email': email,
//     'password': password
//   })
 
// }
const signOut= async() => {
  
  let myResponse = await axios.post('signOut/')
  
 
  if (myResponse.data['signout']==true) {
   
  window.location.reload()
  console.log(myResponse.data)
  }
}

const current_user=async()=>{
  let myResponse = await axios.get('current_user')
  let user=myResponse.data && myResponse.data[0] && myResponse.data[0].fields
  console.log(myResponse.data)
  setUser(user)
}
useEffect(()=> {
  current_user()

}, [])
  return (
    <div className="App">
      <AppNav />
      WELCOME TO PLAY MONEY!!
      <br>
      </br>
     { user &&<h3>{user.email}</h3>}
      <h3>Play like a day trader or watch your investments grow over time</h3>
        <p>Risk Free!!</p>
      <div>
        {/* <form onSubmit={signIn}>
        <input id='signInEmail' placeholder='email' />
        <input id='signInPassword' placeholder='password' type='password' />
        <button onClick={signIn}>Sign In</button>
        </form> */}
        <br/>
        {/* <form onSubmit={signUp}>
        <input id='signUpEmail' placeholder='email' />
        <input id='signUpPassword' placeholder='password' />
        <button onClick={signUp}>Sign Up</button>
        </form> */}
        {user && <button onClick={signOut}>Sign Out</button>}
        <Router >
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
          </Routes>
        </Router>
        </div>
    </div>
  )
}

export default App
