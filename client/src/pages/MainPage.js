import "./mainpage.css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Box } from "../styles";
import Ticker from 'react-ticker';
import CoinCard from "./CoinCard";
import CryptoList from "./CryptoList";
import Dashboard from "./Dashboard";
import { Switch, Route } from "react-router-dom"
 
function  MainPage({user}){
    const [coins, setCoins ] = useState([])
    const [topChats, setTopChats] = useState([]);
    const [myPortfolio, setMyPortfolio] = useState([])
    const [liked, setLiked] = useState(false)
    const [cryptoDash, setCrpytodash] = useState(false)

    // useEffect(()=> {
    //     fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024hr%2C%207d%2C%2030d%2C%20200d%2C%201yr`)
    //     .then(r => r.json())
    //     .then( crypto => setCoins(crypto)
    //     )
    //   }, []) 
    useEffect(()=> {
      fetch("/tokens")
      .then(r => r.json())
        .then(coins => setCoins(coins)
        )
        // .then(console.log)
    }, []) 
 
      useEffect(() => {
        fetch("/chatters")
          .then((r) => r.json())
          .then(setTopChats);
      }, []);


    // const name = coins.map((coin) => (
    //     coin.name
    //   ))


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
              <button type='submit' class='likeBtn' onClick={console.log}>
                {!liked ? '♡' : '💙'}
                </button>
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
                    <CryptoList
                    key = {coin.id}
                    id = {coin.id}
                    user = {user}
                    name = {coin.name}
                    description = {coin.description}
                    supply = {coin.max_supply}
                    symbol = {coin.currency_symbol}
                    currency={coin}
                    myPortfolio={myPortfolio}
                    />
                    )
                  })
                  }
          {/* live list */}
          {/* {coins.map(coin => {
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
                  } */}

        </>
   </div>
        </>
      )
}

export default MainPage;