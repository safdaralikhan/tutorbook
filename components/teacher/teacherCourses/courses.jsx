import baseUrl from "../../../repositories/baseUrl"
import Swal from "sweetalert2"
import { Button, Form, Row, Col, FormGroup, Option, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from "react";
import { Loader } from 'react-overlay-loader'
import Router from "next/router"
import SkeletonCard from "../../skeletonLoading/SkeletonLoading";

export default function TeacherCourses() {
    const [Courses, setCourses] = useState([]);
    const [Token, setToken] = useState(null);
    const [loader, setLoader] = useState(false);
    const [TeacherData, setTeacherData] = useState(null);

    // add
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [modaltitle, setmodaltitle] = useState('');

    const [CourseType, setCourseType] = useState('');
    const [CourseId, setCourseId] = useState('');
    const [CourseTittle, setCourseTittle] = useState('');
    const [CourseFile, setCourseFile] = useState("");
    const [UpdateCourseFile, setUpdateCourseFile] = useState(null);


    console.log("Courses", Courses)
    console.log("CourseType", CourseType)
    console.log("CourseTittle", CourseTittle)
    console.log("CourseFile", CourseFile)

    // add

    // edit 
    const [modal1, setModal1] = useState(false);
    const toggle1 = () => setModal1(!modal1);
    // edit 

    useEffect(() => {
        getCourses(localStorage.getItem("teacherToken"));
        setToken(localStorage.getItem("teacherToken"))
        setTeacherData(JSON.parse(localStorage.getItem("teacherData")))
    }, [])

    const handleInputChange = (e, func) => {
        func(e.target.value)
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
            var url = reader.readAsDataURL(file);
            // console.log(url)
            reader.onloadend = function (e) {
                setUpdateCourseFile(reader.result);
                setCourseFile(file);

                // console.log("data-======>",reader.result)
            };
            // console.log(selectProfileImage)
            func(event.target.files[0])
            // setdisable(false)
        }
    }


    const getCourses = (token) => {
        setLoader(true);
        var requestOptions = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
        };
        fetch(`${baseUrl.baseUrl}webapi/teacherCourses`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    setCourses(result.data);
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
    const addCoursesModal = () => {
        setUpdateCourseFile(null);
        setCourseFile("");
        setmodaltitle("Add Course");
        setModal(true);
    }

    const addCourses = (token) => {
        setLoader(true)
        toggle()
        const form = new FormData()
        form.append("coursetitle", CourseTittle)
        form.append("typeofCourse", CourseType)
        form.append("thumbnail", CourseFile)
        var requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/coursecreation`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    getCourses(Token);
                    toggle()
                    Swal.fire({
                        title: "Success",
                        text: result.message,
                        icon: "success",
                        confirmButtonColor: "#ed2a26",
                    });
                }
                else {
                    toggle()
                    Swal.fire({
                        title: "Oops",
                        text: result.message,
                        icon: "error",
                        confirmButtonColor: "#ed2a26",
                    });
                }
            })
            .catch(error => {
                toggle()
                setLoader(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                    confirmButtonColor: "#ed2a26",
                })
            });
    }

    const editCourse = (e) => {
        setCourseFile("");
        setUpdateCourseFile(null);
        toggle1()
        setmodaltitle("Edit Course")
        setCourseTittle(e.coursetitle)
        setCourseType(e.typeofCourse)
        // setCourseFile(e.thumbnail)
        setUpdateCourseFile(baseUrl.baseUrl + "media/" + e.thumbnail)
        setCourseId(e.courseid)
    }

    const editCourses = (token, courseId) => {
        setLoader(true)
        toggle1()
        const form = new FormData()
        form.append("coursetitle", CourseTittle)
        form.append("typeofCourse", CourseType)
        form.append("thumbnail", CourseFile)
        form.append("courseid", CourseId)
        var requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/coursecreation`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    getCourses(Token);
                    setUpdateCourseFile(null);
                    toggle1()
                    Swal.fire({
                        title: "Success",
                        text: result.message,
                        icon: "success",
                        confirmButtonColor: "#ed2a26",
                    });
                }
                else {
                    toggle1()
                    Swal.fire({
                        title: "Oops",
                        text: result.message,
                        icon: "error",
                        confirmButtonColor: "#ed2a26",
                    });
                }
            })
            .catch(error => {
                toggle1()
                setLoader(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                    confirmButtonColor: "#ed2a26",
                })
            });
    }

    const deleteCourses = (courseId) => {
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
                form.append("courseid", courseId)
                var requestOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: "Bearer " + Token
                    },
                    body: form,
                };
                // setLoader(true);
                fetch(`${baseUrl.baseUrl}webapi/coursecreation`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setLoader(false);
                        console.log(result);
                        if (result.status) {
                            getCourses(Token);
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
            {/* {loader == true ? <Loader fullPage loading /> : null} */}
            {/* mt-50 */}
            <div className="section3125">
                <h4 className="item_title">Courses</h4>
                {/* <a href="#" className="see150">See all</a> */}
                {/* <a href="#" onClick={() => addCoursesModal()} className="see150">Add Course</a> */}
                <div className="la5lo1">
                    {loader ? <SkeletonCard /> :
                        <div className="row">
                            {Courses.map((e) =>
                                <div key={e.courseid} className="col-md-4 item">
                                    <div className="fcrse_1 mb-20 shadow" style={{ borderRadius: 10 }}>
                                        <a href="#" className="fcrse_img">
                                            <img src={baseUrl.baseUrl + "media/" + e.thumbnail} alt="" />
                                            <div className="course-overlay">
                                                <div className="badge_seller">{e.typeofCourse}</div>
                                                <div className="crse_reviews">
                                                    <i className='uil uil-star'></i>4.5
                                                </div>
                                                {/* <span className="play_btn1"><i className="uil uil-play"></i></span> */}
                                                {/* <div className="crse_timer">
                                                            25 hours
                                                        </div> */}
                                            </div>
                                        </a>
                                        <div className="fcrse_content">
                                            {/* <div className="eps_dots more_dropdown">
                                                <a href="#"><i className='uil uil-ellipsis-v'></i></a>
                                                <div className="dropdown-content">
                                                    <span onClick={() => Router.push({ pathname: "/teacher/schedule", query: { courseId: e.courseid } })}><i className='fas fa-clipboard-list'></i>Schedule</span>
                                                </div>
                                            </div> */}
                                            <div className="vdtodtcustom">
                                                <span className="vdt14 text-capitalize">{e.coursetitle}</span>
                                            </div>
                                            {
                                                e.desc == "" && <p className="cr1fot">No Description</p>
                                            }
                                            {
                                                <p className="cr1fot" data-toggle="tooltip" title={e.desc}>
                                                    {e.desc.length >= 40 ? e.desc.slice(0, 40) + '...' : e.desc}
                                                </p>
                                            }

                                            {/* <a href="#" className="mt-4 crse14s text-capitalize">{e.coursetitle}</a> */}

                                            {/* <a href="#" className="crse-cate">{e.typeofCourse}</a> */}
                                            {/* <div className="auth1lnkprce">
                                                        <p className="cr1fot">By <a href="#">John Doe</a></p>
                                                        <div className="prce142">$10</div>
                                                        <button className="shrt-cart-btn" title="cart"><i
                                                            className="uil uil-shopping-cart-alt"></i></button>
                                                    </div> */}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <button onClick={() => Router.push({ pathname: "/teacher/schedule", query: { courseId: e.courseid } })} className="main-btn w-100"><i className='fas fa-clipboard-list'></i> Schedule</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
            <Modal className='text-center' isOpen={modal} toggle={toggle} size="md" centered={true}>
                <ModalHeader toggle={toggle}  > {modaltitle}</ModalHeader>
                <ModalBody className='text-left'>
                    <form>
                        <div className="row form-row">
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Course Tittle*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="text" onChange={(e) => handleInputChange(e, setCourseTittle)} className="form-control" placeholder='Write course tittle' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Type of Course*</label>
                                    {/* <label>Type of Course</label> */}
                                    <select onChange={(e) => handleInputChange(e, setCourseType)} className="form-control">
                                        <option value={""}>-- Select --</option>
                                        <option value={"Theory"}>Theory</option>
                                        <option value={"Language"}>Language</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <div className='row'>
                            <div className="col-12 col-sm-12">
                                <div className="form-group">
                                    <label>Image</label>
                                    <input type="file" onChange={(e) => handleInputFileChange(e, setCourseFile)} className="form-control" />
                                </div>
                            </div>
                        </div> */}
                        <div className="thumbnail-into">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <label className="label25 text-left">Course thumbnail*</label>
                                    <div className="thumb-item">
                                        <img src={UpdateCourseFile ? UpdateCourseFile : "/static/images/thumbnail-demo.jpg"} alt="" />
                                        <div className="thumb-dt">
                                            <div className="upload-btn">
                                                <input onChange={(e) => handleInputFileChange(e, setCourseFile)} className="uploadBtn-main-input" type="file" id="ThumbFile__input--source" />
                                                <label htmlFor="ThumbFile__input--source" title="Select Thumbnail">Choose Thumbnail</label>
                                            </div>
                                            <span className="uploadBtn-main-file">Size: 590x300 pixels.
                                                Supports: jpg,jpeg, or png</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle()} className="col-md-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => addCourses(Token)} className="col-md-2 main-btn">Add</button>
                        </div>
                        {/* <button type="button" onClick={() => addCourses(Token)} className="login-btn btn-block">Add</button> */}
                    </form>
                </ModalBody>
            </Modal>

            <Modal className='text-center' isOpen={modal1} toggle={toggle1} size="md" centered={true}>
                <ModalHeader toggle={toggle1}  > {modaltitle}</ModalHeader>
                <ModalBody className='text-left'>
                    <form>
                        <div className="row form-row">
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Course Tittle*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="text" value={CourseTittle} onChange={(e) => handleInputChange(e, setCourseTittle)} className="form-control" placeholder='Write course tittle' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Type of Course</label>
                                    {/* <label>Type of Course</label> */}
                                    <select value={CourseType} onChange={(e) => handleInputChange(e, setCourseType)} className="form-control">
                                        <option value={""}>-- Select --</option>
                                        <option value={"Theory"}>Theory</option>
                                        <option value={"Language"}>Language</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <div className='row'>
                            <div className="col-12 col-sm-12">
                            <div className="form-group">
                                    <label>Image</label>
                                    <input type="file" onChange={(e) => handleInputFileChange(e, setCourseFile)} className="form-control" />
                                    </div>
                                    </div>
                                </div> */}
                        <div className="thumbnail-into">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <label className="label25 text-left">Course thumbnail*</label>
                                    <div className="thumb-item">
                                        <img src={UpdateCourseFile ? UpdateCourseFile : "/static/images/thumbnail-demo.jpg"} alt="" />
                                        <div className="thumb-dt">
                                            <div className="upload-btn">
                                                <input onChange={(e) => handleInputFileChange(e, setCourseFile)} className="uploadBtn-main-input" type="file" id="ThumbFile__input--source" />
                                                <label htmlFor="ThumbFile__input--source" title="Select Thumbnail">Choose Thumbnail</label>
                                            </div>
                                            <span className="uploadBtn-main-file">Size: 590x300 pixels.
                                                Supports: jpg,jpeg, or png</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle1()} className="col-md-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => editCourses(Token)} className="col-md-2 main-btn">Update</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )

}