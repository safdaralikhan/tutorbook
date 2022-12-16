import style from "../../../styles/Appointment.module.css";

import baseUrl from "../../../repositories/baseUrl"
import Swal from "sweetalert2"
import { useEffect, useState } from "react";
import { Loader } from 'react-overlay-loader'
import Router from "next/router"
import SkeletonCard from "../../skeletonLoading/SkeletonLoading";
import { Button, Form, Row, Col, FormGroup, Option, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import style from './Appointment.module.css'
export default function Appointment({teachid}) {

  const [AppointData, setAppointData] = useState([]);
  const [Token, setToken] = useState(null);
  const [normalloader, setnormalloader] = useState(false);
  const [loader, setLoader] = useState(true);


  const [ZoomId, setZoomId] = useState("");
  const [ZoomPassword, setZoomPassword] = useState("");
  const [appointID, setappointID] = useState("");
  const [appointStatus, setappointStatus] = useState("");
  // const [ConfirmNewPassword, setConfirmNewPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [zoomModal, setzoomModal] = useState(false);
  const [modaltitle, setmodaltitle] = useState("Zoom Credentials");

  

  // const toggle3 = () => setzoomModal(!zoomModal)

  // console.log("appointid>>>>",appointID);

  useEffect(() => {
    getAppointment(localStorage.getItem("superAdminToken"));
    setToken(localStorage.getItem("superAdminToken"))

    // setTeacherData(JSON.parse(localStorage.getItem("studentData")))
  }, [])



  function tConvert(time) {

    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    // console.log("time",time);
    return time.join(''); // return adjusted time or original string
  }


  const getAppointment = (token) => {
    setLoader(true);
    var requestOptions = {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    };
    if(teachid === undefined){
        Router.push('/superAdmin/teachers')
    }
    else{
        fetch(`${baseUrl.baseUrl}webapi/teacherappointment?adminstatus=True&tid=${teachid}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            setLoader(false);
            console.log(result);
            if (result.status) {
              setAppointData(result.data);
            }
            else {
              if (result.message == "token is expire") {
                Router.push("/superAdmin/auth/login")
              }
              else if(result.message == "Field 'tid' expected a number but got 'undefined'."){
                  Router.push('/superAdmin/teachers')
              }
              else {
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
  }

  const deleteAppointment = (appointId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            setLoader(true)
            const form = new FormData()
            // form.append("sessionid", appointId)
            var requestOptions = {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + Token
                },
                // body: form,
            };
            // setLoader(true);
            fetch(`${baseUrl.baseUrl}webapi/deletesessions?sessionid=${appointId}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoader(false);
                    console.log(result);
                    if (result.status) {
                      getAppointment(Token);
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

  

  

  // console.log("AppointData", AppointData)

  return (
    <>
      {normalloader === true ? <Loader fullPage loading /> : null}
      {loader ? <SkeletonCard /> :
        <>
          {AppointData.length >0?
            AppointData.map((e, index) => (
              <div key={index} className="col-md-4 ">
                <div className={`card ${style.card} shadow mb-4`}>
                  <div className={`row p-2`}>
                  <div className="col-md-6 text-left">
                      {e.status === 'accept' ||(e.status === 'complete')||(e.status === 'cancel')||
                       (e.status === 'reject') ?
                       <i className="fa fa-trash px-3" onClick={()=> deleteAppointment(e.appointid)} style={{fontSize:18, cursor:'pointer'}} aria-hidden="true"></i>
                        : null
                      }
                    </div>
                    <div className="col-md-6 text-right">
                      {e.status === 'accept' ?
                        <>
                          <span className="badge badge-pill badge-primary p-2 ">Approved</span>
                        </>
                        : (e.status === 'pending') ?
                          <span className="badge badge-pill badge-warning p-2">Pending</span>
                          : (e.status === 'complete') ?
                            <span className="badge badge-pill badge-success p-2">Completed</span>
                             : (e.status === 'cancel') ?
                                <span className="badge badge-pill badge-danger p-2">Student Cancelled</span>
                                 : <span className="badge badge-pill badge-danger p-2">Rejected</span>
                      }
                    </div>
                  </div>
                  <div className={`row d-flex justify-content-between mx-2 px-2 ${style.cardStrip}`}>
                    <div className="col-md-6">
                      <div className="left d-flex flex-column">
                        <h5 className="mb-1">{tConvert(JSON.parse(e.details).starttime)} - {tConvert(JSON.parse(e.details).endtime)}</h5>
                        <p className={` mb-1  `}>
                          {e.creation}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="text-right">
                        {" "}
                        <img
                          className={`${style.img1}`}
                          src={baseUrl.baseUrl + "media/" + e.studentprofile}
                          alt="profile"
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div className={`row d-flex justify-content-between mx-2 px-3 ${style.cardStrip}`}>
                    <div className="col-md-5">
                      <div className="left d-flex flex-column">
                        <h5 className="mb-1 text-capitalize ">student name</h5>
                        {/* <p className={` mb-1 ${style.smText} ${style.textMuted}`}>FIRST VISIT</p> */}
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="text-right ">
                        <h5 className="mb-1 text-capitalize">{e.studentfirstname} {e.studentlastname}</h5>
                        {/* <div className={`fa fa-comment text-right ${style.fa} ${style.faComment} `} />
                    <div className={`fa fa-phone text-right ${style.fa} ${style.faPhone}`} /> */}
                      </div>
                    </div>
                  </div>
                  <div className={`row justify-content-between mx-2 px-3 ${style.cardStrip}`}>
                    <div className="col-md-6">
                      <div className="left d-flex flex-column">
                        <h5 className={`mb-1  ${style.smText}`}>Course </h5>{" "}
                        {/* <span className={style.time}>1 hr</span> */}
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div className="text-right ">
                        <h4 className={`mb-0 text-capitalize `} title={e.coursename}>
                          {/* <strong className="text-muted">$80.00</strong> */}
                          {e.coursename.length == 12 ?
                            e.coursename :
                            e.coursename.slice(0, 12) + "..."
                          }
                          {/* {e.coursename.slice(0,12)+"..."} */}
                        </h4>
                      </div>
                    </div>
                  </div>
                  {
                    e.status === 'pending' ?
                      <div className="row d-flex justify-content-between mx-2 px-3">
                        <div className="col-md-12">
                        
                        <button  className={`${style.btn} rounded ${style.adminBtnPending}`}>
                          Pending
                        </button>
                        </div>
                      </div> :
                      e.status === 'accept' ?
                        <div className="row d-flex justify-content-between mx-2 px-3">
                          <div className="col-md-12">
                         
                          <button 
                            className={`${style.btn}  rounded  ${style.adminBtnDone}`}>
                            Approved
                          </button>
                          </div>
                        </div> : e.status === 'complete' ?
                          <div className="row d-flex justify-content-between mx-2 px-3">
                            <div className="col-md-12">
                            <button className={`${style.btn}  rounded  ${style.adminBtnComplete}`} >
                              Completed
                            </button>
                            </div>
                          </div> : e.status === 'cancel' ?
                          <div className="row d-flex justify-content-between mx-2 px-3">
                            <div className="col-md-12">
                              <button  className={`${style.btn} rounded ${style.adminBtnReject}`}>
                                Student Cancelled
                              </button>

                            </div>
                          </div> :
                          <div className="row d-flex justify-content-between mx-2 px-3">
                            <div className="col-md-12">
                              <button  className={`${style.btn}  rounded  ${style.adminBtnReject}`}>
                                Rejected
                              </button>

                            </div>
                          </div>

                  }
                </div>
              </div>
            )):
            <div className="col-md-12">
              <div style={{width:"100%"}} className={`card ${style.card} shadow mb-4`}>
                <div className={`row p-2`}>
                  <div className="col-md-12" style={{padding: "23% 35%"}}>
                  <h2 className={`text-capitalize`}>
                        No Appoinment Available!
                      </h2>
                  </div>
                </div>
              </div>
            </div>
          }
        </>
      }

     
      


    </>
  );
}
