import Company from "../../../../Models/Company";
import "./CompanyDetails.css";
import { useEffect, useState} from 'react';
import CompanyTemplate from "../../../../ModelTemplates/CompanyTemplate/CompanyTemplate";
import jwtAxios from "../../../../Authorization/jwtAxios";

function CompanyDetails(): JSX.Element {
    const [company, setCompany] = useState<Company | undefined>();
    const fetchCompany = async () => {
        try {
            const { data : company } : { data : Company } = await jwtAxios.get(`/company/details`);
            setCompany(company);
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCompany();
    },)

    return !company? null : (
        <div className="CompanyDetailsPage row">
            <CompanyTemplate company={company}/>
        </div>
    );
}

export default CompanyDetails;

// interface CompanyDetailsState {
//     companies : Company[];
// }
 
// class CompanyDetails extends Component<{}, CompanyDetailsState> {
//     public constructor(props: {}) {
//         super(props);
//         if (store.getState().companyState.companies.length===0){
//             this.fetchCompanies();
//         }
//         this.state = {
//             companies: store.getState().companyState.companies
//         };
//         store.subscribe(() => {
//             this.setState({
//                 companies: store.getState().companyState.companies
//             });
//         })
//     }
 
//     public render(): JSX.Element {
//         return (
//             <div className="AllCompaniesC row">
//                 {this.state.companies.map(item => <CompanyTemplate key={item.id} company={item}/>)}
//             </div>
//         );
//     }
 
//     public fetchCompanies = async () => {
//         try {
//             const response = await axios.get(`/admin/allCompanies`);
//             const myResponse : Company[] = response.data;
//             store.dispatch(companyDownloadAction(myResponse));
//             this.setState({
//                 companies : store.getState().companyState.companies
//             }) 
//         } catch(e) {
//             console.log(e)
//         }
//     }
// }
 
// export default CompanyDetails;