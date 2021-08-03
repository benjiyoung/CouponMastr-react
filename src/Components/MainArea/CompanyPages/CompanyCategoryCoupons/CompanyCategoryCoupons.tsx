import "./CompanyCategoryCoupons.css";
import CouponForCompany from "../../../../ModelTemplates/CouponForCompany/CouponForCompany";
import store from "../../../../Redux/Store";
import {useParams} from "react-router-dom";

function CompanyCategoryCoupons(): JSX.Element {
    //@ts-ignore -> useParams returns an object
    const {category} = useParams();
    const companyEmail = store.getState().authState.user.email;
    const loggedCompanyArray = store.getState().companyState.companies.filter(function(item){return item.email === companyEmail});
    const loggedCompany = loggedCompanyArray[0];
    const coupons = loggedCompany.coupons;
    const categoryCoupons = coupons.filter(function(item) {return item.category === category});

    return (
        <div className="CompanyCategoryCoupons row">        
            {categoryCoupons.map(item => <CouponForCompany key={item.id} coupon={item}/>)}
        </div>
    );
}

export default CompanyCategoryCoupons;

// interface CompanyCategoryCouponsState {
//     coupons : Coupon[];
// }

// interface CompanyCategoryCouponsProps{
//     category: string
// }
 
// class CompanyCategoryCoupons extends Component<CompanyCategoryCouponsProps, CompanyCategoryCouponsState> {
//     public constructor(props: CompanyCategoryCouponsProps) {
//         super(props);
//         if (store.getState().couponState.coupons.length===0){
//             this.fetchCoupons();
//         }
//         this.state = {
//             coupons: store.getState().couponState.coupons
//         };
//         store.subscribe(() => {
//             this.setState({
//                 coupons: store.getState().couponState.coupons
//             });
//         })
//     }
 
//     public render(): JSX.Element {
//         const couponCategory = this.props.category;
//         const categoryCoupons = store.getState().couponState.coupons.filter(function (item){return item.category == couponCategory ;{/* && item.companyID == LOGGED IN COMPANY ID */}})
//         return (
//             <div className="AllCoupons row">
//                 {categoryCoupons.map(item => <CouponForCompany key={item.id} coupon={item}/>)}
//             </div>
//         );
//     }
 
//     public fetchCoupons = async () => {
//         try {
//             const response = await axios.get(`/company/all`);
//             const myResponse : Coupon[] = response.data;
//             store.dispatch(couponDownloadAction(myResponse));
//             this.setState({
//                 coupons : store.getState().couponState.coupons
//             }) 
//         } catch(e) {
//             console.log(e)
//         }
//     }
// }
 
// export default CompanyCategoryCoupons;


// interface CompanyCategoryCouponsProps{
//     category: string
// }