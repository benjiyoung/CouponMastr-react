import Company from "../../../../Models/Company";
import "./UpdateCompany.css";
import {useEffect, useState} from 'react';
import notify from "../../../../Services/Notify";
import store from "../../../../Redux/Store";
import { companyUpdateAction } from "../../../../Redux/CompanyState";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../../Authorization/jwtAxios";

interface UpdateCompanyProps {
   id:string;
}

function UpdateCompany(props: UpdateCompanyProps): JSX.Element {
    const companyId = parseInt(props.id);
    const updateCompanyArray = store.getState().companyState.companies.filter(function (item){return item.id === companyId});
    const updateCompany = updateCompanyArray[0];

    const [updatedEmail, setUpdatedEmail] = useState<string>(updateCompany.email);
    const [updatedPassword, setUpdatedPassword] = useState<string>(updateCompany.password);
      
    const {register, handleSubmit, errors} = useForm<Company>();
    const history = useHistory();
    async function send(company:Company){
        company.id = companyId;
        company.name=updateCompany.name;
        company.email=updatedEmail;
        company.password=updatedPassword;
        company.coupons=updateCompany.coupons;
        try{  
            console.log(company);
            await jwtAxios.put<Company>("http://localhost:8080/administrator/company/update",company);
            store.dispatch(companyUpdateAction(company));
            notify.success("Company update successfully!");
            history.push("/administrator/allCompanies");
        } catch {
            notify.error("There was a problem with updating this company");
        }
    }

    useEffect(()=>{ 
    }, [])
    
    const ref={register}
    return (
        <div className="UpdateCompany">
			<h2>Update Company:</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="text" name="id" value={parseInt(props.id)} ref={register({
                })} disabled/>
                <br/><br/>
                <input type="text" name="name" value={updateCompany.name} ref={register({
                })} disabled/>
                <br/><br/>
                <input type="email" name="email" defaultValue={updateCompany.email} onChange={e =>setUpdatedEmail(e.target.value)} ref={register({
                required: {value:true , message:"Missing company email!"}
                })}/>
                <span><br/>{errors.email?.message}</span>
                <br/><br/>
                <input type="password" name="password" defaultValue={updateCompany.password} onChange={e =>setUpdatedPassword(e.target.value)} ref={register({
                required: {value:true , message:"Missing company password!"}
                })}/>
                <span><br/>{errors.password?.message}</span>
                <br/><br/>
                <button>Update</button>
            </form>
        </div>
    );
}

 export default UpdateCompany;

 // interface UpdateCompanyState {
//   companyId: number;
//   name?: string;
//   email?: string;
//   password?: string;
//   coupons?: Coupon[];
// }
 
// interface updateCompanyProps{
//   updateId:string
// }

// class UpdateCompany extends Component<updateCompanyProps, UpdateCompanyState> {
//   public constructor(props: updateCompanyProps) {
//     super(props);
//     this.state = {
//       companyId: parseInt(this.props.updateId),
//       name: "",
//       email: "",
//       password: "",
//       coupons: []
//     };
//   }

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
//       const company = new Company();
//       company.id=this.state.companyId;
//       company.name = this.state.name;
//       company.email = this.state.email;
//       company.password = this.state.password;
//       company.coupons = this.state.coupons;
//     await jwtAxios.put("http://localhost:8080/administrator/company/update", company);
//       store.dispatch(companyUpdateAction(company));
//       notify.success("Company update successfully!");
      
//     } catch {
//       notify.error("There was a problem with updating this company");
//     }
//   };
 
//   async componentDidMount(){
//     const companyId = parseInt(this.props.updateId);
//     const reduxCompany = store.getState().companyState.companies.filter(function (item){return item.id==companyId});
//     const updateCompany = reduxCompany[0];
//     this.setState({
//       companyId: updateCompany.id,
//       name: updateCompany.name,
//       email: updateCompany.email,
//       password: updateCompany.password,
//       coupons: updateCompany.coupons
//     });
//   }
 
//   public render(): JSX.Element {
//     return (
//       <div className="UpdateCompany">
//         <h4>Update Company</h4>
//         <input type="text" value={this.state.name} disabled/>
//         <br/><br/>
//         <input type="email" value={this.state.email} onChange={this.setEmail}/>
//         <br/><br/>
//         <input type="password" value={this.state.password} onChange={this.setPassword}/>
//         <br/><br/>
//         <button onClick={this.updateData}>Update</button>
//       </div>
//     );
//   }
// }
 
// export default UpdateCompany;