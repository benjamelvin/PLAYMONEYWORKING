import axios from 'axios'
import {useState, useEffect} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

// import Ticker from 'react-ticker'
import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker'




const WallStreetb = ()=> {
    const [holder, setHolder] = useState([])
async function getWallStreetbets() {
    let response = await axios.get('mainPage/')

        let allBets = response.data.data
        setHolder(allBets)
        
        return (
            <div>
          
   
            </div>
        )

}

useEffect(()=> {
        
    getWallStreetbets()
}, [])
return(
<div>
{/* <Dropdown className="d-inline mx-2">
        <Dropdown.Toggle id="dropdown-autoclose-true">
          Top 50 on Wallstreet Bets
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#">{holder.map(item=> <h6>{item.ticker} {item.sentiment}</h6>)}</Dropdown.Item>
          
        </Dropdown.Menu>
      </Dropdown> */}
      
      <div className='stocks'>
      <h1 className='ticker'>TODAY'S TOP 50 TICKERS</h1>
   
      <Ticker slideSpeed= '360'>
      {holder.map(item=>
          <FinancialTicker id="1" change={item.sentiment_score > 0 ?true: false} symbol={item.ticker} percentage={item.sentiment_score} currentPrice={item.sentiment} />
          )}
          <br />
          <br />
          <br />
        </Ticker>


      </div>


</div>

)


}
export default WallStreetb