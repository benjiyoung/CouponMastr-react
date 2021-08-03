import "./CompanyTemplate.css";
import Company from "../../Models/Company";
import couponImage from "../../Assets/cf-256x256.png";
import notify from "../../Services/Notify";
import store from "../../Redux/Store";
import { companyDeleteAction } from "../../Redux/CompanyState";
import { useHistory } from "react-router-dom";
import jwtAxios from "../../Authorization/jwtAxios";

interface CompanyTemplateProps {
	company : Company;
}

function CompanyTemplate(props: CompanyTemplateProps): JSX.Element {
    const history = useHistory();
    const deleteCompany = async () => {
        try {
            await jwtAxios.delete(`/administrator/company/delete/${props.company.id}`);
            notify.success("The company was deleted successfully!");
            store.dispatch(companyDeleteAction(props.company))
            history.push("/administrator/allCompanies");
        } catch {
            notify.error("There was a problem with deleting the company!");
        }
    }

    const editCompany = () => {
        history.push("/administrator/company/update/"+props.company.id);
    }

    return (
        <div className="CompanyTemplate">
			<div className="companyCard column">
                <img src={couponImage} alt="Company" />
                <h1>{props.company.name}</h1>
                <p className="companyEmail">{props.company.email}</p>
                <p>id: {props.company.id} </p>
                <button onClick={editCompany}>Edit details</button>
                <button onClick={deleteCompany}>Delete</button>
                </div>
        </div>
    );
}

export default CompanyTemplate;
