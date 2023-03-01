import { AppBar, Toolbar } from '@mui/material'
import * as React from 'react';
import { Button } from '@mui/material'
import { Box } from '@mui/material'

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


const Header= () => {


    

    
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);


    
    
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    


    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="bar" position="static" >
                <Toolbar className='toolbar'>

                

                <Typography  className="typo"  variant="h6"  component="div" >Code snippets!</Typography>

                <div id= "divider">|</div>


                <Button  color="inherit"  component={Link} to="/">{("Home")}</Button>

                

                <Button   color="inherit"  component={Link} to="/about">{("About")}</Button>

                <div className= "about"></div>

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
                <MenuItem  component={Link} to="/login">Log in</MenuItem>
                <MenuItem  component={Link} to="/register">Register</MenuItem>
              </Menu>
            </div>

                
        


                </Toolbar>
                
                
            </AppBar>
        </Box>
         


    
    

      
    


    )



}


export default Header