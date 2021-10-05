import React from 'react';
import {useState, useEffect} from 'react';
import Airpost from './Airpost';
import styled from 'styled-components'
import axios from 'axios';

function Airposts (){
    const [airposts, setAirposts] = useState([])
    const Home = styled.div`
        text-align: center;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
    `
    const Header = styled.div `
        padding: 100px 100px 10px 100px;

        h1 {
            font-size: 42;
        }
    `
    const Subheader = styled.div `
        font-weight: 300;
        font-size: 26px;
    `
    const Grid = styled.div `
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 20px;
        width: 100%;
        padding:20px;
    `
 
    useEffect(()=> {

    axios.get('api/v1/airposts.json')
    .then(resp => { 
        setAirposts(resp.data.data)
        })
    // .catch(resp => console.log(resp))

}, [airposts.length])

// {console.log(airposts)}

      const grid = airposts.map(item=>{
          return (
          <Airpost 
          key={item.attributes.name}
          attributes={item.attributes}
          />
          )
        })
    return (
        <Home>
            <Header>
                <h1>Crypto Compound</h1>
                <Subheader>Bearish and Bullish Reviews</Subheader>
            </Header>
            <Grid>
                {grid}
            </Grid>
        </Home>
    )
}
export default Airposts