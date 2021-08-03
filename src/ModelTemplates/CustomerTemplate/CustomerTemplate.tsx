import "./CustomerTemplate.css";
import couponImage from "../../Assets/cf-256x256.png";
import Customer from "../../Models/Customer";
import notify from "../../Services/Notify";
import store from "../../Redux/Store";
import { customerDeleteAction } from "../../Redux/CustomerState";
import { useHistory } from "react-router-dom";
import jwtAxios from "../../Authorization/jwtAxios";

interface CustomerTemplateProps {
	customer : Customer;
}

function CustomerTemplate(props:CustomerTemplateProps): JSX.Element {
    const history = useHistory();

    const deleteCustomer = async () => {
        try {
            await jwtAxios.delete(`/administrator/customer/delete/${props.customer.id}`);
            notify.success("The customer was deleted successfully!");
            store.dispatch(customerDeleteAction(props.customer))
            history.push("/administrator/allCustomers");
        } catch {
            notify.error("There was a problem with deleting the customer!");
        }
    }

    const editCustomer = () => {
        history.push("/administrator/customer/update/"+props.customer.id);
    }

    return (
        <div className="CustomerTemplate">
			<div className="customerCard column">
                <img src={couponImage} alt="Customer" />
                <h1>{props.customer.firstName} {props.customer.lastName}</h1>
                <p className="customerEmail">{props.customer.email}</p>
                <p>id: {props.customer.id} </p>
                <button onClick={editCustomer}>Edit details</button>
                <button onClick={deleteCustomer}>Delete</button>
                </div>
        </div>
    );
}

export default CustomerTemplate;
