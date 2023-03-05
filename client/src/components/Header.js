import { AppBar, Toolbar } from '@mui/material'
import * as React from 'react';
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Menu from '@mui/material/Menu';




import {Link} from 'react-router-dom'
import {Link as RouterLink} from "react-router-dom"


//importing necessary libraries


const Header= () => {

  const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    //setting language translation function


  const [auth, setAuth] = React.useState(false);

  const [user, setUser] = React.useState("");

  //setting necessary variables


  const CheckLogin = () => {

    //function that checks login by sending request to the server, with token

    var token= window.localStorage.getItem("token")

    //getting token

    fetch("/api/token/check", {

      //sending post request to check if user is logged in

      
      method: "POST",

      headers: {
        "authorization": token
      },

      body: null,
      

    }).then(response => {
                
      return response.json()})
  .then(json => {

    if (json.message== "VERIFIED") {

      setAuth(true);

      setUser(json.username);

      console.log(auth);

      //setting auth state as true and user info

    }

    else {
      setAuth(false);

      //setting auth as false.
    }



  })
  };

  //auth is used for the appearing buttons!





    

    
    

    const [anchorEl, setAnchorEl] = React.useState(null);


    
    
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      //functions taken from the official Materialize UI website. They handle manu on the user profile button


      CheckLogin();

      //executing function


      

    


    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="bar" position="static" >
                <Toolbar className='toolbar'>

                

                <Typography  className="typo"  variant="h6"  component="div" >Code snippets!</Typography>

                <div id= "divider">|</div>


                <Button  color="inherit"  component={Link} to="/">{t("Home")}</Button>

                

                <Button   color="inherit"  component={Link} to="/about">{t("About")}</Button>

                {auth && <Button   color="inherit"  component={Link} to="/newpost">{t("New Post")}</Button>}

                <div className= "about"></div>

                <Button id= "fi" color="inherit" onClick={()=> changeLanguage("fi")}>FI</Button> 
                
                <Button id= "en" color="inherit" onClick={()=> changeLanguage("en")}>EN</Button>

                <div id= "divider">|</div>

                


                <div>
                    <IconButton className="avatar"  size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu

                sx={{ mt: '45px'}}
                
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {!auth &&<MenuItem  onClick={handleClose} component={Link} to="/login">{t("Log in")}</MenuItem>}
                {!auth &&<MenuItem  onClick={handleClose} component={Link} to="/register">{t("Register")}</MenuItem>}
                {auth &&<MenuItem  onClick={handleClose} component={Link} to={"/profile/"+user} >{t("My profile")}</MenuItem>}
                {auth &&<MenuItem  onClick={handleClose} component={Link} to="/logout">{t("Log out")}</MenuItem>}
              </Menu>
            </div>

                
        


                </Toolbar>
                
                
            </AppBar>
        </Box>
         


    
    

      
    


    )


    //returning header object. auth is used here to determine whether user is logged in and then either show buttons or not.



}


export default Header