import style from "../../../styles/Appointment.module.css";
import baseUrl from "../../../repositories/baseUrl";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Option,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Loader } from "react-overlay-loader";
import Router from "next/router";
import SkeletonCard from "../../skeletonLoading/SkeletonLoading";
// import style from './Appointment.module.css'
export default function Appointment() {

  const [AppointData, setAppointData] = useState([]);
  const [Token, setToken] = useState(null);

  const [ZoomId, setZoomId] = useState("");
  const [ZoomPassword, setZoomPassword] = useState("");

  const [zoomModal, setzoomModal] = useState(false);
  const [modaltitle, setmodaltitle] = useState("Zoom Credentials");
  const [loader, setLoader] = useState(false);

  console.log("AppointData", AppointData);

  useEffect(() => {

    // const params = new Proxy(new URLSearchParams(window.location.search), {
    //   get: (searchParams, prop) => searchParams.get(prop),
    // });
    // console.log(">>",params.token)
    // if(params.token){
    //   localStorage.setItem('studentToken',params.token)
    // }
      getAppointment(localStorage.getItem("studentToken"));
      setToken(localStorage.getItem("studentToken"))

    // setTeacherData(JSON.parse(localStorage.getItem("studentData")))
  }, []);
 

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    // console.log("time",time);
    return time.join(""); // return adjusted time or original string
  }

  const getAppointment = (token) => {
    setLoader(true);
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    fetch(`${baseUrl.baseUrl}clientside/bookAppointment`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoader(false);
        console.log(result);
        if (result.status) {
          setAppointData(result.data);
        } else {
          if (result.message == "token is expire") {
            // Router.push("/student/auth/login");
            window.location.assign("https://thetutorbook.ch/auth/login?login=true")
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
      .catch((error) => {
        setLoader(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
          confirmButtonColor: "#ed2a26",
        });
      });
  };

  const toggle3 = (zoomLink = false) => {
    console.log("zoomModal", zoomModal);
    setzoomModal(!zoomModal);
    setZoomId(JSON.parse(zoomLink).zoomid);
    setZoomPassword(JSON.parse(zoomLink).zoompassword);
  };

  const cancelAppointment = (appoint) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to cancel this Appointment.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes !'
  }).then((result) => { 
    if (result.isConfirmed){

      setLoader(true)
      // toggle()
      const form = new FormData()
      // form.append("appointid", appoint)
      var requestOptions = {
          method: 'PUT',
          headers: {
              Authorization: "Bearer " + Token
          },
          // body: form,
      };
      // setLoader(true); 
      fetch(`${baseUrl.baseUrl}webapi/studentcancellation?appointid=${appoint}`, requestOptions)
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
                  icon: 'error',
                  title: 'Oops...',
                  text: error,
                  confirmButtonColor: "#ed2a26",
              })
          });
    }
  })
}



  return (
    <>
      {loader ? <SkeletonCard /> :
        <>
        {AppointData.length > 0?
          AppointData.map((e, index) => (
            <div className="col-md-4" key={index}>
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
                            <span className="badge badge-pill badge-danger p-2">Cancelled</span>
                             :
                               <span className="badge badge-pill badge-danger p-2">Rejected</span>
                    }
                  </div>
                </div>
                <div className={`row d-flex justify-content-between mx-2 px-2 ${style.cardStrip}`} >
                  <div className="col-md-6">
                    <div className="left d-flex flex-column">
                      <h5 className="mb-1">
                        {tConvert(JSON.parse(e.details).starttime)} &nbsp; - &nbsp;{" "}
                        {tConvert(JSON.parse(e.details).endtime)}
                      </h5>
                      <p className={` mb-1 ${style.smText} `}>{e.creation}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-right">
                      {" "}
                      <img
                        className={`${style.img1}`}
                        src={baseUrl.baseUrl + "media/" + e.teacherprofile}
                        alt="profile"
                      />{" "}
                    </div>
                  </div>
                </div>
                <div
                  className={`row d-flex justify-content-between mx-2 px-3 ${style.cardStrip}`}
                >
                  <div className="col-md-6">
                    <div className="left d-flex flex-column">
                      <h5 className="mb-1 text-capitalize">Tutor</h5>
                      {/* <p className={` mb-1 ${style.smText} ${style.textMuted}`}>FIRST VISIT</p> */}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="text-right ">
                      {/* <div className={`fa fa-comment text-right ${style.fa} ${style.faComment} `} />
                        <div className={`fa fa-phone text-right ${style.fa} ${style.faPhone}`} /> */}
                      <h5 className="mb-1 text-capitalize">
                        {e.teacherfirstname} {e.teacherlastname}
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  className={`row justify-content-between mx-2 px-3 ${style.cardStrip}`}
                >
                  <div className="col-md-6">
                    <div className="left d-flex">
                      <h5 className={`mb-1  text-capitalize ${style.smText}`}>
                        Course
                      </h5>{" "}
                      {/* <span className={style.time}>1 hr</span> */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-right">
                      <h4 className={`mb-0  text-capitalize `} title={e.coursename}>
                        {/* {e.coursename} */}
                        {e.coursename.length <= 11 ?
                          e.coursename 
                          :
                          e.coursename.slice(0, 11) + "..."
                        }
                      </h4>
                      <p className={`mb-0 `}>
                        {/* <strong className="text-muted">$80.00</strong> */}
                      </p>
                    </div>
                  </div>
                </div>
                {e.status === "pending" ? (
                  <div className="row d-flex justify-content-between mx-2 px-3">
                    <button onClick={()=> cancelAppointment(e.appointid)} className={`${style.btn} ${style.btnWhite} rounded text-capitalize `} type={"button"}>
                      Cancel
                    </button>
                    <button className={`${style.btn}  rounded text-capitalize ${style.btnPendingStudent}`} type={"button"}>
                      Pending
                    </button>
                  </div>
                  
                ) : e.status === "accept" ? (
                  <div className="row d-flex justify-content-between mx-2 px-3">
                    <button className={`${style.btn} btn rounded btn-primary `} type={"button"}>
                      Accepted
                    </button>
                    <button
                      type="button"
                      onClick={() => toggle3(e.zoomLink)}
                      className={`${style.btn} ${style.btnWhite} rounded`}
                    >
                      ZOOM
                    </button>
                  </div>
                ) : e.status === "complete" ? (
                  <div className="row d-flex justify-content-between mx-2 px-3">
                    <button className={`${style.btn} rounded text-capitalize  ${style.btnAccept}`} type={"button"}>
                      Completed
                    </button>
                    <button
                      type="button"
                      onClick={() => toggle3(e.zoomLink)}
                      className={`${style.btn} ${style.btnWhite} rounded`}
                    >
                      ZOOM
                    </button>
                  </div>
                ) : e.status === "cancel" ? (
                  <div className="row d-flex justify-content-between mx-2 px-3">
                    <button className={`${style.btn} rounded text-capitalize ${style.btnReject}`} type={"button"}>
                      Cancelled
                    </button>
                  </div>
                ) : (
                  <div className="row d-flex justify-content-between mx-2 px-3">
                    <button className={`${style.btn} rounded text-capitalize ${style.btnReject}`} type={"button"}>
                      rejected
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
          :
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

      {/* Zoom Credentials Display Modal  */}
      <Modal
        className="text-center"
        isOpen={zoomModal}
        toggle={() => toggle3()}
        size="sm"
        centered={true}
      >
        <ModalHeader toggle={() => toggle3()}> {modaltitle}</ModalHeader>
        <ModalBody className="text-left">
          <form>
            <div className="row form-row">
              <div className="col-12 col-sm-12">
                <div className="form-group">
                  <label className="label25 text-left">Zoom ID*</label>
                  <input
                    readOnly
                    type="text"
                    value={ZoomId}
                    className="form-control"
                    placeholder="Write Appointment Id"
                  />
                </div>
              </div>
            </div>
            <div className="row form-row">
              <div className="col-12 col-sm-12">
                <div className="form-group">
                  <label className="label25 text-left">Zoom Password*</label>
                  <input
                    readOnly
                    type="text"
                    value={ZoomPassword}
                    className="form-control"
                    placeholder="Write Zoom Password"
                  />
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
