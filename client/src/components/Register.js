import * as React from 'react';
import { useNavigate } from "react-router-dom";

function Register() {


    const navigate = useNavigate();


    const [target, SetTarget] = React.useState(null);



    const CheckUser= (event) => {

        event.preventDefault();

        var username= String(event.target[0].value);

        var email= String(event.target[1].value);

        var pass= String(event.target[2].value);


        fetch("/api/user/register", {
            method: "POST",

            body: JSON.stringify({
                username: username,
                email: email,
                password: pass
            }),
                
         

        }).then(response => {
                
            return response.json()})
        .then(json => {

            if (!json.success) {
                
                if (json.msg= "User already exists!") {
                    alert("User already exists!")
                }

                
                else {
                    alert("Something is wrong, error")
                }
            }

            else {

                

                navigate("/login");

                window.location.reload();

            }

            


        })

        

        


        

        


    
    }


    return (

        <div className="div">

            <div id="darkened">


            <h1>Register in my network, please!</h1>
            <h2>-------------------------------------------------</h2>


            <form onSubmit={CheckUser}>

                <label for="username" id="label"> New UserName:</label>
                
                <input type="text" id="username" name="username"></input>

                <p></p>
        
                <label for="email" id="label"> New E-mail:</label>
                
                <input type="text" id="email" name="email"></input>

                <p></p>
                
                <label for="password" id="label"> New Password: </label>
                
                <input type="password" id="password" name="password"></input>

                <p></p>

                <button type="submit" id="sub"> Register </button>

            </form>




            </div>



        </div>


        



        




    )
}




export default Register