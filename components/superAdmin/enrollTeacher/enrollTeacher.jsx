import baseUrl from "../../../repositories/baseUrl"
import Swal from "sweetalert2"
import { useEffect, useState } from "react";
import { Loader } from 'react-overlay-loader'
import { useRouter } from "next/router"

export default function EnrollTeacher() {
    const [AllEnrollTeachers, setAllEnrollTeachers] = useState([]);
    const [Token, setToken] = useState(null);
    const [loader, setLoader] = useState(false);
    
    const Router = useRouter();

    useEffect(() => {
        if(Router.query.id == undefined){
            Router.push("/superAdmin/courses")
        }else{
            getEnrollTeachers(localStorage.getItem("superAdminToken"));
        }
        setToken(localStorage.getItem("superAdminToken"))
    }, [])

    const getEnrollTeachers = (token) => {
        setLoader(true);
        var requestOptions = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
        };
        fetch(`${baseUrl.baseUrl}webapi/teacherenroll?courseid=${Router.query.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    setAllEnrollTeachers(result.data);
                }
                else {
                    if (result.message == "token is expire") {
                        Router.push("/superAdmin/auth/login")
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

    // Edit Teacher 

    const Enrollment = (teacherId, courseId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to enroll this teacher",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Enroll'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoader(true)
                const form = new FormData()
                form.append("teacherid", teacherId)
                form.append("courseid", courseId)
                var requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: "Bearer " + Token
                    },
                    body: form,
                };
                // setLoader(true); 
                fetch(`${baseUrl.baseUrl}webapi/teacherenroll`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setLoader(false);
                        console.log(result);
                        if (result.status) {
                            getEnrollTeachers(Token);
                            Swal.fire({
                                title: "Success",
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
                            confirmButtonColor: "#ed2a26",
                        })
                    });
            }
        })
    }

    // Delete Teacher 
    const cancelEnrollment = (teacherId, courseId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want cancel to enroll this tutor",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoader(true)
                const form = new FormData()
                form.append("teacherid", teacherId)
                form.append("courseid", courseId)
                var requestOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: "Bearer " + Token
                    },
                    body: form,
                };
                // setLoader(true);
                fetch(`${baseUrl.baseUrl}webapi/teacherenroll`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setLoader(false);
                        console.log(result);
                        if (result.status) {
                            getEnrollTeachers(Token);
                            Swal.fire({
                                title: "Success",
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
                            confirmButtonColor: "#ed2a26",
                        })
                    });
            }
        })
    }

    return (
        <>
            {loader == true ? <Loader fullPage loading /> : null}
            <div className="section3125">
                <h4 className="item_title">Enroll Tutors</h4>
                {/* <a href="#" className="see150">See all</a> */}
                {/* <button type="button" onClick={() => addTeachersModal()} className="main-btn float-right">Add Teacher</button> */}
                <div className="la5lo1">
                    <div className="row">
                        {
                            AllEnrollTeachers.map(e => (
                                <>
                                    <div key={e.tid} className="col-md-3 item">
                                        <div className="fcrse_1 mb-20 shadow " style={{ borderRadius: 12 }}>
                                            <i title={e.enroll ? "Enrolled" : "Not Enrolled"} className={e.enroll ? "fas fa-check-circle enroll" : "fas fa-times-circle unenroll"}></i>
                                            <div className="tutor_img">
                                                <a href="#"><img
                                                    src={baseUrl.baseUrl + "media/" + e.Profile} alt="" /></a>
                                            </div>
                                            <div className="tutor_content_dt">
                                                <div className="tut1250">
                                                    <span className="vdt15 text-capitalize"><b>{e.Fname + " " + e.Lname}</b></span>
                                                    {/* <span className="vdt15">15 Courses</span> */}
                                                </div>
                                                <div className="tutor150">
                                                    <p className="tutor_name text-capitalize">{e.shortdesc}</p>
                                                    {/* <div className="mef78" title="Verify">
                                        <i className="uil uil-check-circle"></i>
                                    </div> */}
                                                </div>
                                                <div className="tutor_cate">{e.description.slice(0, 50)}...</div>
                                                <ul className="tutor_social_links">
                                                    {/* <li><a href="#" className="fb"><i className="fab fa-facebook-f"></i></a>
                                    </li>
                                    <li><a href="#" className="tw"><i className="fab fa-twitter"></i></a></li> */}
                                                    {e.enroll ?
                                                        <li>
                                                            <a style={{ width: "120px" }} onClick={() => cancelEnrollment(e.tid, Router.query.id)} role='button' data-toggle="tooltip" title="Cancel Enrollment" data-placement="auto" className="yu"><i className="fas fa-window-close"></i> Cancel Enroll</a>
                                                        </li> :
                                                        <li>
                                                            <a style={{ width: "120px" }} onClick={() => Enrollment(e.tid, Router.query.id)} role='button' data-toggle="tooltip" title="Enroll now" data-placement="auto" className="tw"><i className="fas fa-check-square"></i> Enroll Now</a>
                                                        </li>}
                                                </ul>
                                                {/*  */}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }

                    </div>
                </div>
            </div>
        </>
    )
}