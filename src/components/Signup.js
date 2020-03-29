import React , {useState , useEffect} from 'react'

function Signup (props) {
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        let user = {
            user: {
            email: email,
            password: password}
        }

        fetch("http://localhost:3001/api/v1/signup", {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then((data) => {
            if(data.logged_in) {
            props.handleLogin(data)}
            else {
                setErrors(data)
            }
            
        }

            )
    }

    useEffect(() => {
        if(props.isLoggedIn){
            props.history.push('/')
        }
    })

    return(
        <div>
            {errors ? (<div className="errors-div">{console.log(errors)}</div>) : null}
            <h1>Sign Up</h1>
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
            <p>Already a have an account? <a href="/login">Login here</a></p>
        </div>
    )
}

export default Signup