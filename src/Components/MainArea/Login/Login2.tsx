import "./Login.css"
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import { Redirect, useHistory } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import axios from "axios";
import UserModel from "../../../Models/UserModel";
import { loginAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notify";
import { Component, SyntheticEvent } from "react";

interface Login2State {
    email:string;
    password:string;
    userType:string;
    validate: {
        emailState: string
      }
}

class Login2 extends Component<{}, Login2State> {
    constructor(props:{}) {
      super(props);
      this.state = {
        email: '',
        password: '',
        userType: '',
        validate: {
            emailState: ''
          }
      };
    }
  
    private setEmail = (args:SyntheticEvent) => {
      const myValue = (args.target as HTMLInputElement).value;
      this.setState({
        email: myValue,
      });
      const emailRex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      const { validate } = this.state;
  
      if (emailRex.test((args.target as HTMLInputElement).value)) {
        validate.emailState = 'has-success';
      } else {
        validate.emailState = 'has-danger';
      }
  
      this.setState({ validate });
    };

    private setPassword = (args:SyntheticEvent) => {
        const myValue = (args.target as HTMLInputElement).value;
        this.setState({
          password: myValue,
        });
      };

    private setUserType = (args:SyntheticEvent) => {
        const myValue = (args.target as HTMLInputElement).value;
        this.setState({
          userType: myValue,
        });
      };
  
  
    // private submitForm = async (credential:CredentialsModel) => {
    //     try{
    //         const { data : response } : { data : string } = await axios.post(`http://localhost:8080/${credential.userType.toLowerCase()}/login`, credential);
    //         const userModel = new UserModel();
    //         userModel.token=response;
    //         userModel.email=credential.email;     
    //         userModel.userType=credential.userType;       
    //         store.dispatch(loginAction(userModel));
    //         notify.success("you have been successfully registered!!!")
    //         //history.push(`/${credential.userType.toLowerCase()}`);
    //     } catch{
    //         notify.error("There was a problem!");
    //     }
    // }
  
    render() : JSX.Element {  
      return (
        <div className="Login2">
          <h2>Sign In</h2>
          <Form className="form" >
          {/* onSubmit={() => this.submitForm()} */}
            <FormGroup>
              <Label>Username</Label>
              <Input type="email" name="email" placeholder="example@example.com"
                valid={this.state.validate.emailState === "has-success"}
                invalid={this.state.validate.emailState === "has-danger"}
                onChange={this.setEmail}/>
              <FormFeedback>
                Uh oh! Looks like there is an issue with your email. Please input a correct email.
              </FormFeedback>
              <FormFeedback valid>
                That's a tasty looking email you've got there.
              </FormFeedback>
            </FormGroup> <br/>
            <FormGroup>
              <Label>Password</Label>
              <Input type="password" name="password" placeholder="********" onChange={this.setPassword}/>
            </FormGroup> <br/>
            <FormGroup>
                <Label>Select user type</Label>
                <Input type="select" name="userType" onChange={this.setUserType}>
                    <option>Customer</option>
                    <option>Company</option>
                    <option>Administrator</option>
                </Input><br/>
            </FormGroup>
            {/* <FormGroup tag="fieldset">
                <legend>Client Type</legend>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="CUSTOMER" />{' '}
                        Customer
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="COMPANY" />{' '}
                        Company
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="ADMINISTRATOR" />{' '}
                        Administrator
                    </Label>
                </FormGroup>
            </FormGroup><br/> */}
            <Button>Submit</Button>
          </Form>
        </div>
      );
    }
  }
  
export default Login2;


// function Login2(): JSX.Element {
//     const history = useHistory();
//     async function send(credential: CredentialsModel){
//         try{
//             const { data : response } : { data : string } = await axios.post(`http://localhost:8080/${credential.userType.toLowerCase()}/login`, credential);
//             const userModel = new UserModel();
//             userModel.token=response;
//             userModel.email=credential.email;     
//             userModel.userType=credential.userType;       
//             store.dispatch(loginAction(userModel));
//             notify.success("you have been successfully registered!!!")
//             history.push(`/${credential.userType.toLowerCase()}`);
//         } catch{
//             notify.error("There was a problem!");
//         }
//     }

//     return (
//         <div className="Login2">
            // <Form className="form">
            // <FormGroup>
            // <Label for="exampleEmail">Email</Label>
            // <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
            // </FormGroup>
            // <FormGroup>
            // <Label for="examplePassword">Password</Label>
            // <Input type="password" name="password" id="examplePassword" placeholder="Password" />
            // </FormGroup>
            // <FormGroup tag="fieldset">
            // <legend>Client Type</legend>
            // <FormGroup check>
            //     <Label check>
            //     <Input type="radio" name="CUSTOMER" />{' '}
            //     Customer
            //     </Label>
            // </FormGroup>
            // <FormGroup check>
            //     <Label check>
            //     <Input type="radio" name="COMPANY" />{' '}
            //     Company
            //     </Label>
            // </FormGroup>
            // <FormGroup check disabled>
            //     <Label check>
            //     <Input type="radio" name="ADMINISTRATOR" disabled />{' '}
            //     Administrator
            //     </Label>
            // </FormGroup>
            // </FormGroup>
            // <Button>Submit</Button>
            // </Form>
//         </div>
//       );
// }

