import React, { useEffect, useState } from "react";
import baseUrl from "../../../repositories/baseUrl";
// import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Swal from "sweetalert2";
import Router from "next/router";
import { Loader } from "react-overlay-loader";

export default function Profile() {
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Age, setAge] = useState("")
    const [ShortDesciption, setShortDesciption] = useState("");

    const [LongDesciption, setLongDesciption] = useState("")
    const [loader, setLoader] = useState(false);
    const [ProfileImage, setProfileImage] = useState(null);
    const [SelectProfileImage, setSelectProfileImage] = useState(null);
    const [UpdateProfileImage, setUpdateProfileImage] = useState("");
    // const classes = useStyles();
    const [Disable, setDisable] = useState(true);
    const [Token, setToken] = useState(null);
    const [ProfieData, setProfieData] = useState({});
    console.log("ProfieData ==>", ProfieData)

    // const Token = localStorage.getItem("token");


    const handleInputChange = (event, func) => {
        func(event.target.value);
        setDisable(false);
        console.log('dis')
    }
    const handleInputFileChange = (event, func) => {
        
        var file = event.target.files[0];
        var reader = new FileReader();
        // console.log(file);
        const filesize = file.size
        const filesizeround = Math.round((filesize / 1024))
        if (filesizeround > 1024) {
            // setupdateProfileImage(null)
            // setselectProfileImage(null)
            Swal.fire({
                title: "Oops",
                text: "plz select your image less then and equals to 1mb",
                icon: "warning",
                confirmButtonColor: "#ed2a26",
            });
        } else {
            setDisable(false);
            var url = reader.readAsDataURL(file);
            // console.log(url)
            reader.onloadend = function (e) {
                setSelectProfileImage(reader.result);
                setUpdateProfileImage(file);

                // console.log("data-======>",reader.result)
            };
            // console.log(selectProfileImage)
            func(event.target.files[0])
            // setdisable(false)
        }
    }

    useEffect(() => {
        setToken(localStorage.getItem("studentToken"))
        getProfile(localStorage.getItem("studentToken"));
    }, [0])


    const getProfile = (token) => {
        setLoader(true);
        var requestOptions = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
        };
        fetch(`${baseUrl.baseUrl}webapi/studentprofile`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log("get profile", result);
                if (result.status) {
                    // setProfieData(result.data);
                    setProfileImage(result.data[0].Profile);
                    setFirstName(result.data[0].Fname);
                    setLastName(result.data[0].Lname);
                    setEmail(result.data[0].Email);
                    // setAge(result.data.age)
                    // setShortDesciption(result.data.shortdescription);
                    // setLongDesciption(result.data.longdescription)
                }
                else {
                    if(result.message == "token is expire"){
                        Router.push('/student/auth/login')
                    } else {
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

    const updateProfile = () => {
        setLoader(true);
        const form = new FormData();
        form.append("fname", FirstName);
        form.append("lname", LastName);
        form.append("profile", UpdateProfileImage);
        // form.append("age", Age)
        // form.append("shortdescription", ShortDesciption)
        // form.append("longdescription", LongDesciption)

        var requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + Token
            },
            body: form,
        };
        fetch(`${baseUrl.baseUrl}webapi/studentprofile`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log("profile", result);
                if (result.status) {
                    getProfile(Token);
                    Swal.fire({
                        title: "Success",
                        text: result.message,
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
                <h4 className="item_title">Profile</h4>
                {/* <a href="#" className="see150">See all</a> */}
                {/* <a href="#" onClick={() => addCoursesModal()} className="see150">Add Course</a> */}
                <div className="la5lo1">
                    <div className="row">
                        <div className="card" style={{ width: '100%' }}>
                            <div className="card-body">
                                <h5 className="card-title">Edit Profile</h5>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <input
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            id="icon-button-file"
                                            type="file"
                                            onChange={(e) => handleInputFileChange(e, setProfileImage)}
                                        />
                                        <label htmlFor="icon-button-file">
                                            <IconButton
                                                color="#414141"
                                                aria-label="upload picture"
                                                component="span"
                                                className="upload_photo_main"
                                            >
                                                <img style={{ minWidth: "120px", maxWidth: "120px", borderRadius: "20px" }} src={SelectProfileImage ? SelectProfileImage : baseUrl.baseUrl +'media/'+ ProfileImage} className="upload_photo_main" alt=""/>
                                            </IconButton>
                                        </label>
                                    </div>
                                </div>
                                <div className="row form-row">
                                    <div className="col-md-6 mt-3 form-group">
                                        <label className="label25 text-left">First Name*</label>
                                        <input value={FirstName} onChange={(e) => handleInputChange(e, setFirstName)} className="form-control text-capitalize" type="text" placeholder="Enter Your First Name" />
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <label className="label25 text-left">Last Name*</label>
                                        <input value={LastName} onChange={(e) => handleInputChange(e, setLastName)} className="form-control text-capitalize" type="text" placeholder="Enter Your Last Name" />
                                    </div>
                                </div>
                                <div className="row form-row">
                                    {/* <div className="col-md-6 mt-3 form-group">
                                        <label className="label25 text-left">Email*</label>
                                        <input value={Email} className="form-control" type="text" placeholder="Enter Your Email" readOnly />
                                    </div> */}
                                    <div className="col-md-6 mt-3">
                                        <label className="label25 text-left">Email*</label>
                                        <input readOnly value={Email} onChange={(e) => handleInputChange(e, setEmail)} className="form-control" type="text" placeholder="Enter Your Age" />
                                    </div>
                                    {/* <div className="col-md-6 mt-3">
                                        <label className="label25 text-left">Short Description*</label>
                                        <input value={ShortDesciption} onChange={(e) => handleInputChange(e, setShortDesciption)} className="form-control text-capitalize" type="text" placeholder="Write a short discription..." />
                                    </div> */}
                                </div>

                                {/* <div className="row form-row">
                                    <div className="col-md-12 mt-3 form-group">
                                        <label className="label25 text-left">Long Description*</label>
                                        <div className="ui form swdh30">
                                            <div className="field">
                                                <textarea rows="3" value={LongDesciption} onChange={(e) => handleInputChange(e, setLongDesciption)} name="description" id="id_about" placeholder="Write a Long description..."></textarea>
                                            </div>
                                        </div>
                                        <textarea value={LongDesciption} onChange={(e) => handleInputChange(e, setLongDesciption)} className="form-control" type="text" placeholder="Enter Long discription" />
                                    </div>
                                </div> */}

                                <div className="row ">
                                    <div className="col-md-12 text-right mt-3">
                                        <button onClick={() => updateProfile()} className="main-btn" type="button"  disabled={Disable}>Update</button>
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