import "./AddCompany.css";
import Company from "../../../../Models/Company";
import { useForm } from "react-hook-form";
import notify from "../../../../Services/Notify";
import { useHistory } from "react-router-dom";
import store from "../../../../Redux/Store";
import { companyAddAction } from "../../../../Redux/CompanyState";
import jwtAxios from "../../../../Authorization/jwtAxios";

function AddCompany(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<Company>();
    const history = useHistory();

    async function send(company:Company){
        try{
            const response = await jwtAxios.post<Company>("http://localhost:8080/administrator/company/add",company);
            console.log(response);
            store.dispatch(companyAddAction(company));
            notify.success("New company was added successfully!");
            history.push("/administrator/allCompanies");
        } catch {
            notify.error("There was a problem with adding this company");
        }
    }
    
    const ref={register}
    return (
        <div className="addCompany">
			<h2>Add New Company</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="text" name="name" placeholder="Company Name" ref={register({
                    required: {value:true , message:"Missing company name!"},
                    minLength: {value:2 , message:"Minimum name length is two characters!"}
                })}/>
                <span><br/>{errors.name?.message}</span>
                <br/><br/>
                <input type="email" name="email" placeholder="Company Email" ref={register({
                    required: {value:true , message:"Missing company email!"}
                })}/>
                <span><br/>{errors.email?.message}</span>
                <br/><br/>
                <input type="password" name="password" placeholder="Company Password" ref={register({
                     required: {value:true , message:"Missing company password!"}
                    })}/>
                <span><br/>{errors.password?.message}</span>
                <br/><br/>
                <button>add Company</button>
            </form>
        </div>
    );
}

export default AddCompany;

// import "./AddCompany.css";
// import Company from "../../../../Models/Company";
// import { useForm } from "react-hook-form";
// import notify from "../../../../Services/Notify";
// import { useHistory } from "react-router-dom";
// import store from "../../../../Redux/Store";
// import { companyAddAction } from "../../../../Redux/CompanyState";
// import jwtAxios from "../../../../Authorization/jwtAxios";

// function AddCompany(): JSX.Element {
//     const {register, handleSubmit, errors} = useForm<Company>();
//     const history = useHistory();

//     async function send(company:Company){
//         try{
//             const response = await jwtAxios.post<Company>("http://localhost:8080/administrator/company/add",company);
//             store.dispatch(companyAddAction(company));
//             notify.success("New company was added successfully!");
//             history.push("/administrator/allCompanies");
//         } catch {
//             notify.error("There was a problem with adding this company");
//         }
//     }
    
//     const ref={register}
//     return (
//         <div className="addCompany">
// 			<h2>Add New Company</h2>
//             <form onSubmit={handleSubmit(send)}>
//                 <input type="text" name="name" placeholder="Company Name" ref={register({
//                     required: {value:true , message:"Missing company name!"},
//                     minLength: {value:2 , message:"Minimum name length is two characters!"}
//                 })}/>
//                 <span><br/>{errors.name?.message}</span>
//                 <br/><br/>
//                 <input type="email" name="email" placeholder="Company Email" ref={register({
//                     required: {value:true , message:"Missing company email!"}
//                 })}/>
//                 <span><br/>{errors.email?.message}</span>
//                 <br/><br/>
//                 <input type="password" name="password" placeholder="Company Password" ref={register({
//                      required: {value:true , message:"Missing company password!"}
//                     })}/>
//                 <span><br/>{errors.password?.message}</span>
//                 <br/><br/>
//                 <button>Add Company</button>
//             </form>
//         </div>
//     );
// }

// export default AddCompany;
