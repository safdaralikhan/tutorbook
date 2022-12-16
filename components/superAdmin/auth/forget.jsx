import { useState } from "react";
import Router from "next/router";
import Link from "next/link"
import Swal from "sweetalert2";
import baseUrl from "../../../repositories/baseUrl";
import { Loader } from "react-overlay-loader"
import NewPassword from "./newPassword"

export default function Forget() {
  const [Email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  const [CodeFeild, setCodeFeild] = useState(false);
  const [Code, setCode] = useState("");

  const [Id, setId] = useState("");


  const handleInputChange = (event, func) => {
    func(event.target.value);
  }

  const Forget = () => {
    //   console.log("window.location.origin",window.location.origin)
    if (Email == "") {
      Swal.fire({
        title: "Oops",
        text: "Email is required",
        icon: "error",
        confirmButtonColor: "#ed2a26",
      });
    } else {
      setLoader(true);
      var formdata = new FormData();
      formdata.append("email", Email);
      // formdata.append("host", window.location.origin);
      var requestOptions = {
        method: 'POST',
        body: formdata,
      };
      // setLoader(true); 
      fetch(`${baseUrl.baseUrl}webapi/forgotPasswordlinkSend`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setLoader(false);
          console.log(result)
          if (result.status) {
            setId(result.data);
            setCodeFeild(true);
            Swal.fire({
              title: "success",
              text: result.message,
              icon: "success",
              confirmButtonColor: "#ed2a26",
            });
          }
          else {
            Swal.fire({
              title: "Oops",
              text: result.message,
              icon: "error",
              confirmButtonColor: "#ed2a26",
            });
          }
        })
        .catch(error => {
          setLoader(false);
          Swal.fire({
            title: 'Oops...',
            text: error,
            icon: 'error',
          })
        });
    }
  }

  const Confirmation = () => {
    if (Code == "") {
      Swal.fire({
        title: "Oops",
        text: "Varification Code is required",
        icon: "error",
        confirmButtonColor: "#ed2a26",
      });
    } else {
      setLoader(true);
      var formdata = new FormData();
      formdata.append("token", Code);
      formdata.append("id", Id);
      var requestOptions = {
        method: 'POST',
        body: formdata,
      };
      // setLoader(true); 
      fetch(`${baseUrl.baseUrl}webapi/forgettokenCheck`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setLoader(false);
          console.log(result)
          if (result.status) {
            // <NewPassword id={Id}/>
            Router.push({
              pathname: '/superAdmin/auth/forgetpassword/newPassword',
              query: { id: Id }
          })
            // Router.push("/superAdmin/auth/forgetpassword/newPassword")
            Swal.fire({
              title: "success",
              text: result.message,
              icon: "success",
              confirmButtonColor: "#ed2a26",
            });
          }
          else {
            Swal.fire({
              title: "Oops",
              text: result.message,
              icon: "error",
              confirmButtonColor: "#ed2a26",
            });
          }
        })
        .catch(error => {
          setLoader(false);
          Swal.fire({
            title: 'Oops...',
            text: error,
            icon: 'error',
          })
        });
    }
  }


  return (<>
    {loader == true ? <Loader fullPage loading /> : null}
    <div className="sign_in_up_bg">
      <div className="container">
        <div className="row justify-content-lg-center justify-content-md-center">
          <div className="col-lg-12">
            <div className="main_logo26" id="logo">
              <Link href={"/superAdmin/auth/forgetpassword"} passHref><a href="#"><img src="/static/images/rev4-01.svg" width={"450px"} height={'120px'} alt="Tutor Learner" /></a></Link>
              <Link href={"/superAdmin/auth/forgetpassword"} passHref><a href="#"><img className="logo-inverse" src="/static/images/rev4-01.svg" width={"450px"} height={'120px'} alt="Tutor Learner" /></a></Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-8">
            <div className="sign_form">
              <h2>Request a Password Reset</h2>
              <form>
                <div className="ui search focus mt-50">
                  <label className="label25 text-left">Email<span className="text-danger">*</span></label>
                  <div className="ui left icon input swdh95 mb-3">
                    <input className="prompt srch_explore" onChange={(e) => handleInputChange(e, setEmail)} type="email" name="emailaddress" defaultValue={Email} id="id_email" required maxLength={64} placeholder="Email Address" />
                    {/* <i className="uil uil-envelope icon icon2" /> */}
                  </div>
                  {CodeFeild ? <>
                    <label className="label25 text-left">Varification Code<span className="text-danger">*</span></label>
                    <div className="ui left icon input swdh95">
                      <input className="prompt srch_explore" onChange={(e) => handleInputChange(e, setCode)} type="number" name="varification code" defaultValue={Code} required maxLength={64} placeholder="Enter varification Code" />
                      {/* <i className="uil uil-envelope icon icon2" /> */}
                    </div>
                  </>
                    : null}
                </div>
                {CodeFeild ?
                  <button onClick={Confirmation} className="login-btn" type="button" disabled={Code == ""?true:false}>Confirmation</button>
                  :
                  <button onClick={Forget} className="login-btn" type="button">Reset Password</button>
                }
              </form>
              <Link href={"/superAdmin/auth/login"} passHref><p className="mb-0 mt-30 sgntrm145">Go Back <a href="#">Sign In</a></p></Link>
            </div>
            <div className="sign_footer">© 2022 <strong>Tutor Book</strong>. All
              Rights Reserved.</div>
          </div>
        </div>
      </div>

    </div>
  </>

  )
}