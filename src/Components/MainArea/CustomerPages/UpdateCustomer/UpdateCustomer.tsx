import Customer from "../../../../Models/Customer";
import "./UpdateCustomer.css";
import { useEffect, useState} from 'react';
import notify from "../../../../Services/Notify";
import store from "../../../../Redux/Store";
import { customerUpdateAction } from "../../../../Redux/CustomerState";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import jwtAxios from "../../../../Authorization/jwtAxios";

function UpdateCustomer(props: {}): JSX.Element {
    const customerEmail=store.getState().authState.user.email;
    const updateCustomerArray = store.getState().customerState.customers.filter(function (item){return item.email === customerEmail});
    const updateCustomer = updateCustomerArray[0];

    const [updatedEmail, setUpdatedEmail] = useState<string>(updateCustomer.email);
    const [updatedPassword, setUpdatedPassword] = useState<string>(updateCustomer.password);
    const [updatedFirstName, setUpdatedFirstName] = useState<string>(updateCustomer.firstName);
    const [updatedLastName, setUpdatedLastName] = useState<string>(updateCustomer.lastName);   
    
    const {register, handleSubmit, errors} = useForm<Customer>();
    const history = useHistory();
    async function send(customer:Customer){
       customer.id = updateCustomer.id;
       customer.firstName=updatedFirstName;
       customer.lastName=updatedLastName;
       customer.email=updatedEmail;
       customer.password=updatedPassword;
       customer.coupons=updateCustomer.coupons;
       try{  
           await jwtAxios.put<Customer>("http://localhost:8080/administrator/customer/update",customer);
           store.dispatch(customerUpdateAction(customer));
           notify.success("Customer update successfully!");
           history.push("/customer/details");
       } catch {
           notify.error("There was a problem with updating the details!");
       }
   }

   useEffect(()=>{ 
   }, [])
   
   const ref={register}
   return (
       <div className="UpdateCustomer">
     <h2>Update Customer</h2>
           <form onSubmit={handleSubmit(send)}>
               <input type="text" name="id" value={updateCustomer.id} ref={register({
               })} disabled/>
               <br/><br/>
               <input type="text" name="firstName" defaultValue={updateCustomer.firstName} onChange={e => setUpdatedFirstName(e.target.value)} ref={register({
                required: {value:true , message:"Missing customer first name!"}
               })} /><br/><br/>
               <input type="text" name="lastName" defaultValue={updateCustomer.lastName} onChange={e => setUpdatedLastName(e.target.value)} ref={register({
                required: {value:true , message:"Missing customer last name!"}
               })} />
               <br/><br/>
               <input type="email" name="email" defaultValue={updateCustomer.email} onChange={e =>setUpdatedEmail(e.target.value)} ref={register({
               required: {value:true , message:"Missing customer email!"}
               })}/>
               <span><br/>{errors.email?.message}</span>
               <br/><br/>
               <input type="password" name="password" defaultValue={updateCustomer.password} onChange={e =>setUpdatedPassword(e.target.value)} ref={register({
               required: {value:true , message:"Missing customer password!"}
               })}/>
               <span><br/>{errors.password?.message}</span>
               <br/><br/>
               <button>Update</button>
           </form>
       </div>
   );
}

export default UpdateCustomer;

// interface UpdateCustomerState {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email?: string;
//   password?: string;
//   coupons?: Coupon[];
// }
 
// interface updateCustomerProps{
//   id: string
// }
 
// class UpdateCustomer extends Component<updateCustomerProps, UpdateCustomerState> {
//   public constructor(props: updateCustomerProps) {
//     super(props);
//     this.state = {
//       id: this.props.id,
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       coupons: []
//     };
//   }

//   private setFirstName = (args: SyntheticEvent) => {
//     const value = (args.target as HTMLInputElement).value;
//     this.setState({
//       firstName: value,
//     });
//   };

//   private setLastName = (args: SyntheticEvent) => {
//     const value = (args.target as HTMLInputElement).value;
//     this.setState({
//       lastName: value,
//     });
//   };

//   private setEmail = (args: SyntheticEvent) => {
//     const value = (args.target as HTMLInputElement).value;
//     this.setState({
//       email: value,
//     });
//   };

//   private setPassword = (args: SyntheticEvent) => {
//     const value = (args.target as HTMLInputElement).value;
//     this.setState({
//       password: value,
//     });
//   };
 
//   private updateData = async () => {
//     try{
//       const customer = new Customer();
//       customer.id=parseInt(this.state.id);
//       customer.firstName = this.state.firstName;
//       customer.lastName = this.state.lastName;
//       customer.email = this.state.email;
//       customer.password = this.state.password;
//       customer.coupons = this.state.coupons;
//       console.log(customer)
//         await axios.put("http://localhost:8080/admin/customer/update", customer);
//         store.dispatch(customerUpdateAction(customer));
//         notify.success("Customer update successfully!");
//     } catch {
//       notify.error("There was a problem with updating this customer");
//     }
//   };
 
//   async componentDidMount(){
//     const id = this.props.id;
//     const reduxCustomer = store.getState().customerState.customers.filter(function (item){return item.id== +id});
//     const updateCustomer = reduxCustomer[0];
//     console.log(updateCustomer);
//     this.setState({
//       id: updateCustomer.id+"",
//       firstName: updateCustomer.firstName,
//       lastName: updateCustomer.lastName,
//       email: updateCustomer.email,
//       password: updateCustomer.password,
//       coupons: updateCustomer.coupons
//     });
//   }
 
//   public render(): JSX.Element {
//     return (
//       <div className="UpdateCustomer">
//         <h4>Update Customer</h4>
//         <input type="text" value={this.state.firstName}  onChange={this.setFirstName}/>
//         <br/><br/>
//         <input type="text" value={this.state.lastName} onChange={this.setLastName}/>
//         <br/><br/>
//         <input type="email" value={this.state.email} onChange={this.setEmail}/>
//         <br/><br/>
//         <input type="password" value={this.state.password} onChange={this.setPassword} />
//         <br/><br/>
//         <button onClick={this.updateData}>Update</button>
//       </div>
//     );
//   }
// }
 
// export default UpdateCustomer;