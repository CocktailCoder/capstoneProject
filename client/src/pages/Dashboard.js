import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useHistory} from "react-router";
import { useParams } from "react-router-dom"

function Dashboard({user, myPortfolio, coins,}){
  const [chats, setChats] = useState([])
  const [cryptoDash, setCryptoDash] = useState([])
  const [watchlist, setWatchlist] = useState ([])
  const [coinDetail, setCoinDetail] = useState([])
  // const {id} = cryptoDash;

let history = useHistory();
// const params = useParams()
// console.log(params)

function moreInfo (myCrypto){

    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${myCrypto}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024hr%2C%207d%2C%2030d%2C%20200d%2C%201yr`)
        .then(r => r.json())
        .then(data => {setCoinDetail(data)
        history.push(`/dashboard`)})
        // .then(console.log)

}

useEffect(() => {
  function fetchItems(){
    fetch("/cryptodashes")
    .then(res=>res.json())
    .then(cryptos => {
      if(cryptos.error){
        history.push(`/sign_up`);
      }else{
        // console.log(cryptos)
        setCryptoDash(cryptos)
        
      }
  })
}
  fetchItems();
},[]);
let myCryptos = cryptoDash
// {console.log(myCryptos)}


// const myCryptoDash = cryptoDash.filter(cryptolistitem => 
//   cryptolistitem.user.id === user.id
// ); 

function deleteWatchlist(id){
  fetch(`/cryptodashes/${id}`,
   { method: 'DELETE' })
   .then((r)=>{
    if (r.ok){
      handleDelete(watchlist)
  }})
}

const handleDelete = (deletedWatchlist) =>{
  setWatchlist((watchlists)=>watchlists.filter((watchlist)=>watchlist.id !== deletedWatchlist.id))
}


    return (
        <div>
            <h1 className ="heading">Hello {user.username}</h1>
            <p className ="heading">Would you like to see your crypto holdings?</p>
            <h1>Crypto Updates</h1>
            <h1>{coinDetail.map(crypto => (<>{crypto.id}</>))}</h1>
            <h1>Live Price: {coinDetail.map(crypto => (<>{crypto.current_price.toFixed(2)}</>))}</h1>
            <h2>Live Market Cap: {coinDetail.map(crypto => (<>{crypto.market_cap}</>))}</h2>
            <br/>
            <div id="watchlist">
            <h1>Crypto Watchlist</h1>
          <div key ={myCryptos.id}>
            {myCryptos.map(cryptos => (
              <div id={cryptos.token.id}>
                <h1>{cryptos.token.name}</h1>
                <h2>Symbol:{cryptos.token.currency_symbol}</h2>
                {/* <h2>{cryptos.token.slug}</h2> */}
                
                <span>
                <button type='button' class='favBtn' onClick={() => {moreInfo(cryptos.token.slug)}} > Update Crypto Info </button> 
                <button type='button' class='favBtn' onClick={() => deleteWatchlist(cryptos.id)} > Delete from dashboard </button> 
                </span>
                
              </div>))}
          </div>
          </div>
          <span>
              {/* <button type='submit' className='favBtn' 
              onClick={()=>deleteWatchlist(crypto.token.id)}
              >
                Remove from watchlists
              </button> */}
        </span>
        </div>

    )
}
export default Dashboard;

             
              // {currencies.map(crypto => (
              //   <CoinCard crypto={crypto} setCryptos={setCurrencies}/> 
              // ))} 

        //  {myCryptos.map(crypto => (
        //   <CoinCard crypto={crypto} setCryptos={setCryptos}/> 
        // ))}

          // const [cryptos, setCryptos] = useState([])
    // let history = useHistory();
    // useEffect(() => {
    //     function fetchItems(){
    //       fetch("/cryptos")
    //       .then(res=>res.json())
    //       .then(cryptos => {
    //         if(cryptos.error){
    //             history.push(`/signup`);
    //           }else{
    //             setCryptos(cryptos)
    //           }
    //       })
    //     }
    //     fetchItems();
    //   },[]);

    //   const myCryptos = cryptos.filter(crypto => 
    //     crypto.user.id === user.id
    // ); 

    // const [currencies, setCurrencies] = useState([]);
    // useEffect(() => {
    //     fetch("/currency")
    //       .then((r) => r.json())
    //       .then(setCurrencies);
    //   }, []);