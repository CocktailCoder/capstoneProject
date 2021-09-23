import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CoinCard from "./CoinCard";
import {useHistory} from "react-router";

function Dashboard({user, myPortfolio, coins,}){
  const [chats, setChats] = useState([])
  const [cryptoDash, setCryptoDash] = useState([])
  const [watchlist, setWatchlist] = useState ([])
  const {id} = chats;
// attempt at fetching added cryptos below 
let history = useHistory();

useEffect(() => {
  function fetchItems(){
    fetch("/watchlists")
    .then(res=>res.json())
    .then(chats => {
      if(chats.error){
          history.push(`/sign_up`);
        }else{
          
          setWatchlist(chats)
          // console.log(chats)
        }
    })
  }
  fetchItems();
},[]);

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

const myWatchlist = watchlist.filter(watchlistitem => 
  watchlistitem.user.id === user.id
); 

const myCryptoDash = cryptoDash.filter(cryptolistitem => 
  cryptolistitem.user.id === user.id
); 

function deleteWatchlist(){
  fetch(`/watchlists/${id}`,
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

          <div key ={watchlist.id}>
          {myWatchlist.map(watchlist => (
          <h2>{watchlist.chatter.headline}</h2>

        ))}
          </div>

          <div key ={cryptoDash.id}>
          {myCryptoDash.map(cryptolist => (
          <h2>{cryptolist.currency.name}</h2>

        ))}
          </div>

        <span>
              <button type='submit' className='favBtn' 
              onClick={deleteWatchlist}
              >
                Remove from watchlists
              </button>
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