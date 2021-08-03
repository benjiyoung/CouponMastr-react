import "./AllCompanies.css";
import {useEffect, useState} from 'react';
import Company from '../../../../Models/Company'
import CompanyTemplate from "../../../../ModelTemplates/CompanyTemplate/CompanyTemplate";
import store from "../../../../Redux/Store";
import { companyDownloadAction } from "../../../../Redux/CompanyState";
import jwtAxios from "../../../../Authorization/jwtAxios";

function AllCompanies(): JSX.Element {
    const [companies, setCompanies] = useState<Company[]>([]);
    const fetchCompanies = async () => {
        try {
            const { data : companies } : { data : Company[] } = await jwtAxios.get(`/administrator/allCompanies`);
            store.dispatch(companyDownloadAction(companies));
            setCompanies(companies);
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCompanies();
    }, [])

    return (
        <div className="AllCompanies row">
			{companies.map(item => <CompanyTemplate key={item.id} company={item}/>)}
        </div>
    );
}

export default AllCompanies;

// import { Component } from "react";
// import Company from "../../../../Models/Company";
// import "./AllCompanies.css";
// import store from "../../../../Redux/Store";
// import axios from "axios";
// import { companyDownloadAction } from "../../../../Redux/CompanyState";
// import CompanyTemplate from "../../../../ModelTemplates/CompanyTemplate/CompanyTemplate";
// import jwtAxios from "../../../../Authorization/jwtAxios";
 
// interface AllCompaniesState {
//     companies : Company[];
// }
 
// class AllCompanies extends Component<{}, AllCompaniesState> {
//     public constructor(props: {}) {
//         super(props);
//         if (store.getState().companyState.companies.length===0){
//            this.fetchCompanies();
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
//             <div className="AllCompanies row">
//                 {this.state.companies.map(item => <CompanyTemplate key={item.id} company={item}/>)}
//             </div>
//         );
//     }

//     // public async componentDidMount(){
//     //     this.fetchCompanies();
//     // }
 
//     public fetchCompanies = async () => {
//         try {
//             const response = await jwtAxios.get(`/administrator/allCompanies`);
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
 
// export default AllCompanies;

// import { Component } from "react";
// import Company from "../../../../Models/Company";
// import "./AllCompaniesC.css";
// import store from "../../../../Redux/Store";
// import axios from "axios";
// import { companyDownloadAction } from "../../../../Redux/CompanyState";
// import CompanyTemplate from "../../../../ModelTemplates/CompanyTemplate/CompanyTemplate";

// interface AllCompaniesCState {
// 	companies : Company[];
// }

// class AllCompaniesC extends Component<{}, AllCompaniesCState> {

//     public constructor(props: {}) {
//         super(props);
//         this.state = {
// 			companies: []
//         };
//     }

//     public render(): JSX.Element {
//         return (
//             <div className="AllCompaniesC row">
// 				{store.getState().companyState.companies.map(item => <CompanyTemplate key={item.id} company={item}/>)}
//             </div>
//         );
//     }

//     public async componentDidMount() {
//         store.subscribe(() => {
//             this.setState({
//                 companies: store.getState().companyState.companies
//             });
//             console.log(store.getState().companyState.companies);
//         })

//         if(store.getState().companyState.companies.length === 0) {
//             console.log("fetch");
//             this.fetchCompanies()
//         } else {
//             this.setState({
//                 companies: store.getState().companyState.companies
//             })
            
//         }
//     }

//     public fetchCompanies = async () => {
//         try {
//             const response = await axios.get(`/admin/allCompanies`);
//             const myResponse : Company[] = response.data;
//             store.dispatch(companyDownloadAction(myResponse));
//             this.setState({
//                 companies : store.getState().companyState.companies
//             })
//             //console.log(this.state.companies);

//         } catch(e) {
//             console.log(e)
//         }
//     }
// }

// export default AllCompaniesC;
