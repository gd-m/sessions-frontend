import React from 'react'
import {Link} from 'react-router-dom'

function Home(props){
    const handleLogoutClick = () => {
        fetch('http://localhost:3001/api/v1/logout', {
      credentials: "include",
      method: "DELETE"
    })
    .then(res => res.json())
    .then(props.handleLogout)
    }

    const renderContent = props.isLoggedIn ? (<div>
        <button onClick={handleLogoutClick}>Logout</button>
        <h3>You have successfully Completed a session app. </h3>
    </div>) 
    
    : 
    
    (<div>
        <Link to="/login">Login</Link><br/><br/>
        <Link to="/signup">Signup</Link>
    </div>)

    

    return (
        <div>
            {renderContent}
        </div>
    )
}

export default Home