import { useEffect, useState } from 'react'
import {useLocation, useNavigate}  from 'react-router-dom'
import WallStreetb from '../components/WallStreetb';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

const Sell= ()=> {
    
    const [holder, setHolder] = useState([])
    const [form, setForm] = useState(false)
    const location = useLocation()
    let data = location.state
    const sellStock = () => {
       
        for (let i in data){
            console.log(i)
        }
     console.log(data)
     setHolder(data)
    }
    const closePosition = async(id) => {
        console.log('this is the , ' , {id})
        let response = await axios.delete(`sell/${id}/`)
        console.log(response)
        if (response.data['success'] ==true) {
           
            window.location.href="/#/mainPage"
            
            alert("Your Transaction was successful")
    }
}
const updatePortfolio = async(id) => {
    console.log(id)
    let quantity = document.getElementById('quantity').value
    console.log(quantity)
    let response = await axios.put(`sell/${id}/`,{
        'quantity':quantity

    })
    if (response.data['success'] ==true) {
           
        window.location.href="/#/mainPage"
        
        alert("Your Transaction was successful")
}
}

    useEffect(() => {
        sellStock()

    }, [])

return (
        <div>
            <Col>
            <Button className='button' variant='danger' size='lg'id={holder} onClick={(e)=> closePosition(e.target.id)}>Close Entire Position</Button>
            </Col>
            <br/>
            <br/>
            <Col>
            <Button className='button' variant='success' size='lg'onClick={()=>setForm(!form)}>Sell Portion of Position</Button>
            </Col>
            <Col>
   {
    form ? <Form>
    <Row className="mb-3">
      
      <Col>
      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label className='stuff'>SELL</Form.Label>
        <Form.Control id='buyorsell' readonly class="form-control-plaintext" value="Sell" />
      </Form.Group>
    </Col>

    </Row>
    
    <Form.Group className="mb-3" controlId="formGridAddress1">
      <Form.Label
      className='stuff'>QUANTITY</Form.Label>
      <Form.Control id='quantity' placeholder="100" />
    </Form.Group>
    

    
    
    <Button className="serch"id={holder} onClick={(e)=> updatePortfolio(e.target.id)}>
      Submit
    </Button>
  </Form>: null}
  </Col>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  < WallStreetb />
        </div>
      

    )
}
export default Sell