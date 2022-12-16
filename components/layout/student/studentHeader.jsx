import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader } from "react-overlay-loader";
import Router from "next/router";
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
import baseUrl from "../../../repositories/baseUrl";
import Swal from "sweetalert2";

export default function Header(props) {
  const [loading, setloading] = useState(true);
  const [Sidebar, setSidebar] = useState("");

  const [drop, setdrop] = useState("");
  const [Token, setToken] = useState("");
  // const [studentData, setstudentData] = useState("");

  const [loader, setLoader] = useState("");
  const [profileDrop, setprofileDrop] = useState("");

  // const [ProfieData, setProfieData] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [ProfileImg, setProfileImg] = useState("");

  // forgot
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmNewPassword, setConfirmNewPassword] = useState("");
  const [modaltitle, setmodaltitle] = useState("");
  const [modal, setModal] = useState(false);
  const toggle2 = () => setModal(!modal);
  // forgot

  // useEffect(() => {
  //     getAuthenticate();
  //     setToken(localStorage.getItem("studentToken"))
  //     // console.log("git>>>");
  // }, [])

  // const getAuthenticate = () =>{
  //     if(localStorage.getItem("studentToken") === null){
  //         Router.push('/student/auth/login')
  //         setloading(false)
  //     }
  //     else{
  //         getProfile(localStorage.getItem("studentToken"))
  //         setloading(true)
  //     }
  // }

  useEffect(() => {


    setToken(localStorage.getItem("studentToken"));
    getAuth(localStorage.getItem("studentToken"))
    // getProfile(localStorage.getItem("studentToken"))
    // console.log('headertoken',localStorage.getItem("studentToken"))
  }, []);

  const getAuth = (token) => {


    if (token === null) {
      Router.push("/student/auth/login");
    } else {
      getProfile(token)
    }
  }

  const sidebarToggle = (e) => {
    if (e == Sidebar) {
      setSidebar("");
    } else {
      setSidebar(e);
    }
  };

  const dropdown = (e) => {
    if (e == drop) {
      setdrop("");
    } else {
      setdrop(e);
    }
  };

  const profiledropdown = (e) => {
    if (e == profileDrop) {
      setprofileDrop("");
    } else {
      setprofileDrop(e);
    }
  };

  const handleInputChange = (e, func) => {
    func(e.target.value);
  };

  const getProfile = (token) => {
    setLoader(true);
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    fetch(`${baseUrl.baseUrl}webapi/studentprofile`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoader(false);
        setloading(false);
        console.log("profile", result);
        if (result.status) {
          // setProfieData(result.data);
          setFirstName(result.data[0].Fname)
          setLastName(result.data[0].Lname)
          setProfileImg(result.data[0].Profile)
        } else {
          if (result.message == "token is expire") {
            Router.push("/student/auth/login");
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

  const forgot = () => {
    if (NewPassword == ConfirmNewPassword) {
      toggle2();
      setLoader(true);
      const form = new FormData();
      form.append("oldpassword", OldPassword);
      form.append("password", NewPassword);
      var requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token,
        },
        body: form,
      };
      fetch(`${baseUrl.baseUrl}webapi/studentchangePassword`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLoader(false);
          // console.log(result);
          if (result.status) {
            localStorage.removeItem("studentToken");
            Router.push("/student/auth/login");
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            Swal.fire({
              title: "Success",
              text: result.message,
              icon: "success",
              confirmButtonColor: "#ed2a26",
            });
          } else {
            setModal(true);
            Swal.fire({
              title: "Oops",
              text: result.message,
              icon: "error",
              confirmButtonColor: "#ed2a26",
            });
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
    } else {
      Swal.fire({
        title: "Oops...",
        text: "Password & Confirm Password does not match",
        icon: "error",
        confirmButtonColor: "#ed2a26",
      });
    }
  };

  const backtoWeb = () => {
    window.open(`https://thetutorbook.ch/`, '_blank')
  }

  const logout = () => {
    localStorage.removeItem("studentToken");
    // localStorage.removeItem("studentData");
    Router.push("/student/auth/login");
  };
  // console.log(studentData);

  return (
    <>
      {/* {loader == true ? <Loader fullPage loading /> : null} */}
      <header className="header clearfix">
        <button
          onClick={() => sidebarToggle("smallScreen")}
          type="button"
          id="toggleMenu"
          className="toggle_menu"
        >
          <i className="uil uil-bars"></i>
        </button>
        <button
          onClick={() => sidebarToggle("largeScreen")}
          className="collapse_menu"
        >
          <i className="uil uil-bars collapse_menu--icon "></i>
          <span className="collapse_menu--label"></span>
        </button>
        <div className="main_logo" id="logo">
          {/* <Link href={"/teacher/dashboard"}><a href="#"><img src="/static/images/logo.svg" alt="" /></a></Link>
                        <Link href={"/teacher/dashboard"}><a href="#"><img className="logo-inverse" src="/static/images/ct_logo.svg" alt="" /></a></Link> */}

          <Link href={"/student/currentAppointment"}>
            <a href="#">
              <img src="/static/images/rev4-01.svg" width={"190px"} alt="" />
            </a>
          </Link>
          <Link href={"/student/currentAppointment"}>
            <a href="#">
              <img
                className="logo-inverse"
                src="/static/images/rev4-01.svg"
                width={"190px"}
                alt=""
              />
            </a>
          </Link>
        </div>

        {/* <div className="top-category">
                        <div className="ui compact menu cate-dpdwn">
                            <div className="ui simple dropdown item">
                                <a href="#" className="option_links p-0" title="categories"><i className="uil uil-apps"></i></a>
                                <div className="menu dropdown_category5">
                                    <a href="#" className="item channel_item">Development</a>
                                    <a href="#" className="item channel_item">Business</a>
                                    <a href="#" className="item channel_item">Finance & Accounting</a>
                                    <a href="#" className="item channel_item">IT & Software</a>
                                    <a href="#" className="item channel_item">Office Productivity</a>
                                    <a href="#" className="item channel_item">Personal Development</a>
                                    <a href="#" className="item channel_item">Design</a>
                                    <a href="#" className="item channel_item">Marketing</a>
                                    <a href="#" className="item channel_item">Lifestyle</a>
                                    <a href="#" className="item channel_item">Photography</a>
                                    <a href="#" className="item channel_item">Health & Fitness</a>
                                    <a href="#" className="item channel_item">Music</a>
                                    <a href="#" className="item channel_item">Teaching & Academics</a>
                                </div>
                            </div>
                        </div>
                    </div> */}

        {/* <div className="search120">
                        <div className="ui search">
                            <div className="ui left icon input swdh10">
                                <input className="prompt srch10" type="text"
                                    placeholder="Search for Tuts Videos, Tutors, Tests and more.." />
                                <i className='uil uil-search-alt icon icon1'></i>
                            </div>
                        </div>
                    </div> */}
        <div className="header_right">
          <ul>
            {/* <li>
                                <a href="create_new_course.html" className="upload_btn" title="Create New Course">Create New Course</a>
                            </li>
                            <li>
                                <a href="shopping_cart.html" className="option_links" title="cart"><i
                                    className='uil uil-shopping-cart-alt'></i><span className="noti_count">2</span></a>
                            </li> */}

            {/* <li onClick={() => profiledropdown("messages")} className={profileDrop == "messages" ? "ui dropdown active visible" : "ui dropdown"}>
                                <a href="#" className="option_links" title="Messages"><i className='uil uil-envelope-alt'></i><span
                                    className="noti_count">3</span></a>
                                <div className={profileDrop == "messages" ? "menu dropdown_ms left transition visible d-block" : "menu dropdown_ms"}>
                                    <a href="#" className="channel_my item">
                                        <div className="profile_link">
                                            <img src="/static/images/left-imgs/img-6.jpg" alt="" />
                                            <div className="pd_content">
                                                <h6>Zoena Singh</h6>
                                                <p>Hi! Sir, How are you. I ask you one thing please explain it this video price.</p>
                                                <span className="nm_time">2 min ago</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="channel_my item">
                                        <div className="profile_link">
                                            <img src="/static/images/left-imgs/img-5.jpg" alt="" />
                                            <div className="pd_content">
                                                <h6>Joy Dua</h6>
                                                <p>Hello, I paid you video tutorial but did not play error 404.</p>
                                                <span className="nm_time">10 min ago</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="channel_my item">
                                        <div className="profile_link">
                                            <img src="/static/images/left-imgs/img-8.jpg" alt="" />
                                            <div className="pd_content">
                                                <h6>Jass</h6>
                                                <p>Thanks Sir, Such a nice video.</p>
                                                <span className="nm_time">25 min ago</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a className="vbm_btn" href="instructor_messages.html">View All <i
                                        className='uil uil-arrow-right'></i></a>
                                </div>
                            </li>
                            <li onClick={() => profiledropdown("notifications")} className={profileDrop == "notifications" ? "ui dropdown active visible" : "ui dropdown"}>
                                <a href="#" className="option_links" title="Notifications"><i className='uil uil-bell'></i><span
                                    className="noti_count">3</span></a>
                                <div className={profileDrop == "notifications" ? "menu dropdown_mn left transition visible d-block" : "menu dropdown_mn"}>
                                    <a href="#" className="channel_my item">
                                        <div className="profile_link">
                                            <img src="/static/images/left-imgs/img-1.jpg" alt="" />
                                            <div className="pd_content">
                                                <h6>Rock William</h6>
                                                <p>Like Your Comment On Video <strong>How to create sidebar menu</strong>.</p>
                                                <span className="nm_time">2 min ago</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="channel_my item">
                                        <div className="profile_link">
                                            <img src="/static/images/left-imgs/img-2.jpg" alt="" />
                                            <div className="pd_content">
                                                <h6>Jassica Smith</h6>
                                                <p>Added New Review In Video <strong>Full Stack PHP Developer</strong>.</p>
                                                <span className="nm_time">12 min ago</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="channel_my item">
                                        <div className="profile_link">
                                            <img src="/static/images/left-imgs/img-9.jpg" alt="" />
                                            <div className="pd_content">
                                                <p> Your Membership Approved <strong>Upload Video</strong>.</p>
                                                <span className="nm_time">20 min ago</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a className="vbm_btn" href="instructor_notifications.html">View All <i
                                        className='uil uil-arrow-right'></i></a>
                                </div>
                            </li> */}
            <li
              onClick={() => profiledropdown("profile")}
              className={
                profileDrop == "profile"
                  ? "ui dropdown active visible"
                  : "ui dropdown"
              }
            >
              <a
                href="#"
                className="opts_account"
                title="Account Information"
              >
                <img
                  src={
                    ProfileImg != ""
                      ? baseUrl.baseUrl + "media/" + ProfileImg
                      : "/static/images/hd_dp.jpg"
                  }
                  alt=""
                />
                {/* <img src={baseUrl.baseUrl + studentData.image} alt="" /> */}
              </a>
              <div
                className={
                  profileDrop == "profile"
                    ? "menu dropdown_account left transition visible d-block"
                    : "menu dropdown_account"
                }
              >
                <div className="channel_my">
                  <div className="profile_link">
                    <img
                      src={
                        ProfileImg != ""
                          ? baseUrl.baseUrl + "media/" + ProfileImg
                          : "/static/images/hd_dp.jpg"
                      }
                      alt=""
                    />
                    {/* <img src={baseUrl.baseUrl + studentData.image} alt="" /> */}
                    <div className="pd_content">
                      <div className="rhte85">
                        <h6 className="text-capitalize">
                          {FirstName + " " + LastName}
                        </h6>
                        <div className="mef78" title="Verify">
                          <i className="uil uil-check-circle"></i>
                        </div>
                      </div>
                      <span>
                        <a href="#" className="__cf_email__  text-capitalize">
                          {"Student"}
                        </a>
                      </span>
                    </div>
                  </div>
                  <Link href={"/student/profile"}>
                    <a href="#" className="dp_link_12">
                      View Profile
                    </a>
                  </Link>
                </div>

                <a
                  href="#"
                  onClick={() => {
                    toggle2(), setmodaltitle("Change Password");
                  }}
                  className="item channel_item"
                >
                  Change Password
                </a>

                {/* <div className="night_mode_switch__btn">
                                        <a href="#" id="night-mode" className="btn-night-mode">
                                            <i className="uil uil-moon"></i> Night mode
                                            <span className="btn-night-mode-switch">
                                                <span className="uk-switch-button"></span>
                                            </span>
                                        </a>
                                    </div> */}
                {/* <Link href={"/superAdmin/profile"}><a href="#" className="item channel_item">Profile</a></Link> */}
                {/* <a href="membership.html" className="item channel_item">Paid Memberships</a>
                                    <a href="setting.html" className="item channel_item">Setting</a>
                                    <a href="help.html" className="item channel_item">Help</a>
                                    <a href="feedback.html" className="item channel_item">Send Feedback</a> */}
                <a href="#" onClick={logout} className="item channel_item">
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </header>

      <nav
        className={
          Sidebar == "largeScreen"
            ? "vertical_nav vertical_nav__minify"
            : Sidebar == "smallScreen"
              ? "vertical_nav vertical_nav__opened"
              : "vertical_nav"
        }
      >
        <div className="left_section menu_left" id="js-menu">
          <div className="left_section">
            <ul>
              {/* <li className="menu--item">
                                    <Link href={"/student/dashboard"}>
                                        <a href="#" className={props.active == "dashboard" ?"menu--link active":"menu--link"} title="Dashboard">
                                            <i className='uil uil-home-alt menu--icon'></i>
                                            <i className="fas fa-home menu--icon d-flex justify-content-center align-items-center"></i>
                                            <span className="menu--label">Dashboard</span>
                                        </a>
                                    </Link>
                                </li> */}
              {/* <li className="menu--item">
                                    <Link href={"/teacher/courses"}>
                                        <a href="#" className={props.active == "courses" ?"menu--link active":"menu--link"} title="Courses">
                                            <i className="fab fa-leanpub menu--icon d-flex justify-content-center align-items-center"></i>
                                            <span className="menu--label">Courses</span>
                                        </a>
                                    </Link>
                                </li> */}
              <li className="menu--item">
                <Link href={"/student/currentAppointment"}>
                  <a
                    href="#"
                    className={
                      props.active == "currentAppointment"
                        ? "menu--link active"
                        : "menu--link"
                    }
                    title="Current Appointment"
                  >
                    <i className="fas fa-calendar-check menu--icon d-flex justify-content-center align-items-center"></i>
                    <span className="menu--label">Appointments</span>
                  </a>
                </Link>
              </li>

              <li className="menu--item">
                <Link href={"/student/packages"}>
                  <a
                    href="#"
                    className={
                      props.active == "packages"
                        ? "menu--link active"
                        : "menu--link"
                    }
                    title="Current Appointment"
                  >
                    {/* <i className="fas fa-calendar-check menu--icon d-flex justify-content-center align-items-center"></i> */}
                    <i className=" fas fa-box menu--icon d-flex justify-content-center align-items-center"></i>
                    <span className="menu--label">Packages</span>
                  </a>
                </Link>
              </li>

              {/* <li className="menu--item">
                          <Link href={"/student/prevAppointment"}>
                              <a href="#" className={props.active == "previousAppointment" ?"menu--link active":"menu--link"} title="Previous Appointment">            
                                  <i className="fas fa-calendar-times menu--icon d-flex justify-content-center align-items-center"></i>
                                  <span className="menu--label">Previous Appointment</span>
                              </a>
                          </Link>
                      </li> */}
              {/* <li className="menu--item">
                <Link href={"/student/packages"}>
                  <a
                    href="#"
                    className={
                      props.active == "packages"
                        ? "menu--link active"
                        : "menu--link"
                    }
                    title="Packages"
                  >
                    <i className="fas fa-cubes menu--icon d-flex justify-content-center align-items-center"></i>
                    <span className="menu--label">Packages</span>
                  </a>
                </Link>
              </li> */}

              {/* <li className="menu--item">
                                    <Link href={"/teacher/schedule"}>
                                        <a href="#" className={props.active == "schedule" ?"menu--link active":"menu--link"} title="Schedule">
                                            <i className="fas fa-clipboard-list menu--icon d-flex justify-content-center align-items-center"></i>
                                            <span className="menu--label">Schedule</span>
                                        </a>
                                    </Link>
                                </li> */}

              {/* <li className="menu--item">
                                    <a href="explore.html" className="menu--link" title="Explore">
                                        <i className='uil uil-search menu--icon'></i>
                                        <span className="menu--label">Teachers</span>
                                    </a>
                                 </Link>
                                </li>
                                <li onClick={() => dropdown("Categories")} className={drop == "Categories" ? "menu--item menu--item__has_sub_menu menu--subitens__opened" : "menu--item menu--item__has_sub_menu"}>
                                    <label className="menu--link" title="Categories">
                                        <i className='uil uil-layers menu--icon'></i>
                                        <span className="menu--label">Categories</span>
                                    </label>
                                    <ul className="sub_menu">
                                        <li className="sub_menu--item">
                                            <a href="#" className="sub_menu--link">Development</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="#" className="sub_menu--link">Business</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="#" className="sub_menu--link">Finance & Accounting</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="#.html" className="sub_menu--link">IT & Software</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="#" className="sub_menu--link">Office Productivity</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="#" className="sub_menu--link">Personal Development</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="#" className="sub_menu--link">Design</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="#" className="sub_menu--link">Marketing</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="#" className="sub_menu--link">Lifestyle</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="#" className="sub_menu--link">Photography</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="#" className="sub_menu--link">Health & Fitness</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="#" className="sub_menu--link">Music</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="#" className="sub_menu--link">Teaching & Academics</a>
                                        </li>
                                    </ul>
                                </li>
                                <li onClick={() => dropdown("Tests")} className={drop == "Tests" ? "menu--item menu--item__has_sub_menu menu--subitens__opened" : "menu--item menu--item__has_sub_menu"}>
                                    <label className="menu--link" title="Tests">
                                        <i className='uil uil-clipboard-alt menu--icon'></i>
                                        <span className="menu--label">Tests</span>
                                    </label>
                                    <ul className="sub_menu">
                                        <li className="sub_menu--item">
                                            <a href="certification_center.html" className="sub_menu--link">Certification Center</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="certification_start_form.html" className="sub_menu--link">Certification Fill
                                                Form</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="certification_test_view.html" className="sub_menu--link">Test View</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="certification_test__result.html" className="sub_menu--link">Test Result</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="http://www.gambolthemes.net/html-items/edututs+/Instructor_Dashboard/my_certificates.html"
                                                className="sub_menu--link">My Certification</a>
                                        </li>
                                    </ul>
                                </li>
                                <li onClick={() => dropdown("Pages")} className={drop == "Pages" ? "menu--item menu--item__has_sub_menu menu--subitens__opened" : "menu--item menu--item__has_sub_menu"}>
                                    <label className="menu--link" title="Pages">
                                        <i className='uil uil-file menu--icon'></i>
                                        <span className="menu--label">Pages</span>
                                    </label>
                                    <ul className="sub_menu">
                                        <li className="sub_menu--item">
                                            <a href="about_us.html" className="sub_menu--link">About</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="sign_in.html" className="sub_menu--link">Sign In</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="sign_up.html" className="sub_menu--link">Sign Up</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="sign_up_steps.html" className="sub_menu--link">Sign Up Steps</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="membership.html" className="sub_menu--link">Paid Membership</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="course_detail_view.html" className="sub_menu--link">Course Detail View</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="checkout_membership.html" className="sub_menu--link">Checkout</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="invoice.html" className="sub_menu--link">Invoice</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="career.html" className="sub_menu--link">Career</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="apply_job.html" className="sub_menu--link">Job Apply</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="our_blog.html" className="sub_menu--link">Our Blog</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="blog_single_view.html" className="sub_menu--link">Blog Detail View</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="company_details.html" className="sub_menu--link">Company Details</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="press.html" className="sub_menu--link">Press</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="live_output.html" className="sub_menu--link">Live Stream View</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="add_streaming.html" className="sub_menu--link">Add live Stream</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="search_result.html" className="sub_menu--link">Search Result</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="thank_you.html" className="sub_menu--link">Thank You</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="coming_soon.html" className="sub_menu--link">Coming Soon</a>
                                        </li>
                                        <li className="sub_menu--item">
                                            <a href="error_404.html" className="sub_menu--link">Error 404</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="left_section">
                            <h6 className="left_title">SUBSCRIPTIONS</h6>
                            <ul>
                                <li className="menu--item">
                                    <a href="instructor_profile_view.html" className="menu--link user_img">
                                        <img src="/static/images/left-imgs/img-1.jpg" alt="" />
                                        Rock Smith
                                        <div className="alrt_dot"></div>
                                    </a>
                                </li>
                                <li className="menu--item">
                                    <a href="instructor_profile_view.html" className="menu--link user_img">
                                        <img src="/static/images/left-imgs/img-2.jpg" alt="" />
                                        Jassica William
                                    </a>
                                    <div className="alrt_dot"></div>
                                </li>
                                <li className="menu--item">
                                    <a href="all_instructor.html" className="menu--link" title="Browse Instructors">
                                        <i className='uil uil-plus-circle menu--icon'></i>
                                        <span className="menu--label">Browse Instructors</span>
                                    </a>
                                </li> */}
            </ul>
          </div>
          <div className="left_section pt-2">
            <ul>
              <li className="menu--item">
                <Link href={"/student/profile"}>
                  <a
                    href="#"
                    className={
                      props.active == "profile"
                        ? "menu--link active"
                        : "menu--link"
                    }
                    title="Profile"
                  >
                    {/* <i className='uil uil-user menu--icon'></i> */}
                    <i className="fas fa-user menu--icon d-flex justify-content-center align-items-center"></i>
                    <span className="menu--label">Profile</span>
                  </a>
                </Link>
              </li>
              {/* <li className="menu--item">
                  <a onClick={backtoWeb} href="#" className="menu--link" title="website">
                      <i className='uil uil-sign-out-alt menu--icon'></i>
                      <i className="fas fa-globe menu--icon d-flex justify-content-center align-items-center"></i>
                      <span className="menu--label">Website</span>
                  </a>
              </li> */}
              <li className="menu--item">
                <a
                  onClick={logout}
                  href="#"
                  className="menu--link"
                  title="Logout"
                >
                  {/* <i className='uil uil-sign-out-alt menu--icon'></i> */}
                  <i className="fas fa-sign-out-alt menu--icon d-flex justify-content-center align-items-center"></i>
                  <span className="menu--label">Logout</span>
                </a>
              </li>
              {/* <li className="menu--item">
                                    <a href="help.html" className="menu--link" title="Help">
                                        <i className='uil uil-question-circle menu--icon'></i>
                                        <span className="menu--label">Help</span>
                                    </a>
                                </li>
                                <li className="menu--item">
                                    <a href="report_history.html" className="menu--link" title="Report History">
                                        <i className='uil uil-windsock menu--icon'></i>
                                        <span className="menu--label">Report History</span>
                                    </a>
                                </li>
                                <li className="menu--item">
                                    <a href="feedback.html" className="menu--link" title="Send Feedback">
                                        <i className='uil uil-comment-alt-exclamation menu--icon'></i>
                                        <span className="menu--label">Send Feedback</span>
                                    </a>
                                </li>  */}
            </ul>
          </div>
          <div className="left_footer">
            {/* <ul>
                                <li><a href="about_us.html">About</a></li>
                                <li><a href="press.html">Press</a></li>
                                <li><a href="contact_us.html">Contact Us</a></li>
                                <li><a href="coming_soon.html">Advertise</a></li>
                                <li><a href="coming_soon.html">Developers</a></li>
                                <li><a href="terms_of_use.html">Copyright</a></li>
                                <li><a href="terms_of_use.html">Privacy Policy</a></li>
                                <li><a href="terms_of_use.html">Terms</a></li>
                            </ul> */}

            {/* <div className="left_footer_content">
                                <p>© 2022 <strong>Tutor Book</strong>. All Rights Reserved.</p>
                            </div> */}
          </div>
        </div>
      </nav>

      <Modal
        className="text-center"
        isOpen={modal}
        toggle={toggle2}
        size="sm"
        centered={true}
      >
        <ModalHeader toggle={toggle2}> {modaltitle}</ModalHeader>
        <ModalBody className="text-left">
          <form>
            <div className="row form-row">
              <div className="col-12 col-sm-12">
                <div className="form-group">
                  <label className="label25 text-left">Old Password*</label>
                  <input
                    type="password"
                    value={OldPassword}
                    onChange={(e) => handleInputChange(e, setOldPassword)}
                    className="form-control"
                    placeholder="Write Old Password"
                  />
                </div>
              </div>
            </div>
            <div className="row form-row">
              <div className="col-12 col-sm-12">
                <div className="form-group">
                  <label className="label25 text-left">New Password*</label>
                  <input
                    type="password"
                    value={NewPassword}
                    onChange={(e) => handleInputChange(e, setNewPassword)}
                    className="form-control"
                    placeholder="Write New Password"
                  />
                </div>
              </div>
            </div>
            <div className="row form-row">
              <div className="col-12 col-sm-12">
                <div className="form-group">
                  <label className="label25 text-left">
                    Confirm New Password*
                  </label>
                  <input
                    type="password"
                    value={ConfirmNewPassword}
                    onChange={(e) =>
                      handleInputChange(e, setConfirmNewPassword)
                    }
                    className="form-control"
                    placeholder="Write Confirm New Password"
                  />
                </div>
              </div>
            </div>
            <div className="row text-center justify-content-end">
              <button
                type="button"
                onClick={() => toggle2()}
                className="col-3 main-btn cancel"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => forgot()}
                className="col-3 main-btn"
                disabled={ConfirmNewPassword == "" ? true : false}
              >
                Update
              </button>
            </div>
            {/* <button type="button" onClick={() => addCourses(Token)} className="login-btn btn-block">Add</button> */}
          </form>
        </ModalBody>
      </Modal>
    </>
  );

}
