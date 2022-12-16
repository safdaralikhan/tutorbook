import style from "../../../styles/Appointment.module.css";

import baseUrl from "../../../repositories/baseUrl"
import Swal from "sweetalert2"
import { useEffect, useState } from "react";
import { Loader } from 'react-overlay-loader'
import Router from "next/router"
import SkeletonCard from "../../skeletonLoading/SkeletonLoading";
import { Button, Form, Row, Col, FormGroup, Option, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import style from './Appointment.module.css'
export default function Appointment() {

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

  const toggle2 = (appointid = false,zoomid,zoompassword) => {
    console.log("appointid", appointid)

    if (!appointid) {

      setModal(!modal);
      setappointID("")
    }
    else {
      setModal(!modal);
      setappointID(appointid)
      setZoomId(zoomid)
      setZoomPassword(zoompassword)

    }

  }

  const toggle3 = (zoomLink = false) => {

    console.log("zoomModal", zoomModal);
    setzoomModal(!zoomModal);
    setZoomId(JSON.parse(zoomLink).zoomid)
    setZoomPassword(JSON.parse(zoomLink).zoompassword)

  }

  // const toggle3 = () => setzoomModal(!zoomModal)

  // console.log("appointid>>>>",appointID);

  useEffect(() => {
    getAppointment(localStorage.getItem("teacherToken"));
    setToken(localStorage.getItem("teacherToken"))

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
    fetch(`${baseUrl.baseUrl}webapi/teacherappointment`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setLoader(false);
        console.log(result);
        if (result.status) {
          setAppointData(result.data);
        }
        else {
          if (result.message == "token is expire") {
            Router.push("/teacher/auth/login")
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
  const handleInputChange = (e, func) => {
    func(e.target.value);
  }

  const zoomCredential = () => {
    if (ZoomId == "") {
      Swal.fire({
        title: "Oops",
        text: 'Zoom Id is required',
        icon: "error",
        confirmButtonColor: "#ed2a26",
      })
    } else if (ZoomPassword == "") {
      Swal.fire({
        title: "Oops",
        text: 'Zoom Password is required',
        icon: "error",
        confirmButtonColor: "#ed2a26",
      })
    } else {

      const zoomobj = JSON.stringify({ "zoomlink": "false", "zoomid": ZoomId, "zoompassword": ZoomPassword })
      toggle2();
      setnormalloader(true);
      const form = new FormData()
      form.append("appointmentid", appointID);
      form.append("status", "accept");
      form.append("zoomobj", zoomobj);
      var requestOptions = {
        method: 'POST',
        headers: {
          Authorization: "Bearer " + Token
        },
        body: form,
      };
      fetch(`${baseUrl.baseUrl}webapi/teacherappointment`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setnormalloader(false);
          // console.log(result);
          if (result.status) {
            getAppointment(Token)
            setZoomId("")
            setZoomPassword("")
            Swal.fire({
              title: "Success",
              text: result.message,
              icon: "success",
              confirmButtonColor: "#ed2a26",
            });
          }
          else {
            setModal(true)
            Swal.fire({
              title: "Oops",
              text: result.message,
              icon: "error",
              confirmButtonColor: "#ed2a26",
            });
          }
        })
        .catch(error => {
          setnormalloader(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            confirmButtonColor: "#ed2a26",
          })
        });

    }


  }

  const RejectAndDone = (appointid, status, zoomObj) => {
    setnormalloader(true)
    const form = new FormData()
    form.append("appointmentid", appointid);
    form.append("status", status);
    form.append("zoomobj", zoomObj);
    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + Token
      },
      body: form,
    };
    fetch(`${baseUrl.baseUrl}webapi/teacherappointment`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setnormalloader(false);
        // console.log(result);
        if (result.status) {
          getAppointment(Token)
          setZoomId("")
          setZoomPassword("")
          Swal.fire({
            title: "Success",
            text: result.message,
            icon: "success",
            confirmButtonColor: "#ed2a26",
          });
        }
        else {
          setModal(true)
          Swal.fire({
            title: "Oops",
            text: result.message,
            icon: "error",
            confirmButtonColor: "#ed2a26",
          });
        }
      })
      .catch(error => {
        setnormalloader(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
          confirmButtonColor: "#ed2a26",
        })
      });

  }

  console.log("AppointData", AppointData)

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
                    <div className="col-md-12 text-right">
                      {e.status === 'accept' ?
                        <span className="badge badge-pill badge-primary p-2">Approved</span>
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
                        <button onClick={() => Swal.fire({
                          title: 'Are you sure?',
                          text: "You want to reject this Appointment?",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Reject it!'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            RejectAndDone(e.appointid, 'reject', "{}")
                          }
                        })}
                          className={`${style.btn} btn ${style.btnWhite} rounded`}>
                          Reject
                        </button>
                        <button type="button" onClick={() => Swal.fire({
                          title: 'Are you sure?',
                          text: "You want to approve this Appointment?",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Approve it!'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            toggle2(e.appointid,e.zoomid,e.zoompassword, e.status, "accept")
                          }
                        })} className={`${style.btn} btn rounded btn-warning  ${style.btnApprove}`}>
                          Approve
                        </button>
                      </div> :
                      e.status === 'accept' ?
                        <div className="row d-flex justify-content-between mx-2 px-3">
                          <button onClick={() => toggle3(e.zoomLink)} className={`${style.btn} btn ${style.btnWhite} rounded`}>
                            ZOOM
                          </button>
                          <button onClick={() => Swal.fire({
                            title: 'Are you sure?',
                            text: "You want to complete this Appointment?",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'complete!'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              RejectAndDone(e.appointid, 'complete', e.zoomLink)
                            }
                          })}
                            className={`${style.btn} btn rounded btn-primary `}>
                            Done
                          </button>
                        </div> : e.status === 'complete' ?
                          <div className="row d-flex justify-content-between mx-2 px-3">
                            <button onClick={() => toggle3(e.zoomLink)} className={`${style.btn} btn ${style.btnWhite} rounded`}>
                              ZOOM
                            </button>
                            <button className={`${style.btn} rounded btn-success  ${style.btnAccept}`} disabled>
                              Completed
                            </button>
                          </div> : e.status === 'cancel' ?
                          <div className="row d-flex justify-content-between mx-2 px-3">
                            <div className="col-md-12">
                              <button disabled={true} className={`${style.btn}  rounded  ${style.btnReject}`}>
                                Student Cancelled
                              </button>

                            </div>
                          </div> :
                          <div className="row d-flex justify-content-between mx-2 px-3">
                            <div className="col-md-12">
                              <button disabled={true} className={`${style.btn}  rounded  ${style.btnReject}`}>
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

      {/* Zoom ID & Password Input  */}

      <Modal className='text-center' isOpen={modal} toggle={() => toggle2()} size="sm" centered={true}>
        <ModalHeader toggle={() => toggle2()}  > {modaltitle}</ModalHeader>
        <ModalBody className='text-left'>
          <form>
            <div className="row form-row">
              <div className="col-12 col-sm-12">
                <div className="form-group">
                  <label className="label25 text-left">Zoom ID*</label>
                  <input type="text" value={ZoomId} onChange={(e) => handleInputChange(e, setZoomId)} className="form-control" placeholder='Write Appointment Id' />
                </div>
              </div>
            </div>
            <div className="row form-row">
              <div className="col-12 col-sm-12">
                <div className="form-group">
                  <label className="label25 text-left">Zoom Password*</label>
                  <input type="text" value={ZoomPassword} onChange={(e) => handleInputChange(e, setZoomPassword)} className="form-control" placeholder='Write Zoom Password' />
                </div>
              </div>
            </div>
            {/* <div className="row form-row">
                            <div className="col-12 col-sm-12">
                                <div className="form-group">
                                    <label className="label25 text-left">Confirm New Password*</label>
                                    <input type="password" value={ConfirmNewPassword} onChange={(e) => handleInputChange(e, setConfirmNewPassword)} className="form-control" placeholder='Write Confirm New Password' />
                                </div>
                            </div>
                        </div> */}
            <div className="row text-center justify-content-end">
              <button type="button" onClick={() => toggle2()} className="col-3 main-btn cancel">Close</button>
              <button type="button" onClick={() => zoomCredential()} className="col-3 main-btn" disabled={ZoomPassword == "" ? true : false}>Submit</button>
            </div>
            {/* <button type="button" onClick={() => addCourses(Token)} className="login-btn btn-block">Add</button> */}
          </form>
        </ModalBody>
      </Modal>


      {/* Zoom Credentials Display Modal  */}
      <Modal className='text-center' isOpen={zoomModal} toggle={() => toggle3()} size="sm" centered={true}>
        <ModalHeader toggle={() => toggle3()}  > {modaltitle}</ModalHeader>
        <ModalBody className='text-left'>


          <form >
            <div className="row form-row">
              <div className="col-12 col-sm-12">
                <div className="form-group">
                  <label className="label25 text-left">Zoom ID*</label>
                  <input readOnly type="text" value={ZoomId} className="form-control" placeholder='Write Appointment Id' />
                </div>
              </div>
            </div>
            <div className="row form-row">
              <div className="col-12 col-sm-12">
                <div className="form-group">
                  <label className="label25 text-left">Zoom Password*</label>
                  <input readOnly type="text" value={ZoomPassword} className="form-control" placeholder='Write Zoom Password' />
                </div>
              </div>
            </div>
            {/* <div className="row form-row">
                                <div className="col-12 col-sm-12">
                                    <div className="form-group">
                                        <label className="label25 text-left">Confirm New Password*</label>
                                        <input type="password" value={ConfirmNewPassword} onChange={(e) => handleInputChange(e, setConfirmNewPassword)} className="form-control" placeholder='Write Confirm New Password' />
                                    </div>
                                </div>
                            </div> */}
            {/* <div className="row text-center justify-content-end">
                                <button type="button" onClick={() => toggle2()} className="col-3 main-btn cancel">Close</button>
                                <button type="button" onClick={() => zoomCredential()} className="col-3 main-btn" disabled={ZoomPassword == "" ? true : false}>Submit</button>
                            </div> */}
            {/* <button type="button" onClick={() => addCourses(Token)} className="login-btn btn-block">Add</button> */}
          </form>

        </ModalBody>
      </Modal>


    </>
  );
}
