import { useState } from "react";
import Router from "next/router";
import Link from "next/link"
import Swal from "sweetalert2";
import baseUrl from "../../../repositories/baseUrl";
import {Loader} from "react-overlay-loader"

export default function Signup() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [loader, setLoader] = useState(false);

  const handleInputChange = (event, func) => {
    func(event.target.value);
  }


  const signupUser = () => {
    if (FirstName == "") {
      Swal.fire({
          title: "Opps",
          text: "First Name is required",
          icon: "error",
          confirmButtonColor:"#ed2a26",
      });
  } else if (LastName == "") {
      Swal.fire({
          title: "Opps",
          text: "Last Name is required",
          icon: "error",
          confirmButtonColor:"#ed2a26",
      });
  }else if (Email == "") {
      Swal.fire({
        title: "Oops",
        text: "Email is required",
        icon: "error",
        confirmButtonColor: "#ed2a26",
      });
    } else if (Password == "") {
      Swal.fire({
        title: "Oops",
        text: "Password is required",
        icon: "error",
        confirmButtonColor: "#ed2a26",
      });
    } else {
      setLoader(true);
      console.log("api hit")
      var formdata = new FormData();
      formdata.append("Fname", FirstName);
      formdata.append("Lname", LastName);
      formdata.append("Email", Email);
      formdata.append("Password", Password);
      var requestOptions = {
        method: 'POST',
        body: formdata,
      };
      // setLoader(true); 
      fetch(`${baseUrl.baseUrl}webapi/studentsignup`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setLoader(false);
          console.log(result)
          if (result.status) {
            localStorage.setItem('studentToken', result.token);
            localStorage.setItem('studentData', JSON.stringify(result.user));
            Router.push('/student/auth/login')
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
            icon: 'error',
            title: 'Oops...',
            text: error,
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
              <Link href={"/teacher/auth/login"} passHref><a href="#"><img src="/static/images/rev4-01.svg" width={"450px"} height={'120px'} alt="Tutor Learner" /></a></Link>
              <Link href={"/teacher/auth/login"} passHref><a href="#"><img className="logo-inverse" src="/static/images/rev4-01.svg" width={"450px"} height={'120px'} alt="Tutor Learner" /></a></Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-8">
            <div className="sign_form">
              <h2>Welcome Tutors</h2>
              <p>Log In to Your Account!</p>
              {/* <button className="social_lnk_btn color_btn_fb"><i className="uil uil-facebook-f" />Continue with
            Facebook</button>
          <button className="social_lnk_btn mt-15 color_btn_tw"><i className="uil uil-twitter" />Continue with
            Twitter</button>
          <button className="social_lnk_btn mt-15 color_btn_go"><i className="uil uil-google" />Continue with
            Google</button> */}
              <form>
              <label className="label25 text-left">First Name<span className="text-danger">*</span></label>
                <div className="ui search focus mt-15 mb-3">
                  <div className="ui left icon input swdh95">
                    <input className="prompt srch_explore" onChange={(e) => handleInputChange(e, setFirstName)} type="first name" name="emailaddress" defaultValue={Email} id="id_email" required maxLength={64} placeholder="Email Address" />
                    {/* <i className="uil uil-envelope icon icon2" /> */}
                  </div>
                </div>
                <label className="label25 text-left">Last Name<span className="text-danger">*</span></label>
                <div className="ui search focus mt-15 mb-3">
                  <div className="ui left icon input swdh95">
                    <input className="prompt srch_explore" onChange={(e) => handleInputChange(e, setLastName)} type="last name" name="emailaddress" defaultValue={Email} id="id_email" required maxLength={64} placeholder="Email Address" />
                    {/* <i className="uil uil-envelope icon icon2" /> */}
                  </div>
                </div>
              <label className="label25 text-left">Email<span className="text-danger">*</span></label>
                <div className="ui search focus mt-15 mb-3">
                  <div className="ui left icon input swdh95">
                    <input className="prompt srch_explore" onChange={(e) => handleInputChange(e, setEmail)} type="email" name="emailaddress" defaultValue={Email} id="id_email" required maxLength={64} placeholder="Email Address" />
                    {/* <i className="uil uil-envelope icon icon2" /> */}
                  </div>
                </div>
                <label className="label25 text-left">Password<span className="text-danger">*</span></label>
                <div className="ui search focus mt-15 mb-3">
                  <div className="ui left icon input swdh95">
                    <input className="prompt srch_explore" onChange={(e) => handleInputChange(e, setPassword)} type="password" name="password" defaultValue={Password} id="id_password" required maxLength={64} placeholder="Password" />
                    {/* <i className="uil uil-key-skeleton-alt icon icon2" /> */}
                  </div>
                </div>

                {/* <label className="label25 text-left">Profile<span className="text-danger">*</span></label>
                <div className="ui search focus mt-15 mb-3">
                  <div className="ui left icon input swdh95">
                    <input className="prompt srch_explore" onChange={(e) => handleInputFile(e, setProfile)} type="file" name="password" defaultValue={Password} id="id_password" required maxLength={64} placeholder="Password" />
                    <i className="uil uil-key-skeleton-alt icon icon2" />
                  </div>
                </div> */}
                
                <button className="login-btn mb-2" onClick={signupUser} type="button">Sign Up</button>
                <p className="mb-0 mt-30">Already have an account? <a href="#" onClick={() => Router.push("/student/auth/login")}>Log In</a></p>
              </form>
              {/* <Link href={"/teacher/auth/forgetpassword"} passHref><p className="sgntrm145">Or <a href="#">Forget Password</a>.</p></Link> */}
              
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