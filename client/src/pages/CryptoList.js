
import { Link } from "react-router-dom"
import Dashboard from "./Dashboard";
import {useState} from "react";
import {useHistory} from "react-router";

function CryptoList({user, addToCryptodash, currency, name, symbol, crypto, setCryptos}) {
    const [errors, setErrors] = useState([])
    let history = useHistory();
    // const {id} = currency;

    // function deleteCrypto(){
    //   fetch(`/watchlists/${id}`,
    //    { method: 'DELETE' })
    //    .then((r)=>{
    //     if (r.ok){
    //       handleDelete(crypto)
    //   }})
    // }
  
  const handleDelete = (deletedCrypto) =>{
      setCryptos((cryptos)=>cryptos.filter((crypto)=>crypto.id !== deletedCrypto.id))
    }
  function addToCryptodash(){
        const addCrypto = {
          user_id: user.id,
          currency_id: currency.id
        }
        fetch('/cryptodashes',{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(addCrypto)
        })
        .then(res => res.json())
        .then(json =>{
          if(json.error) setErrors(json.error)
        })
    }
    
    return (
    
    <div className="coin-card">
        <h1>{name}
            <small>{symbol}</small>
        </h1>
        <button onClick={() => addToCryptodash(currency)} >Add to Dashboard</button>
        {/* <button type='submit' 
              onClick={deleteCrypto}
              >
                Remove from Cryptos
              </button> */}
    

        
    </div>
    
    )
}

export default CryptoList;