import axios from 'axios'
import {useState, useEffect} from 'react'



const CurrentVal     = ()=> {
    const [holder, setHolder] = useState([])
async function getCurrent() {
    let response = await axios.get('getCurrent/')
 
       
    
        

        return (
            <div>
          
   
            </div>
        )

}
useEffect(()=> {
    getCurrent()
   
}, [])
return(
<div>

</div>

)


}
export default CurrentVal