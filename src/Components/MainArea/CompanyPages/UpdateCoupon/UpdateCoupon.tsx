import Coupon from "../../../../Models/Coupon";
import "./UpdateCoupon.css";
import { useEffect, useState} from 'react';
import notify from "../../../../Services/Notify";
import store from "../../../../Redux/Store";
import { couponUpdateAction } from "../../../../Redux/CouponState";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import jwtAxios from "../../../../Authorization/jwtAxios";

interface UpdateCouponProps {
  id:string;
}

function UpdateCoupon(props: UpdateCouponProps): JSX.Element {
    const couponId = parseInt(props.id);
    const companyEmail = store.getState().authState.user.email;
    const loggedCompanyArray = store.getState().companyState.companies.filter(function(item){return item.email === companyEmail});
    const loggedCompany = loggedCompanyArray[0];
    const companyCoupons = loggedCompany.coupons;
    const updateCouponArray = companyCoupons.filter(function (item){return item.id === couponId});
    const updateCoupon = updateCouponArray[0];

    const [updatedTitle, setUpdatedTitle] = useState<string>(updateCoupon.title);
    const [updatedDescription, setUpdatedDescription] = useState<string>(updateCoupon.description);
    const [updatedCategory, setUpdatedCategory] = useState<string>(updateCoupon.category);
    const [updatedStartDate, setUpdatedStartDate] = useState<string>(updateCoupon.startDate);
    const [updatedEndDate, setUpdatedEndDate] = useState<string>(updateCoupon.endDate);
    const [updatedAmount, setUpdatedAmount] = useState<number>(updateCoupon.amount);
    const [updatedPrice, setUpdatedPrice] = useState<number>(updateCoupon.price);
    const [updatedImage, setUpdatedImage] = useState<string>(updateCoupon.image);

    const {register, handleSubmit, errors} = useForm<Coupon>();
    const history = useHistory();
    async function send(coupon:Coupon){
       coupon.id = couponId;
       coupon.companyID=updateCoupon.companyID;
       coupon.title=updatedTitle;
       coupon.description = updatedDescription;
       coupon.category=updatedCategory;
       coupon.startDate=updatedStartDate;
       coupon.endDate=updatedEndDate;
       coupon.amount = updatedAmount;
       coupon.price=updatedPrice;
       coupon.image=updatedImage;
       
       try{  
           await jwtAxios.put<Coupon>("http://localhost:8080/company/update", coupon);
           store.dispatch(couponUpdateAction(coupon));
           notify.success("Coupon update successfully!");
           history.push("/company/all");
       } catch {
           notify.error("There was a problem with updating this coupon");
       }
   }

   useEffect(()=>{ 
   }, [])
   
   const ref={register}
   return (
       <div className="UpdateCoupon">
     <h2>Update Coupon</h2>
           <form onSubmit={handleSubmit(send)}>

           <label>Choose a coupon category: </label>
                <select name="category" defaultValue ={updateCoupon.category} onChange ={item => setUpdatedCategory(item.target.value)}   ref={register}>
                    <option value="" disabled>--Please choose a category--</option>
                    <option value="VACATION">Vacation</option>
                    <option value="FOOD" >Food</option>
                    <option value="BEAUTY">Beauty</option>
                    <option value="HOME">Home</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="FASHION">Fashion</option>
                    <option value="SPORT">Sport</option>
                    <option value="PETS">Pets</option>
                </select>
                <br/><br/>


               <input type="text" name="id" value={parseInt(props.id)} ref={register({
               })} disabled/>
               <br/><br/>
               <input type="text" name="title" defaultValue={updateCoupon.title} onChange = {item => setUpdatedTitle(item.target.value)} ref={register({
                required: {value:true , message:"Missing company title!"},
                minLength: {value:2 , message:"Minimum title length is two characters!"}
               })}/>
               <br/><br/>
               <input type="text" name="description" defaultValue={updateCoupon.description} onChange = {item => setUpdatedDescription(item.target.value)} ref={register({              
                  required: {value:true , message:"Missing coupon description!"}
               })}/>
               <span><br/>{errors.description?.message}</span>
               <br/><br/>

               <input type="text" name="startDate" defaultValue={updateCoupon.startDate} onChange = {item => setUpdatedStartDate(item.target.value)} ref={register({              
                  required: {value:true , message:"Missing coupon start date!"}
               })}/>
               <span><br/>{errors.startDate?.message}</span>
               <br/><br/>
               <input type="text" name="endDate" defaultValue={updateCoupon.endDate} onChange = {item => setUpdatedEndDate(item.target.value)} ref={register({              
                  required: {value:true , message:"Missing coupon end date"}
               })}/>
               <span><br/>{errors.endDate?.message}</span>
               <br/><br/>
               <input type="number" name="amount" defaultValue={updateCoupon.amount} onChange = {item =>  setUpdatedAmount(parseInt(item.target.value))} ref={register({              
                  required: {value:true , message:"Missing coupon amount"}
               })}/>
               <span><br/>{errors.amount?.message}</span>
               <br/><br/>
               <input type="number" name="price" defaultValue={updateCoupon.price} onChange = {item => setUpdatedPrice(parseInt(item.target.value))} ref={register({            
                    required: {value:true , message:"Missing coupon price!"}
               })}/>
               <span><br/>{errors.price?.message}</span>
               <br/><br/>
               <input type="text" name="image" defaultValue={updateCoupon.image} onChange = {item => setUpdatedImage(item.target.value)} ref={register({            
                    required: {value:true , message:"Missing coupon image!"}
               })}/>
               <button>Update</button>
           </form>
       </div>
   );
}

export default UpdateCoupon;


// interface UpdateCouponState {
//     id: number;
//     companyID: number;
//     title: string;
//     description: string;
//     category: string;
//     startDate: string;
//     endDate: string;
//     amount: number;
//     price: number;
//     image: string;
// }
 
// interface updateCouponProps{
//   updateId:string
// }

// class UpdateCoupon extends Component<updateCouponProps, UpdateCouponState> {
//   public constructor(props: updateCouponProps) {
//     super(props);
//     this.state = {
//         id: parseInt(this.props.updateId),
//         companyID: 0,
//         title: "",
//         description: "",
//         category: "",
//         startDate: "",
//         endDate: "",
//         amount: 0,
//         price: 0,
//         image: ""
//     };
//   }

//   private setTitle = (args: SyntheticEvent) => {
//     const value = (args.target as HTMLInputElement).value;
//     this.setState({
//       title: value
//     });
//   };
//   private setDescription = (args: SyntheticEvent) => {
//     const value = (args.target as HTMLInputElement).value;
//     this.setState({
//       description: value
//     });
//   };
//   private setCategory = (args: SyntheticEvent) => {
//     const value = (args.target as HTMLInputElement).value;
//     this.setState({
//       category: value
//     });
//   };
//   private setStartDate = (args: SyntheticEvent) => {
//     const value = (args.target as HTMLInputElement).value;
//     this.setState({
//       startDate: value
//     });
//   };
//   private setEndDate = (args: SyntheticEvent) => {
//     const value = (args.target as HTMLInputElement).value;
//     this.setState({
//       endDate: value
//     });
//   };
//   private setAmount = (args: SyntheticEvent) => {
//     const value = (args.target as HTMLInputElement).value;
//     this.setState({
//       amount: parseInt(value)
//     });
//   };
//   private setPrice = (args: SyntheticEvent) => {
//     const value = (args.target as HTMLInputElement).value;
//     this.setState({
//       price: parseInt(value)
//     });
//   };
//   private setImage = (args: SyntheticEvent) => {
//     const value = (args.target as HTMLInputElement).value;
//     this.setState({
//       image: value
//     });
//   };
 
//   private updateData = async () => {
//     try{
//       const coupon = new Coupon();
//       coupon.id=this.state.id;
//       coupon.companyID=this.state.companyID;
//       coupon.title = this.state.title;
//       coupon.description = this.state.description;
//       coupon.category = this.state.category;
//       coupon.startDate = this.state.startDate;
//       coupon.endDate = this.state.endDate;
//       coupon.amount = this.state.amount;
//       coupon.price = this.state.price;
//       coupon.image = this.state.image;

//     await axios.put("http://localhost:8080/company/update", coupon);
//       store.dispatch(couponUpdateAction(coupon));
//       notify.success("Coupon updated successfully!");
      
//     } catch {
//       notify.error("There was a problem with updating this coupon");
//     }
//   };
 
//   async componentDidMount(){
//     const couponId = parseInt(this.props.updateId);
//     const reduxCoupon = store.getState().couponState.coupons.filter(function (item){return item.id==couponId});
//     const updateCoupon = reduxCoupon[0];
//     console.log(updateCoupon);
//     this.setState({
//       id: updateCoupon.id,
//       companyID: updateCoupon.companyID,
//       title: updateCoupon.title,
//       description: updateCoupon.description,
//       category:updateCoupon.category,
//       startDate: updateCoupon.startDate,
//       endDate: updateCoupon.endDate,
//       amount: updateCoupon.amount,
//       price: updateCoupon.price,
//       image: updateCoupon.image
//     });
//   }
 
//   public render(): JSX.Element {
//     return (
//       <div className="UpdateCoupon">
//         <h4>Update Coupon</h4>
//         <input type="number" value={this.state.id} disabled/>
//         <br/><br/>
//         <input type="text" value={this.state.title} onChange={this.setTitle}/>
//         <br/><br/>
//         <input type="text" value={this.state.description} onChange={this.setDescription}/>
//         <br/><br/>
//         <select name="category" onChange={this.setCategory} value={this.state.category}>
//             <option value="FOOD">Food</option>
//             <option value="VACATION">Vacation</option>
//             <option value="BEAUTY">Beauty</option>
//             <option value="HOME">Home</option>
//             <option value="ELECTRICITY">Electricity</option>
//             <option value="FASHION">Fashion</option>
//             <option value="SPORT">Sport</option>
//             <option value="PETS">Pets</option>
//         </select>
//         <br/><br/>
//         <input type="text" value={this.state.startDate} onChange={this.setStartDate}/>
//         <br/><br/>
//         <input type="text" value={this.state.endDate} onChange={this.setEndDate}/>
//         <br/><br/>
//         <input type="text" value={this.state.amount} onChange={this.setAmount}/>
//         <br/><br/>
//         <input type="text" value={this.state.price} onChange={this.setPrice}/>
//         <br/><br/>
//         <input type="text" value={this.state.image} onChange={this.setImage}/>
//         <br/><br/>
//         <button onClick={this.updateData}>Update</button>
//       </div>
//     );
//   }
// }
 
// export default UpdateCoupon;