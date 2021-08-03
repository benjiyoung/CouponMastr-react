import "./AdminMenu.css";
import { NavLink } from "react-router-dom";

function AdminMenu(): JSX.Element {
    return (
        <div className="AdminMenu">
			<nav>
                <NavLink exact to="/administrator/allCompanies">All Companies</NavLink> <br/><br/>
                <NavLink exact to="/administrator/allCustomers">All Customers</NavLink> <br/><br/>
                <NavLink exact to="/administrator/company/add">Add New Company</NavLink> <br/><br/>
            </nav>
        </div>
    );
}

export default AdminMenu;
