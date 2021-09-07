import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard({user}){

    return (
        <div>
            <h1 className ="heading">Hello {user.username}</h1>
            <p className ="heading">Would you like to calculate your crypto holdings?</p>
        </div>
    )
}
export default Dashboard;