import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const SignIn=() => {
    const navigate = useNavigate()
    const signIn= async() => {
        event.preventDefault()
      let email = document.getElementById('signInEmail').value
      let password = document.getElementById('signInPassword').value
      let myResponse = await axios.post('signIn/',{
        'email': email,
        'password': password
      })
      console.log(myResponse.data)
      if (myResponse.data['success'] ==true) {
           
        window.location.href="/#/mainPage"
        window.location.reload()
      }
      else{
        alert("incorrect password or email")
        window.location.reload()
      }
    }
    return(
 
<form onSubmit={signIn}>
        <input className="serchh" id='signInEmail' placeholder='email' />
        <input className="serchh"id='signInPassword' placeholder='password' type='password' />
        <button className="serch" onClick={signIn}>Sign In</button>
        </form> 
        
    )
}
export default SignIn