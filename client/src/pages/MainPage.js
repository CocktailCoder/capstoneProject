import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
 
function  MainPage(){
    const [ coins, setCoins ] = useState([])
    useEffect(()=> {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024hr%2C%207d%2C%2030d%2C%20200d%2C%201yr`)
        .then(r => r.json())
        .then( 
          console.log
        )
      }, []) 


      return (
        <>
            <h1 id="ticker">Crypto Ticker</h1>
            <br/>
            <h1>Communities</h1>
            <Button as={Link} to="/new">
            Crypto Job Forum
            </Button>
            <Button as={Link} to="/chatter">
            Crypto Chatter
            </Button>
            <h1> Nft stretch goal </h1>
        </>
      )
}

export default MainPage;