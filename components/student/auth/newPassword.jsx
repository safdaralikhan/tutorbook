import { useState, useEffect } from "react";
import { withRouter } from 'next/router'
import Router from "next/router";
import Link from "next/link"
import Swal from "sweetalert2";
import baseUrl from '../../../repositories/baseUrl'
import { Loader } from "react-overlay-loader"

function NewPassword(props) {
    const [NewPassword, setNewPassword] = useState('');
    const [ConfirmNewPassword, setConfirmNewPassword] = useState('');

    const [loader, setLoader] = useState(false);

    console.log("props",props.router.query)

    const handleInputChange = (event, func) => {
        func(event.target.value);
    }

    const Forget = () => {
        //   console.log("window.location.origin",window.location.origin)
        if (NewPassword == "") {
            Swal.fire({
                title: "Oops",
                text: "NewPassword is required",
                icon: "error",
                confirmButtonColor: "#ed2a26",
            });
        } else if (NewPassword != ConfirmNewPassword) {
            Swal.fire({
                title: "Oops",
                text: "Password does not match",
                icon: "error",
                confirmButtonColor: "#ed2a26",
            });
        } else {
            setLoader(true);
            var formdata = new FormData();
            formdata.append("password", NewPassword);
            formdata.append("adminid", props.router.query.id);
            formdata.append("checkstatus", "student");
            var requestOptions = {
                method: 'POST',
                body: formdata,
            };
            // setLoader(true); 
            fetch(`${baseUrl.baseUrl}webapi/forgetConfirmation`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoader(false);
                    console.log(result)
                    if (result.status) {
                        Router.push("/student/auth/login");
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
                        text: 'Something went wrong!',
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
                            <Link href={"/teacher/auth/forgetpassword"} passHref><a href="#"><img src="/static/images/rev4-01.svg" width={"450px"} height={'120px'} alt="Tutor Learner" /></a></Link>
                            <Link href={"/teacher/auth/forgetpassword"} passHref><a href="#"><img className="logo-inverse" src="/static/images/rev4-01.svg" width={"450px"} height={'120px'} alt="Tutor Learner" /></a></Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-8">
                        <div className="sign_form">
                            <h2>Request a Password Reset</h2>
                            <form>
                                <div className="ui search focus mt-50">
                                    {/* <label className="label25 text-left">Email<span className="text-danger">*</span></label>
                                    <div className="ui left icon input swdh95 mb-2">
                                        <input className="prompt srch_explore" onChange={(e) => handleInputChange(e, setEmail)} type="email" name="emailaddress" defaultValue={Email} id="id_email" required maxLength={64} placeholder="Email Address" />
                                    </div> */}
                                    <label className="label25 text-left">New Password<span className="text-danger">*</span></label>
                                    <div className="ui left icon input swdh95 mb-2">
                                        <input className="prompt srch_explore" onChange={(e) => handleInputChange(e, setNewPassword)} type="password" name="password" defaultValue={NewPassword} id="id_password" required maxLength={64} placeholder="New Password" />
                                        {/* <i className="uil uil-key-skeleton-alt icon icon2" /> */}
                                    </div>
                                    <label className="label25 text-left">Confirm New Password<span className="text-danger">*</span></label>
                                    <div className="ui left icon input swdh95 mb-2">
                                        <input className="prompt srch_explore" onChange={(e) => handleInputChange(e, setConfirmNewPassword)} type="password" name="password" defaultValue={ConfirmNewPassword} id="id_password" required maxLength={64} placeholder="Confirm New Password" />
                                        {/* <i className="uil uil-key-skeleton-alt icon icon2" /> */}
                                    </div>

                                </div>
                                <button onClick={Forget} className="login-btn" type="button">Confirm</button>
                            </form>
                            {/* <Link href={"/superAdmin/auth/login"} passHref><p className="mb-0 mt-30 sgntrm145">Go Back <a href="#">Sign In</a></p></Link> */}
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
export default withRouter(NewPassword)