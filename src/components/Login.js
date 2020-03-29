import React , {useState , useEffect} from 'react'

function Login (props) {
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitted")

        let user = {
            session: {
            email: email,
            password: password}
        }

        

        fetch("http://localhost:3001/api/v1/login", {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => props.handleLogin(data))

    }

    useEffect(() => {
        if(props.isLoggedIn){
            props.history.push('/')
        }
    })
    

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >
                <input 
                    placeholder="Email" 
                    type="text"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}  
                />
                <input
                    placeholder="Password" 
                    type="password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} 
                />
                <input type="submit" value="Submit" />
            </form>
            <p><a href="/signup">Create a New Account</a></p>
        </div>
    )
}

export default Login