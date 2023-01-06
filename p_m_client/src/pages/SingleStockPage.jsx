import { useEffect, useState } from 'react'
import {useLocation, useNavigate}  from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import WallStreetb from '../components/WallStreetb';
import axios from 'axios';
import Container from 'react-bootstrap/Container';


const SingleStockPage= ()=> {
    
    const [holder, setHolder] = useState([])
    const [form, setForm] = useState(false)
    const location = useLocation()
    let data = location.state
    const singleStockInfo = () => {
       
        for (let i in data){
            console.log(i)
        }
     console.log('single stock page', data)
     setHolder(data)
    }
     const addToPortfolio = async() => {
        let symbol = document.getElementById('symbol').value
        let quantity = document.getElementById('quantity').value
        let price = document.getElementById('price').value
        let buy = document.getElementById('buyorsell').value.toLowerCase()
        
        let myResponse = await axios.post('singleStockPage/',{
          'price': price,
          'symbol': symbol,
          'buyorsell': buy,
          'quantity': quantity
        })
       
        if (myResponse.data['bought'] ==true) {
           
            window.location.href="/#/mainPage"
            
            alert("Your purchase was successful")
        }
        else{
            alert("your purchase was unsuccesful")
            window.location.reload()
          }
    }
    
   
    useEffect(() => {
singleStockInfo()


    }, [])

return (
        <div >
            {/* <Container className="bull" fluid={true}> */}
              <div>
      <Container>
        <Row>
          <Col>
           {holder.map(item =>  <Card style={{ width: '18rem' }}>
      <Card.Img className='picc'variant="top" src={item.logo} />
      <Card.Body>
       
        <Card.Text>
         {item.name}
         <br/>
         Current price: {item.price}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item> Stock symbol: {item.symbol}</ListGroup.Item>
        <ListGroup.Item> Open price: {item.open}</ListGroup.Item>
        <ListGroup.Item> Today's low: {item.low}</ListGroup.Item>
        <ListGroup.Item> Today's High: {item.high}</ListGroup.Item>
        {/* <ListGroup.Item> Previous days close: {item.previous_close}</ListGroup.Item> */}
        {/* <ListGroup.Item> 52 week low: {item.low52}</ListGroup.Item>
        <ListGroup.Item> 52 week high: {item.high52}</ListGroup.Item> */}
        <ListGroup.Item> 52 week range: {item.range}</ListGroup.Item>
        </ListGroup>
    </Card>
    
)}
</Col>
<Col>
<div className="d-grid gap-2">
    <Button className='button' variant='warning' size='lg'onClick={()=>setForm(!form)}>Buy</Button>
    </div>
   {holder.map(item => ( 
    form ? <Form className='form'>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridEmail" >
        <Form.Label >Stock Symbol</Form.Label>
        <Form.Control id='symbol' readonly class="form-control-plaintext" value={item.symbol} />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>Buy</Form.Label>
        <Form.Control id='buyorsell' readonly class="form-control-plaintext" value = 'BUY' />
      </Form.Group>
    </Row>

    <Form.Group className="mb-3" controlId="formGridAddress1">
      <Form.Label>Quantity</Form.Label>
      <Form.Control id='quantity' placeholder="100" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formGridAddress2">
      <Form.Label>Current Price</Form.Label>
      <Form.Control id= 'price' readonly class="form-control-plaintext" value={item.price} />
    </Form.Group>

    <br/>
    <div className="d-grid gap-2">
    <Button variant = 'danger' size='lg' onClick={addToPortfolio}>
      Submit
    </Button>
    </div>
  </Form>: null
     ))}
     
     </Col>
     <Col> {holder.map(item => <Card className= 'pic'style={{ width: '14rem' }}>
      <Card.Img variant="top" src={item.image_url} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          
        </Card.Text>
        <Button variant="light"><a href={item.link}>Go To Story</a></Button>
      </Card.Body>
    </Card>
    
)}
</Col>
<Col> {holder.map(item => <Card style={{ width: '14rem' }}>
      <Card.Img variant="top" src={item.image_url1} />
      <Card.Body>
        <Card.Title>{item.title1}</Card.Title>
        <Card.Text>
          
        </Card.Text>
        <Button variant="light"><a href={item.link1}>Go To Story</a></Button>
      </Card.Body>
    </Card>
    
)}
     
     </Col>
     </Row>
     < WallStreetb />
     </Container>
     
     </div>
     {/* </Container> */}
    </div>
      

    )
}
export default SingleStockPage