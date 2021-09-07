import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CoinCard from "./CoinCard";
import {useHistory} from "react-router";

function Dashboard({user, myPortfolio, coins,}){
    const [cryptos, setCryptos] = useState([])
    
    let history = useHistory();

    
    useEffect(() => {
        function fetchItems(){
          fetch("/cryptos")
          .then(res=>res.json())
          .then(cryptos => {
            if(cryptos.error){
                history.push(`/signup`);
              }else{
                setCryptos(cryptos)
              }
          })
        }
        fetchItems();
      },[]);

      const myCryptos = cryptos.filter(crypto => 
        crypto.user.id === user.id
    ); 
    // const [currencies, setCurrencies] = useState([]);
    // useEffect(() => {
    //     fetch("/currencies")
    //       .then((r) => r.json())
    //       .then(setCurrencies);
    //   }, []);

    return (
        <div>
            {/* <h1 className ="heading">Hello {user.username}</h1> */}
            <p className ="heading">Would you like to calculate your crypto holdings?</p>
            {myCryptos.map(crypto => (
          <CoinCard crypto={crypto} setCryptos={setCryptos}/> 
        ))}
        </div>

    )
}
export default Dashboard;