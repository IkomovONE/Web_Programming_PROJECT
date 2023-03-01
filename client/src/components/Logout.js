
import Button from '@mui/material/Button';

function Logout() {

    


    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("admin");
    window.localStorage.removeItem("email");

    


    return (

        <div className="div">

            <div id="darkened">


            <h1>You logged out.</h1>
            <h2>-------------------------------------------------</h2>

            <Button  id= "home" color="inherit"  href="/">{("Return to Home")}</Button>

            




            </div>



        </div>


        



        




    )
}




export default Logout