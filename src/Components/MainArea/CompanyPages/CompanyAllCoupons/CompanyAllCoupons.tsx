import "./CompanyAllCoupons.css";
import { useEffect, useState } from "react";
import Coupon from '../../../../Models/Coupon';
import CouponForCompany from "../../../../ModelTemplates/CouponForCompany/CouponForCompany";
import store from "../../../../Redux/Store";
import { couponDownloadAction } from "../../../../Redux/CouponState";
import jwtAxios from "../../../../Authorization/jwtAxios";

function CompanyAllCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const fetchCoupons = async () => {
        try {

            const { data : coupons } : { data : Coupon[] } = await jwtAxios.get(`/company/all`);
            store.dispatch(couponDownloadAction(coupons));
            setCoupons(coupons);
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCoupons();
    }, [])

    return (
        <div className="CompanyAllCoupons">
            <h2>All company logged in coupons:</h2>
			{coupons.map(item => <CouponForCompany key={item.id} coupon={item}/>)}
        </div>
    );
}

export default CompanyAllCoupons;

// interface CompanyAllCouponsState {
//     coupons : Coupon[];
// }
 
// class CompanyAllCoupons extends Component<{}, CompanyAllCouponsState> {
//     public constructor(props: {}) {
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
//         return (
//             <div className="AllCoupons row">
//                 {this.state.coupons.map(item => <CouponForCompany key={item.id} coupon={item}/>)}
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
 
// export default CompanyAllCoupons;