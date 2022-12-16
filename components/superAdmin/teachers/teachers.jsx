import baseUrl from "../../../repositories/baseUrl"
import Swal from "sweetalert2"
import { Button, Form, Row, Col, FormGroup, Option, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from "react";
import { Loader } from 'react-overlay-loader'
import Router from "next/router";
import SkeletonCard from "../../skeletonLoading/SkeletonLoading";

export default function Teacher() {


    const [AllTeachers, setAllTeachers] = useState([]);
    const [Token, setToken] = useState(null);
    const [loader, setLoader] = useState(false);
    const [Skeletonloader, setSkeletonloader] = useState(true);
    const [Disable, setDisable] = useState(true);

    // add
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [modaltitle, setmodaltitle] = useState('');

    const [CourseType, setCourseType] = useState('');

    const [CourseTittle, setCourseTittle] = useState('');

    const [TeacherId, setTeacherId] = useState('');
    const [TeacherFile, setTeacherFile] = useState("");
    const [UpdateTeacherFile, setUpdateTeacherFile] = useState(null);

    //  ADD Teacher
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    // const [Profile, setProfile] = useState('');
    const [Age, setAge] = useState('');
    const [shortDesc, setshortDesc] = useState('');
    const [Description, setDescription] = useState('');


    // console.log("Courses", Courses)
    console.log("CourseType", CourseType)
    console.log("CourseTittle", CourseTittle)
    // console.log("CourseFile", CourseFile)

    // add

    // edit 
    const [modal1, setModal1] = useState(false);
    const toggle1 = () => setModal1(!modal1);
    // edit 

    const handleInputChange = (e, func) => {
        if (e.target.value == "") {
            setDisable(true);
        } else {
            setDisable(false);
        }
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
                text: "Plz select your image less then and equals to 1mb",
                icon: "warning",
                confirmButtonColor: "#ed2a26",
            });
        } else {
            setDisable(false);
            var url = reader.readAsDataURL(file);
            // console.log(url)
            reader.onloadend = function (e) {
                setUpdateTeacherFile(reader.result);
                setTeacherFile(file);

                // console.log("data-======>",reader.result)
            };
            // console.log(selectProfileImage)
            func(event.target.files[0])
            // setdisable(false)
        }
    }


    useEffect(() => {
        getCourses(localStorage.getItem("superAdminToken"));
        setToken(localStorage.getItem("superAdminToken"))
    }, [])

    const getCourses = (token) => {
        setSkeletonloader(true);
        var requestOptions = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
        };
        fetch(`${baseUrl.baseUrl}webapi/teacherCreation`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setSkeletonloader(false);
                console.log(result);
                if (result.status) {
                    setAllTeachers(result.data);
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
                setSkeletonloader(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                    confirmButtonColor: "#ed2a26",
                })
            });
    }

    //      ADD Teacher
    const addTeachersModal = () => {
        setFirstName('')
        setLastName('')
        setEmail('');
        setPassword('')
        setAge('')
        setshortDesc('')
        setDescription('')
        setDisable(true)

        setUpdateTeacherFile(null);
        setTeacherFile("");
        setmodaltitle("Add Teacher");
        setModal(true);
    }

    const addTeachers = (token) => {
        setLoader(true)
        toggle()
        const form = new FormData()
        form.append("Fname", FirstName)
        form.append("Lname", LastName)
        form.append("Email", Email)
        form.append("Password", Password)
        form.append("profile", TeacherFile)
        form.append("Age", Age)
        form.append("shortdesc", shortDesc)
        form.append("description", Description)
        var requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/teacherCreation`, requestOptions)
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
                    setFirstName('')
                    setLastName('')
                    setEmail('');
                    setPassword('')
                    setAge('')
                    setshortDesc('')
                    setDescription('')
                    setTeacherFile('')
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
                toggle()
                setLoader(false);
                Swal.fire({
                    title: 'Oops...',
                    text: error,
                    icon: 'error',
                    confirmButtonColor: "#ed2a26",
                })
            });
    }

    // Edit Teacher 

    const editTeacher = (e) => {
        setDisable(true)
        setTeacherFile("");
        setUpdateTeacherFile(null);
        toggle1()
        setmodaltitle("Edit Tutor")
        // setCourseTittle(e.coursetitle)
        // setCourseType(e.typeofCourse)
        setFirstName(e.Fname)
        setLastName(e.Lname)
        setEmail(e.Email)
        setAge(e.Age)
        setshortDesc(e.shortdesc)
        setDescription(e.description)
        // setCourseFile(e.thumbnail)
        setUpdateTeacherFile(baseUrl.baseUrl + "media/" + e.Profile)
        setTeacherId(e.tid)
    }

    const editTeachers = (token, teacherId) => {
        setLoader(true)
        toggle1()
        const form = new FormData()
        form.append("Fname", FirstName)
        form.append("Lname", LastName)
        form.append("Email", Email)
        form.append("profile", TeacherFile)
        form.append("Age", Age)
        form.append("shortdesc", shortDesc)
        form.append("description", Description)
        form.append("tid", TeacherId)
        var requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/teacherCreation`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    getCourses(Token);
                    setUpdateTeacherFile(null);
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
                    title: 'Oops...',
                    text: error,
                    icon: 'error',
                    confirmButtonColor: "#ed2a26",
                })
            });
    }

    // Delete Teacher 
    const deleteTeachers = (courseId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoader(true)
                const form = new FormData()
                form.append("tid", courseId)
                var requestOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: "Bearer " + Token
                    },
                    body: form,
                };
                // setLoader(true);
                fetch(`${baseUrl.baseUrl}webapi/teacherCreation`, requestOptions)
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
            {loader ? <Loader fullPage loading /> : null}
            <div className="section3125">
                <h4 className="item_title">Tutors</h4>
                {/* <a href="#" className="see150">See all</a> */}
                <button type="button" onClick={() => addTeachersModal()} className="main-btn float-right">Add Tutor</button>
                <div className="la5lo1">
                {Skeletonloader ? <SkeletonCard /> : 
                    <div className="row">
                        {
                            AllTeachers.map(e => (
                                <>
                                    <div key={e.tid} className="col-md-3 item">
                                        <div className="fcrse_1 mb-20 shadow " style={{ borderRadius: 12 }}>
                                            <div className="tutor_img">
                                                <a onClick={() => Router.push({ pathname: "/superAdmin/teacherAppointment", query: { teachid: e.tid } })} href="#"><img
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
                                                <div className="tutor_cate" data-toggle="tooltip" title={e.description}>{e.description.length > 20? e.description.slice(0, 25)+"...":e.description}</div>
                                                <ul className="tutor_social_links">
                                                    {/* <li><a href="#" className="fb"><i className="fab fa-facebook-f"></i></a>
                                    </li>
                                    <li><a href="#" className="tw"><i className="fab fa-twitter"></i></a></li> */}
                                                    <li><a role='button' data-toggle="tooltip" title="edit" data-placement="auto" className="tw"><i className="uil uil-edit" onClick={() => editTeacher(e)}></i></a>
                                                    </li>
                                                    <li><a role='button' data-toggle="tooltip" title="delete" data-placement="auto" className="yu"><i className="uil uil-trash" onClick={() => deleteTeachers(e.tid)}></i></a></li>


                                                </ul>
                                                {/*  */}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }

                    </div>
                }
                </div>
            </div>

            {/* ADD Teacher  */}
            <Modal className='text-center' isOpen={modal} toggle={toggle} size="lg" scrollable={true} centered={true}>
                <ModalHeader toggle={toggle}  > {modaltitle}</ModalHeader>
                <ModalBody className='text-left'>
                    <form>
                        <div className="row form-row">
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">First Name*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="text" value={FirstName} onChange={(e) => handleInputChange(e, setFirstName)} className="form-control" placeholder='Write First Name' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Last Name*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="text" value={LastName} onChange={(e) => handleInputChange(e, setLastName)} className="form-control" placeholder='Write Last Name' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Email*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="text" value={Email} onChange={(e) => handleInputChange(e, setEmail)} className="form-control" placeholder='Write Email' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Password*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="password" value={Password} onChange={(e) => handleInputChange(e, setPassword)} className="form-control" placeholder='Write Password' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Age*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="number" value={Age} onChange={(e) => handleInputChange(e, setAge)} className="form-control" placeholder='Write Age' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Expertise*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="text" value={shortDesc} onChange={(e) => handleInputChange(e, setshortDesc)} className="form-control" placeholder='Write Expertise' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-12">
                                <div className="form-group">
                                    <label className="label25 text-left">Description*</label>
                                    {/* <label>Course Tittle</label> */}
                                    {/* <input type="text" value={Description} onChange={(e) => handleInputChange(e, setDescription)} className="form-control" placeholder='Write Description' />  */}
                                    <div className="ui form swdh30">
                                        <div className="field">
                                            <textarea rows="3" value={Description} onChange={(e) => handleInputChange(e, setDescription)} name="description" id="id_about" placeholder="Write a little description..."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Type of Course*</label>
                                    <label>Type of Course</label>
                                    <select onChange={(e) => handleInputChange(e, setCourseType)} className="form-control">
                                        <option value={""}>-- Select --</option>
                                        <option value={"Theory"}>Theory</option>
                                        <option value={"Language"}>Language</option>
                                    </select>
                                </div>
                            </div> */}
                        </div>

                        <div className="thumbnail-into">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <label className="label25 text-left">Tutor Profile*</label>
                                    <div className="thumb-item">
                                        <img src={UpdateTeacherFile ? UpdateTeacherFile : "/static/images/thumbnail-demo.jpg"} alt="" />
                                        <div className="thumb-dt">
                                            <div className="upload-btn">
                                                <input onChange={(e) => handleInputFileChange(e, setTeacherFile)} className="uploadBtn-main-input" type="file" id="ThumbFile__input--source" />
                                                <label htmlFor="ThumbFile__input--source" title="profile">Choose Profile</label>
                                            </div>
                                            <span className="uploadBtn-main-file">Size: 590x300 pixels.
                                                Supports: jpg,jpeg, or png</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle()} className="col-sm-2 mt-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => addTeachers(Token)} className="col-sm-2 mt-2 main-btn" disabled={Disable}>Add</button>
                        </div>
                        {/* <button type="button" onClick={() => addCourses(Token)} className="login-btn btn-block">Add</button> */}
                    </form>
                </ModalBody>
            </Modal>

            {/* /// Update Teacher  */}

            <Modal className='text-center' isOpen={modal1} toggle={toggle1} scrollable={true} size="lg" centered={true}>
                <ModalHeader toggle={toggle1}  > {modaltitle}</ModalHeader>
                <ModalBody className='text-left'>
                    <form>
                        <div className="row form-row">

                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">First Name*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="text" value={FirstName} onChange={(e) => handleInputChange(e, setFirstName)} className="form-control" placeholder='Write First Name' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Last Name*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="text" value={LastName} onChange={(e) => handleInputChange(e, setLastName)} className="form-control" placeholder='Write Last Name' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Email*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="text" value={Email} onChange={(e) => handleInputChange(e, setEmail)} className="form-control" placeholder='Write Email' />
                                </div>
                            </div>

                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Age*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="number" value={Age} onChange={(e) => handleInputChange(e, setAge)} className="form-control" placeholder='Write Age' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Expertise*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="text" value={shortDesc} onChange={(e) => handleInputChange(e, setshortDesc)} className="form-control" placeholder='Write Expertise' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Description*</label>
                                    {/* <label>Course Tittle</label> */}
                                    {/* <input type="text" value={Description} onChange={(e) => handleInputChange(e, setDescription)} className="form-control" placeholder='Write Description' /> */}
                                    <div className="ui form swdh30">
                                        <div className="field">
                                            <textarea rows="3" value={Description} onChange={(e) => handleInputChange(e, setDescription)} name="description" id="id_about" placeholder="Write a little description..."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Type of Course</label>
                                    <label>Type of Course</label>
                                    <select value={CourseType} onChange={(e) => handleInputChange(e, setCourseType)} className="form-control">
                                        <option value={""}>-- Select --</option>
                                        <option value={"Theory"}>Theory</option>
                                        <option value={"Language"}>Language</option>
                                    </select>
                                </div>
                            </div> */}
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
                                    <label className="label25 text-left">Tutor Profile*</label>
                                    <div className="thumb-item">
                                        <img src={UpdateTeacherFile ? UpdateTeacherFile : "/static/images/thumbnail-demo.jpg"} alt="" />
                                        <div className="thumb-dt">
                                            <div className="upload-btn">
                                                <input onChange={(e) => handleInputFileChange(e, setTeacherFile)} className="uploadBtn-main-input" type="file" id="ThumbFile__input--source" />
                                                <label htmlFor="ThumbFile__input--source" title="profile">Choose Profile</label>
                                            </div>
                                            <span className="uploadBtn-main-file">Size: 590x300 pixels.
                                                Supports: jpg,jpeg, or png</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle1()} className="col-sm-2 mt-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => editTeachers(Token)} className="mt-2  col-sm-2 main-btn" disabled={Disable}>Update</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )
}