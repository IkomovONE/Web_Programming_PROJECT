import * as React from 'react';
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();


    const [target, SetTarget] = React.useState(null);



    const CheckUser= (event) => {

        event.preventDefault();

        var email= String(event.target[0].value);

        var pass= String(event.target[1].value);


        fetch("/api/user/login", {
            method: "POST",

            body: JSON.stringify({
                email: email,
                password: pass
            }),
                
         

        }).then(response => {
                
            return response.json()})
        .then(json => {

            if (!json.success) {
                
                if (json.msg= "Password incorrect") {
                    alert("Wrong password")
                }

                else if (json.msg= "User not found!") {
                    alert("Invalid credentials!")
                    
                }
                else {
                    alert("Something else is wrong, error")
                }
            }

            else {

                window.localStorage.setItem("token", json.token);
                
                
                

                navigate("/");

                window.location.reload();

            }

            


        })

        

        


        

        


    
    }





    return (

        <div className="div">

            <div id="darkened">


            <h1>Log in to your account, please!</h1>
            <h2>-------------------------------------------------</h2>


            <form onSubmit={CheckUser}>
        
                <label for="email" id="label"> E-mail:</label>
                
                <input type="text" id="email" name="email"></input>

                <p></p>
                
                <label for="password" id="label"> Password: </label>
                
                <input type="password" id="password" name="password"></input>

                <p></p>

                <button type="submit" id="sub" > Log in </button>

            </form>




            </div>



        </div>


        



        




    )
}







export default Login