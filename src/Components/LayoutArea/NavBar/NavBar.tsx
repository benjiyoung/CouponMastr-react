import './NavBar.css';
import logoImage from "../../../Assets/Coupon-off-Background-PNG-Image.png"
import {Toolbar, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {NavLink} from 'react-router-dom';

const styles = makeStyles({
    bar:{
        paddingTop: "1.15rem",
        backgroundColor: "#fff",
        ['@media (max-width:780px)']: { 
           flexDirection: "column"
          },
          position: "sticky",
          color: "rgba(0, 0, 0, 0.87)"
    },
    logo: {
        width: "10%", 
        position: "relative",
        padding: "5px",
        display: "flex",
        ['@media (max-width:400px)']: { 
           display: "none"
           },
    },
    menuItem: {
        cursor: "pointer",
        flexGrow: 1,
        "&:hover": {
            color:  "#4f25c8"
        },
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    }
})

const menuItems = ["Food", "Vacation", "Beauty", "Home", "Electricity", "Fashion", "Sport", "Pets"]

function NavBar(): JSX.Element {
    const classes = styles()
    return (
        <div className="NavBar">
            <NavLink to="/home" exact>
                <img src={logoImage} className={classes.logo} alt="logo"/>
            </NavLink>
			<Toolbar className={classes.bar}>
                {
                    menuItems.map(item => (
                            <Typography variant="h6" className={classes.menuItem}>
                                <NavLink activeStyle={{color: 'red'}} to={`/category/${item.toUpperCase()}`}> 
                                    {item}
                                </NavLink>
                            </Typography>
                    ))
                }
            </Toolbar>
        </div>
    );
}

export default NavBar;
