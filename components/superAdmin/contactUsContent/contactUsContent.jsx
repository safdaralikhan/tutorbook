import React, { useEffect, useState } from "react";
import baseUrl from "../../../repositories/baseUrl";
// import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Swal from "sweetalert2";
import { Loader } from "react-overlay-loader";
import Router from "next/router"

export default function ContactUsContent() {
    // const [UpdateProfileImage, setUpdateProfileImage] = useState("");
    // const classes = useStyles();
    
    const [Email, setEmail] = useState(null);
    const [Contact, setContact] = useState(null);
    const [Address, setAddress] = useState("");
    const [loader, setLoader] = useState(false);
    const [Disable, setDisable] = useState(true);
    const [Token, setToken] = useState(null);

    // const Token = localStorage.getItem("token");


    const handleInputChange = (event, func) => {
        func(event.target.value);
        setDisable(false);
        // console.log('dis')
    }

    

    useEffect(() => {
        setToken(localStorage.getItem("superAdminToken"))
        getContactUsContent(localStorage.getItem("superAdminToken"));
    }, [0])


    const getContactUsContent = (token) => {
        setLoader(true);
        var requestOptions = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
        };
        fetch(`${baseUrl.baseUrl}clientside/contactUs`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                // console.log("GET content", result);
                if (result.status) {
                    setContact(result.data[0].phone);
                    setEmail(result.data[0].webEmail);
                    setAddress(result.data[0].address);
                }
                else {
                    if(result.message == "token is expire"){
                        Router.push("/superAdmin/auth/login")
                    }else{
                        Swal.fire({
                            title: "Oops",
                            text: result.message,
                            icon: "error",
                            confirmButtonColor: "#ed2a26",
                        });
                    }
                }
            })
            .catch(error => {
                setLoader(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                    confirmButtonColor: "#ed2a26",
                })
            });
    }
   

    const updateContent = () => {
        setLoader(true);
        const form = new FormData();
        form.append("phone", Contact);
        form.append("webEmail", Email);
        form.append("address", Address);

        var requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + Token
            },
            body: form,
        };
        fetch(`${baseUrl.baseUrl}clientside/contactUs`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log("content result", result);
                if (result.status) {
                    getContactUsContent(Token)
                    setDisable(true);
                    Swal.fire({
                        // title: "Success",
                        text: result.data,
                        icon: "success",
                        confirmButtonColor: "#ed2a26",
                    });
                } else {
                    Swal.fire({
                        title: "Oops",
                        text: result.message,
                        icon: "error",
                        confirmButtonColor: "#ed2a26",
                    });
                }
            }, (error) => {
                setLoader(false);
                // console.log(error);
                Swal.fire({
                    title: "Oops",
                    text: error,
                    icon: "error",
                    confirmButtonColor: "#ed2a26",
                });
            });
    }
    return (
        <>
            {loader == true ? <Loader fullPage loading /> : null}
            <div className="section3125">
                <h4 className="item_title">Contact-Us Content</h4>
                {/* <a href="#" className="see150">See all</a> */}
                {/* <a href="#" onClick={() => addCoursesModal()} className="see150">Add Course</a> */}
                <div className="la5lo1">
                    <div className="row">
                        <div className="card" style={{ width: '100%' }}>
                            <div className="card-body">
                                <h5 className="card-title mb-3">Edit Content*</h5>
                               
                                
                                <div className="row form-row">
                                    <div className="col-md-6 mt-3 form-group">
                                        <label className="label25 text-left">Contact*</label>
                                        <input value={Contact} onChange={(e) => handleInputChange(e, setContact)} className="form-control" type="text" placeholder="Enter Your Contact"  />
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <label className="label25 text-left">Email*</label>
                                        <input value={Email} onChange={(e) => handleInputChange(e, setEmail)} className="form-control" type="text" placeholder="Enter Your Email" />
                                    </div>
                                </div>
                                <div className="row form-row">
                                    <div className="col-md-6 mt-3 form-group">
                                        <label className="label25 text-left">Address*</label>
                                        <input value={Address} onChange={(e) => handleInputChange(e, setAddress)} className="form-control" type="text" placeholder="Enter Your Content"  />
                                    </div>
                                    {/* <div className="col-md-6 mt-3">
                                        <label className="label25 text-left">Email*</label>
                                        <input value={Contact} onChange={(e) => handleInputChange(e, setContact)} className="form-control" type="text" placeholder="Enter Your Contact" />
                                    </div> */}
                                </div>
                                <div className="row ">
                                    <div className="col-md-2 text-right mt-3">
                                        <button onClick={() => updateContent()} className="main-btn" type="button"  disabled={Disable}>Save Content</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}