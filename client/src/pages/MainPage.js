import "./mainpage.css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Box } from "../styles";
import Ticker from 'react-ticker';
import CoinCard from "./CoinCard";
import Dashboard from "./Dashboard";
import { Switch, Route } from "react-router-dom"
 
function  MainPage(){
    const [coins, setCoins ] = useState([])
    const [topChats, setTopChats] = useState([]);
    const [myPortfolio, setMyPortfolio] = useState([])

    useEffect(()=> {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024hr%2C%207d%2C%2030d%2C%20200d%2C%201yr`)
        .then(r => r.json())
        .then( crypto => setCoins(crypto)
        )
      }, []) 
 
      useEffect(() => {
        fetch("/chatters")
          .then((r) => r.json())
          .then(setTopChats);
      }, []);


      function addToPortfolio(coins, details) {
        if(!myPortfolio.includes(coins)) {
       const updatePortfolio = [...myPortfolio, coins]
       const updatePortfolioDeets = [...myPortfolio, details]
       setMyPortfolio(updatePortfolio, updatePortfolioDeets)
      }}
      
    const name = coins.map((coin) => (
        coin.name
      ))


      return (
        <>
      <div id="page">
        <h1 className="heading">Crypto Ticker</h1>
   
        <Ticker>
          {({ index }) => (
            <>
            <span>
                <h2>{name}[{index}]  </h2>
                {/* <img src=" " alt=""/> */}
            </span>
            </>
        )}
         </Ticker>
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

          <h1>List of cryptos</h1>
          {coins.map(coin => {
                    return (
                    <CoinCard
                    key = {coin.id}
                    id = {coin.id}
                    name = {coin.name}
                    image = {coin.image}
                    symbol = {coin.symbol}
                    price = {coin.current_price}
                    handleClick={addToPortfolio}
                    coins={coin}
                    myPortfolio={myPortfolio}
                    />
                    )
                  })
                  }

        </>
      {/* )} */}
   </div>
        </>
      )
}

export default MainPage;