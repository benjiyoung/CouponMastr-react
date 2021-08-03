import "./Main.css";
import {Switch, Route, Redirect} from "react-router-dom";
import CategoryPage from '../GuestPages/CategoryPage/CategoryPage';
import Login from "../Login/Login";
import CustomerDetailsPage from "../CustomerPages/CustomerDetailsPage/CustomerDetailsPage";
import CustomerCoupons from "../CustomerPages/CustomerCoupons/CustomerCoupons";
import CustomerCategoryCoupons from "../CustomerPages/CustomerCategoryCoupons/CustomerCategoryCoupons";
import CompanyAllCouponsPage from "../CompanyPages/CompanyAllCoupons/CompanyAllCoupons";
import CompanyCategoryCoupons from "../CompanyPages/CompanyCategoryCoupons/CompanyCategoryCoupons";
import AddCompany from "../AdminPages/AddCompany/AddCompany";
import AllCustomers from "../AdminPages/AllCustomers/AllCustomers";
import Register from "../GuestPages/Register/Register";
import AddCoupon from "../CompanyPages/AddCoupon/AddCoupon";
import UpdateCoupon from "../CompanyPages/UpdateCoupon/UpdateCoupon";
import AdminMenu from "../AdminPages/AdminMenu/AdminMenu";
import HomePage from "../GuestPages/HomePage/HomePage";
import AllCompanies from "../AdminPages/AllCompanies/AllCompanies";
import UpdateCustomer from "../CustomerPages/UpdateCustomer/UpdateCustomer";
import UpdateCompany from "../AdminPages/UpdateCompany/UpdateCompany";
import CompanyDetails from "../CompanyPages/CompanyDetails/CompanyDetails";
import CompanyMenu from "../CompanyPages/CompanyMenu/CompanyMenu";
import CustomerMenu from "../CustomerPages/CustomerMenu/CustomerMenu";
import CategoryMenu from "../CompanyPages/CompanyCategoryMenu/CompanyCategoryMenu";
import CustomerCategoryMenu from "../CustomerPages/CustomerCategoryMenu/CustomerCategoryMenu";
import CompanyMaxPrice from "../CompanyPages/CompanyMaxPrice/CompanyMaxPrice";
import CustomerMaxPrice from "../CustomerPages/CustomerMaxPrice/CustomerMaxPrice";
import pageNotFound from "../../../Assets/404.png";

function Main(): JSX.Element {
    // var userType = "";
    // if (store.getState().authState.user != null) {
    //     userType = store.getState().authState.user.userType
    // }
    // console.log(userType);
    // const isAdmin:boolean = store.getState().authState.user.userType == "ADMINISTRATOR";
    // const isCompany:boolean = store.getState().authState.user.userType == "COMPANY";
    // const isCustomer:boolean = store.getState().authState.user.userType == "CUSTOMER";
    // if (userType == "ADMINISTRATOR") {
    //     return (
    //         <div>

    //         </div>
    //     )
    // }
    
    return (
        <div className="Main">
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/home" exact component={HomePage} />
                    <Route path="/category/:categoryName" exact component={CategoryPage} />

                    <Route path="/administrator" exact component={AdminMenu} />
                    <Route path="/administrator/company/add" exact component={AddCompany} />
                    <Route path="/administrator/company/update/:id" render={(props)=><UpdateCompany id={props.match.params.id}/>}/>
                    <Route path="/administrator/allCompanies" exact component={AllCompanies} />
                    <Route path="/administrator/allCustomers" exact component={AllCustomers} />
                    
                    <Route path="/company" exact component={CompanyMenu} />
                    <Route path="/company/category/:category" exact component={CompanyCategoryCoupons}/>
                    <Route path="/company/all" exact component={CompanyAllCouponsPage} />
                    <Route path="/company/add" exact component={AddCoupon} />
                    <Route path="/company/update/:couponID" render={(props)=><UpdateCoupon id={props.match.params.couponID}/>}/>
                    <Route path="/company/maxPrice" exact component={CompanyMaxPrice} />
                    <Route path="/company/details" exact component={CompanyDetails} />
                    <Route path="/company/categoryMenu" exact component ={CategoryMenu}/>

                    <Route path="/customer" exact component={CustomerMenu} />
                    <Route path="/customer/details" exact component={CustomerDetailsPage} />
                    <Route path="/customer/all" exact component={CustomerCoupons} />
                    <Route path="/customer/category/:category" exact component={CustomerCategoryCoupons} />
                    <Route path="/customer/categoryMenu" exact component={CustomerCategoryMenu} />
                    <Route path="/customer/maxPrice" exact component={CustomerMaxPrice} />
                    <Route path="/customer/update" exact component={UpdateCustomer} />

                    <Redirect from="/" to="/home" />
                    <Route component={() =><div><img src={pageNotFound} style={{height:"500px", paddingTop:"50px"}} alt="Page Not Found"/></div>}/> MUST BE LAST !!!!!!!

                </Switch>
        </div>
    );
}

export default Main;


