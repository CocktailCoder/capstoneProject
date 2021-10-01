import "./mainpage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "../styles";
import CryptoList from "./CryptoList";

 
function  MainPage({user}){
    const [coins, setCoins ] = useState([]);
    const [topChats, setTopChats] = useState([]);
    const [ search, setSearch ] = useState('');

    useEffect(()=> {
      fetch("/tokens")
      .then(r => r.json())
        .then(coins => setCoins(coins)
        )
    }, []) 
 
      useEffect(() => {
        fetch("/chatters")
          .then((r) => r.json())
          .then(setTopChats);
      }, []);

      const handleChange = (e) => {
          setSearch(e.target.value)
      };
      const searchFilterCrypto = coins.filter(coin => 
          coin.name.toLowerCase().includes(search.toLowerCase())
      ); 

{console.log(coins)}
      return (
        <>
      <div id="page">
        <h1 className="heading">Crypto Ticker</h1>
   
            <br/>

          <h1 className="heading">Communities</h1>
            <Button as={Link} to="/new">
            Promote Projects
            </Button>

            <Button as={Link} to="/chatter">
            Crypto Chatter
            </Button>

          <h1 className="heading"> Top Crypto Chats </h1>
             {/* {topChats.likes > 0 ? ( */}
             {topChats.map((chatter) => (
            <Box>
              <h2>{chatter.headline}</h2>
              <p>{chatter.chat}</p>
              <p>
                <cite>By {chatter.user.username}</cite>
              </p>
        
            </Box>
            ))}
            {/* ) : ( */}
        <>
          <h2>No Chats Yet</h2>
          <Button as={Link} to="/newchatter">
            Make a New Chat!
          </Button>
          <h1>Get Live Updates On Cryptos</h1>
          <form >
                <input onChange = {handleChange}
                 id="searchbox" type="text" placeholder="Search Crypto"/>
            </form>
            {searchFilterCrypto.map(coin => {
                    return (
                      <CryptoList
                      key = {coin.id}
                      id = {coin.id}
                      user = {user}
                      name = {coin.name}
                      image = {coin.image}
                      supply = {coin.max_supply}
                      symbol = {coin.currency_symbol}
                      currency={coin}
                      />
                )
                })
                }

        </>
   </div>
        </>
      )
}

export default MainPage;