import "./AllCustomers.css";
import {useEffect, useState} from 'react';
import Customer from '../../../../Models/Customer'
import CustomerTemplate from "../../../../ModelTemplates/CustomerTemplate/CustomerTemplate";
import store from "../../../../Redux/Store";
import { customerDownloadAction } from "../../../../Redux/CustomerState";
import jwtAxios from "../../../../Authorization/jwtAxios";

function AllCustomers(): JSX.Element {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const fetchCustomers = async () => {
        try {
            const { data : customers } : { data : Customer[] } = await jwtAxios.get(`/administrator/allCustomers`);
            store.dispatch(customerDownloadAction(customers));
            setCustomers(customers);
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])
    
    return (
        <div className="AllCustomers row">
			{customers.map(item => <CustomerTemplate key={item.id} customer={item}/>)}
        </div>
    );
}

export default AllCustomers;

// import { Component } from "react";
// import Customer from "../../../../Models/Customer";
// import "./AllCustomers.css";
// import store from "../../../../Redux/Store";
// import axios from "axios";
// import { customerDownloadAction } from "../../../../Redux/CustomerState";
// import CustomerTemplate from "../../../../ModelTemplates/CustomerTemplate/CustomerTemplate";
// import jwtAxios from "../../../../Authorization/jwtAxios";
 
// interface AllCustomersState {
//     customers : Customer[];
// }
 
// class AllCustomers extends Component<{}, AllCustomersState> {
//     public constructor(props: {}) {
//         super(props);
//         if (store.getState().customerState.customers.length===0){
//             this.fetchCustomers();
//         }
//         this.state = {
//             customers: store.getState().customerState.customers
//         };
//         store.subscribe(() => {
//             this.setState({
//                 customers: store.getState().customerState.customers
//             });
//         })
//     }
 
//     public render(): JSX.Element {
//         return (
//             <div className="AllCustomers row">
//                 {this.state.customers.map(item => <CustomerTemplate key={item.id} customer={item}/>)}
//             </div>
//         );
//     }

 
//     public fetchCustomers = async () => {
//         try {
//             const response = await jwtAxios.get(`/administrator/allCustomers`);
//             const myResponse : Customer[] = response.data;
//             store.dispatch(customerDownloadAction(myResponse));
//             this.setState({
//                 customers : store.getState().customerState.customers
//             }) 
//         } catch(e) {
//             console.log(e)
//         }
//     }
// }    
 
// export default AllCustomers;
