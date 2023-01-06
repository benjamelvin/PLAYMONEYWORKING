import axios from 'axios'
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react'
import 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import WallStreetb from '../components/WallStreetb';
import Wallet from '../components/Wallet';
import { useTable } from 'react-table';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import CurrentVal from '../components/CurrentVal';
// import StockSearch from '../components/StockSearch';
const MainPage = () => {
  const [market, setMaket] = useState([])
const [total, setTotal] = useState(0)
const [holder2, setHolder2] = useState([])
const navigate = useNavigate()
const navigate2 = useNavigate()

console.log('hello')
   
    async function getStockFromSearch(event) {
        event.preventDefault()
        let stock = document.getElementById('header-search').value
        // console.log(stock)
        let response = await axios.post('search/', {
            'stock': stock
       })
        let stockData = response.data.data
       console.log(stockData)
        
    
        navigate('/singleStockPage', {
            state: stockData
        })
        return(
           <div>

           </div>
        )
    }
    const getPortfolio=async()=>{
        let dict = 0
        let myArr = []
        let finalObj = {}
        let response = await axios.get('getPortfolio/')
        let portfolio = response.data
       
        for (let i in portfolio){
           dict = i
        }
        for (let dict in portfolio) {
            myArr.push(portfolio[dict])
          }
setHolder2(myArr)
        
   return (
                <div>
                </div>
            )

    }
  async function getCurrent() {
    let total = 0
      let response = await axios.get('getCurrent/')
      let totalVal = response.data.data
      setMaket(response.data.data)
      

     let totalval = totalVal.reduce((a, b) => a+b)
     
      setTotal(totalval)
     
         return (
              <div>
            </div>
          )
         }
      function handleClick(id) {
         
          navigate2('/sell', {
            state: id
          })
      }
    useEffect(()=> {
        getCurrent()
        getPortfolio()
    }, [])

    return(
        <div>
            < WallStreetb />
      <div>
      <Container>
      <Row>
        <Col><Wallet total = {total} /></Col>
        <Col > 
       <form className='searchbar' onSubmit={getStockFromSearch}>
        <h1 className='ticker'>SEARCH</h1>
           <label htmlFor="header-search">
               <span className="visually-hidden">Search Stocks</span>
           </label>
           <input className='serchh'
               type="text"
               id="header-search"
               placeholder="Search Stocks"
               name="s" 
           />
           <br/>
           <br/>
           <button className='serch' onClick={getStockFromSearch}>Search</button>
       </form></Col>
      </Row>
     </Container>
      
      {/* <StockSearch /> */}
   

       
       <h1 className='ticker'> PORTFOLIO </h1>
       <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          
          <th className='table-headers'>Symbol</th>
          <th className='table-headers'>Purchase Date</th>
          <th className='table-headers'>Share Purchase Price</th>
          <th className='table-headers'>Quantity</th>
          <th className='table-headers'>Totol Purchase Price</th>
          <th className='table-headers'>Current Market Value</th>
          </tr>
        
      </thead>
     <tbody>
        {holder2.map((item, index) => 
        <tr>
          
          <td >{item.fields.symbol}</td>
          <td>{item.fields.date}</td>
          <td>{item.fields.buyprice}</td>
          <td>{item.fields.quantity}</td>
          <td>${item.fields.totalcost}</td>
        
          <td>${market[index]}</td>
          <button value={item.pk} onClick={(e)=> handleClick(e.target.value)}>Sell</button>
        </tr>
         )} 
      </tbody>
      <thead>
        <tr>
          
        </tr>
      </thead>
      <tbody>
        {/* {market.map(val => 
        <tr>
          <th >${val}</th>
         

        </tr>
        )} */}
        </tbody>

     
    </Table> 
    
               </div>
             
               </div>

  );
}
    export default MainPage
   
