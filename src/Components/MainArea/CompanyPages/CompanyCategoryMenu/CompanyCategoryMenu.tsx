import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import jwtAxios from "../../../../Authorization/jwtAxios";
import Coupon from "../../../../Models/Coupon";
import { companyUpdateAction } from "../../../../Redux/CompanyState";
import store from "../../../../Redux/Store";
import "./CompanyCategoryMenu.css";

function CompanyCategoryMenu(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const fetchCoupons = async () => {
        try {
            const { data : coupons } : { data : Coupon[] } = await jwtAxios.get(`/company/all`);
            const companyEmail = store.getState().authState.user.email;
            const loggedCompanyArray = store.getState().companyState.companies.filter(function(item){return item.email === companyEmail});
            const loggedCompany = loggedCompanyArray[0];
            loggedCompany.coupons = coupons;
            store.dispatch(companyUpdateAction(loggedCompany));
            setCoupons(coupons);
        } catch(e) {
            console.log(e)
        }
    }
    
    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <div className="CompanyCategoryMenu">
			<nav>
                <h2> Choose a category</h2>
                <NavLink exact to="/company/category/FOOD"> Food</NavLink> <br/><br/>
                <NavLink exact to="/company/category/VACATION"> Vacation</NavLink> <br/><br/>
                <NavLink exact to="/company/category/BEAUTY"> Beauty</NavLink> <br/><br/>
                <NavLink exact to="/company/category/HOME"> Home</NavLink> <br/><br/>
                <NavLink exact to="/company/category/ELECTRICITY"> Electricity</NavLink> <br/><br/>
                <NavLink exact to="/company/category/FASHION"> Fashion</NavLink> <br/><br/>
                <NavLink exact to="/company/category/SPORT"> Sport</NavLink> <br/><br/>
                <NavLink exact to="/company/category/PETS"> Pets</NavLink> <br/><br/>
            </nav>
        </div>
    );
}

export default CompanyCategoryMenu;
