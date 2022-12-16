import { useState ,useEffect} from "react";
import Router from "next/router";
import Link from "next/link"
import Swal from "sweetalert2";
import baseUrl from "../../../repositories/baseUrl";
import {Loader} from "react-overlay-loader"

export default function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const handleInputChange = (event, func) => {
    func(event.target.value);
  }

  const handleKeypress = e => {
    //it triggers by pressing the enter key
  if (e.keyCode === 13) {
    loginUser();
  }
  };

  useEffect(() => {

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    console.log(">>",params.token)
    if(params.token){
        localStorage.setItem('studentToken',params.token)
        Router.push('/student/currentAppointment')

    }

  }, [])
  
  const loginUser = () => {
    if (Email == "") {
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
      formdata.append("email", Email);
      formdata.append("password", Password);
      var requestOptions = {
        method: 'POST',
        body: formdata,
      };
      // setLoader(true); 
      fetch(`${baseUrl.baseUrl}webapi/studentlogin`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setLoader(false);
          console.log(result)
          if (result.status) {
            localStorage.setItem('studentToken', result.token);
            localStorage.setItem('studentData', JSON.stringify(result.user));
            Router.push('/student/currentAppointment')
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
              <Link href={"/student/auth/login"} passHref><a href="#"><img src="/static/images/rev4-01.svg" width={"450px"} height={'120px'} alt="Tutor Learner" /></a></Link>
              <Link href={"/student/auth/login"} passHref><a href="#"><img className="logo-inverse" src="/static/images/rev4-01.svg" width={"450px"} height={'120px'} alt="Tutor Learner" /></a></Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-8">
            <div className="sign_form">
              <h2>Welcome Students</h2>
              <p>Log In to Your Account!</p>
              {/* <button className="social_lnk_btn color_btn_fb"><i className="uil uil-facebook-f" />Continue with
            Facebook</button>
          <button className="social_lnk_btn mt-15 color_btn_tw"><i className="uil uil-twitter" />Continue with
            Twitter</button>
          <button className="social_lnk_btn mt-15 color_btn_go"><i className="uil uil-google" />Continue with
            Google</button> */}
              <form>
              <label className="label25 text-left">Email<span className="text-danger">*</span></label>
                <div className="ui search focus mt-15 mb-3">
                  <div className="ui left icon input swdh95">
                    <input className="prompt srch_explore" onChange={(e) => handleInputChange(e, setEmail)} type="email" name="emailaddress" defaultValue={Email} id="id_email" required maxLength={64} placeholder="Email Address" onKeyDown={(e)=>handleKeypress(e)}/>
                    {/* <i className="uil uil-envelope icon icon2" /> */}
                  </div>
                </div>
                <label className="label25 text-left">Password<span className="text-danger">*</span></label>
                <div className="ui search focus mt-15 mb-3">
                  <div className="ui left icon input swdh95">
                    <input className="prompt srch_explore" onChange={(e) => handleInputChange(e, setPassword)} type="password" name="password" defaultValue={Password} id="id_password" required maxLength={64} placeholder="Password" onKeyDown={(e)=>handleKeypress(e)}/>
                    {/* <i className="uil uil-key-skeleton-alt icon icon2" /> */}
                  </div>
                </div>
                {/* <div className="ui form mt-30 checkbox_sign">
                  <div className="inline field">
                    <div className="ui checkbox mncheck">
                      <input type="checkbox" tabIndex={0} className="hidden" />
                      <label>Remember Me</label>
                    </div>
                  </div>
                </div> */}
                <button className="login-btn mb-2" onClick={loginUser} type="button">Sign In</button>
              
                {/* <button className="login-btn mb-2" onClick={()=>Router.push('/student/auth/signup')} type="button">Sign Up</button> */}

              </form>
              <Link href={"/student/auth/forgetpassword"} passHref><p className="sgntrm145 text-right"><a href="#">Reset Password</a></p></Link>
              <Link href={"/student/auth/signup"} passHref><p className="sgntrm145">Do You have an account? <a href="#">Create One</a>.</p></Link>

              {/* <Link href={"/student/auth/forgetpassword"}><p className="sgntrm145">or <a href="#">Forget Password</a>.</p></Link> */}
              
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