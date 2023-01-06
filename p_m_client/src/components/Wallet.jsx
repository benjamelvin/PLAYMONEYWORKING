import axios from 'axios'
import {useState, useEffect} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card'




const Wallet = ({total})=> {
    const [holder, setHolder] = useState([])
    const [graph, setGraph] = useState()
   

async function getWallet() {
    let response = await axios.get('getWallet/')
   
   let newTotal = response.data[0]['fields']['amount'] + total

        let wallet = response.data
        setHolder(wallet)
        
        return (
            <div>
          

            </div>
        )

}
useEffect(()=> {
        
    getWallet()
}, [])
return(
<div className='serch'>
{/* <Dropdown className="d-inline mx-2">
        <Dropdown.Toggle id="dropdown-autoclose-true">
          Wallet
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#">{holder.map(item=> <h6>Account Balance: {item.fields.amount} Account Total Value: {Number(total) +Number(item.fields.amount)}</h6>)}</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown> */}
      <Card
          // bg='black'
          border='success'
          
          
          style={{ width: '18rem' , backgroundColor: 'crimson',}}
          className="wallet"
        >
          <Card.Header>Your Funds</Card.Header>
          <Card.Body>
            <Card.Title> </Card.Title>
            {holder.map(item => 
            <Card.Text>
              Account Balance: 
              ${item.fields.amount}
              <br/>
              Total Value: 
              ${Number(total) +Number(item.fields.amount)}

            </Card.Text>
            
            )}
          </Card.Body>
        </Card>
        <div>
        
        </div>
</div>

)


}
export default Wallet