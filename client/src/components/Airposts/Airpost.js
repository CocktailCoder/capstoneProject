import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import styled from 'styled-components'

const Card = styled.div`
border: 1px solid #efefef;
background: #fff; 
`
const AirpostLogo = styled.div` 
width: 50px;
text-align: center;
margin-left: auto;
margin-right: auto;
img {
 height: 50px;
 width: 50px;
 border-radius: 100%;
 border: 1px solid #efefef;
}
`
const AirpostName = styled.div`
    padding: 20px 0 10px 0;
`
const LinkWrapper = styled.div`
margin: 30px 0 20px 0;
height: 50px;

a{
    color: #fff;
    background: #000;
    border-radius: 4px;
    padding: 10px 50px;
    border: 1px solid #000;
    width: 100%;
    text-decoration: none;

}
`
const Airpost = (props) => {
    
    return (
        <Card>
        <AirpostLogo>
            <img src={props.attributes.image_url} alt={props.attributes.name}/>
        </AirpostLogo>
        <AirpostName>
            {props.attributes.name}
        </AirpostName>
        <div className="airpost-score">Average Rating: {props.attributes.avg_score}</div>
        <LinkWrapper>
            <Link to={`/airposts/${props.attributes.slug}`}>View Post </Link>
        </LinkWrapper>
        </Card>
    )
}

export default Airpost



// function Airpost ({attributes}) {
    
//     return (
//         <Card>
//         <AirpostLogo>
//             <img src={attributes.image_url} alt={attributes.name}/>
//         </AirpostLogo>
//         <AirpostName>
//             {attributes.name}
//         </AirpostName>
//         <div className="airpost-score">Average Rating: {attributes.avg_score}</div>
//         <LinkWrapper>
//             <Link to={`/airposts/${attributes.slug}`}>View Post </Link>
//         </LinkWrapper>
//         </Card>
//     )
// }

// export default Airpost