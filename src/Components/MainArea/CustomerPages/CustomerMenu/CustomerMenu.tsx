import "./CustomerMenu.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Customer from "../../../../Models/Customer";
import store from "../../../../Redux/Store";
import jwtAxios from "../../../../Authorization/jwtAxios";
import { customerDownloadAction } from "../../../../Redux/CustomerState";

function CustomerMenu(): JSX.Element {
    const fetchCustomers = async () => {
        try {
            const { data : customers } : { data : Customer[] } = await jwtAxios.get(`/administrator/allCustomers`);
            store.dispatch(customerDownloadAction(customers));
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    return (
        <div className="CustomerMenu">
			<nav>
                <NavLink exact to="/customer/details">Customer Details</NavLink> <br/><br/>
                <NavLink exact to="/customer/all">All Purchased Coupons</NavLink> <br/><br/>
                <NavLink exact to="/customer/maxPrice">Purchased coupons by max price</NavLink> <br/><br/>
                <NavLink exact to="/customer/categoryMenu">Purchased coupons by category</NavLink> <br/><br/>
                <NavLink exact to="/customer/update">Update your account details</NavLink> <br/><br/>
            </nav>
        </div>
    );
}

export default CustomerMenu;
