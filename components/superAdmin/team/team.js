import baseUrl from "../../../repositories/baseUrl"
import Swal from "sweetalert2"
import MaterialTable from "material-table";
import { Button, Form, Row, Col, FormGroup, Option, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from "react";
import { Loader } from 'react-overlay-loader'
import Router from 'next/router'

export default function Team() {
    const [TeamContent, setTeamContent] = useState([]);
    const [Token, setToken] = useState(null);
    const [loader, setLoader] = useState(false);

    // add
    const [Disable, setDisable] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [modaltitle, setmodaltitle] = useState('');

    const [BannerId, setBannerId] = useState('');
    const [PackagesName, setPackagesName] = useState('');
    const [PackagesPrice, setPackagesPrice] = useState('');
    const [PackagesSession, setPackagesSession] = useState('');
    const [PackagesDesc, setPackagesDesc] = useState('');
    const [PackageType, setPackageType] = useState('');
    const [NoOfPeople, setNoOfPeople] = useState('')

    const [CourseType, setCourseType] = useState('');
    const [CourseId, setCourseId] = useState('');
    const [MemberName, setMemberName] = useState('');
    const [shortPara, setshortPara] = useState('');
    const [CourseFile, setCourseFile] = useState("");
    const [UpdateCourseFile, setUpdateCourseFile] = useState(null);


    // add

    // edit 
    const [modal1, setModal1] = useState(false);
    const toggle1 = () => setModal1(!modal1);
    // edit 

    useEffect(() => {
        getBannerContent(localStorage.getItem("superAdminToken"));
        setToken(localStorage.getItem("superAdminToken"))
    }, [])

    const handleInputChange = (e, func) => {
        if (e.target.value == "") {
            setDisable(true);
        }else {
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
                text: "plz select your image less then and equals to 1mb",
                icon: "warning",
                confirmButtonColor: "#ed2a26",
            });
        } else {
            setDisable(false);

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


    const getBannerContent = (token) => {
        setLoader(true);
        var requestOptions = {
            method: 'GET',
            // headers: {
            //     Authorization: "Bearer " + token
            // }
        };
        fetch(`${baseUrl.baseUrl}webapi/team`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    setTeamContent(result.data);
                }
                else {
                    if (result.message == "token is expire") {
                        Router.push("/superAdmin/auth/login")
                    }else{
                        setTeamContent(result.data);
                    }
                    // else {
                    //     Swal.fire({
                    //         title: "Oops",
                    //         text: result.message,
                    //         icon: "error",
                    //         confirmButtonColor: "#ed2a26",
                    //     });
                    // }
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
    const addMemberModal = () => {


        setMemberName("")
        // setshortPara("")
        setUpdateCourseFile(null);

        setmodaltitle("Add Member ");
        setModal(true);
    }

    const addMember = (token) => {
        setLoader(true)
        toggle()
        const form = new FormData()
        form.append("name", MemberName)
        form.append("profileimg", CourseFile)
       
        var requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/team`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    getBannerContent(Token);
                    toggle()
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
                setModal(true)
                setLoader(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                    confirmButtonColor: "#ed2a26",
                })
            });
    }

    const editMemberContent = (e) => {
        toggle1()
        setmodaltitle("Edit Member")
        setBannerId(e.id)

        setMemberName(e.name)
        setUpdateCourseFile(baseUrl.baseUrl + "media/" +e.profileimg)

    }

    const editMember = (token) => {
        setLoader(true)
        toggle1()
        const form = new FormData()
        form.append("profileimg", CourseFile)
        form.append("name", MemberName)
        form.append("personid", BannerId)
        
        var requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/team`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    setDisable(true)
                    getBannerContent(Token);
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

    const deleteMember = (id) => {
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
                form.append("personid", id)
                var requestOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: "Bearer " + Token
                    },
                    body: form,
                };
                // setLoader(true);
                fetch(`${baseUrl.baseUrl}webapi/team`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setLoader(false);
                        console.log(result);
                        if (result.status) {
                            getBannerContent(Token);
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

    // console.log("Packages",TeamContent)

    return (
        <>
            {loader == true ? <Loader fullPage loading /> : null}
            {/* mt-50 */}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 col-lg-8">
                        <div className="section3125">
                            <h4 className="item_title">Team Members</h4>
                            <button type="button" onClick={() => addMemberModal()} className="main-btn float-right">Add Member</button>
                            <div className="la5lo1">
                                <div className="row">
                                    <div className="col-md-12 item">
                                        <MaterialTable
                                            columns={[
                                                {title: 'Member Image', field: 'profileimg', render: item => <img src={baseUrl.baseUrl +'media/' +item.profileimg} alt="" border="3" height="60" width="60" style={{ borderRadius: '50%'}} />},
                                                { title: 'Member Name', field: 'name' },
                                                // { title: 'Short Para', field: 'shortpara' },
                                                
                                            ]}
                                            actions={[
                                                {
                                                    icon: 'edit',
                                                    tooltip: 'Edit Member',
                                                    onClick: (event, rowData) => editMemberContent(rowData)
                                                },
                                                rowData => ({
                                                    icon: 'delete',
                                                    tooltip: 'Delete Member',
                                                    onClick: (event, rowData) => deleteMember(rowData.id),
                                                })
                                            ]}
                                            data={TeamContent}
                                            options={{
                                                headerStyle: {
                                                    backgroundColor: '#ED2A26',
                                                    color: '#FFF'
                                                },
                                                actionsColumnIndex: -1
                                            }}
                                            title=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal className='text-center' isOpen={modal} toggle={toggle} size="md" centered={true}>
                <ModalHeader toggle={toggle}  > {modaltitle}</ModalHeader>
                <ModalBody className='text-left'>
                    <form>
                        <div className="row form-row">
                            <div className="col-12 col-sm-12">
                                <div className="form-group">
                                    <label className="label25 text-left">Member Name*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input value={MemberName} type="text" onChange={(e) => handleInputChange(e, setMemberName)} className="form-control" placeholder='Write Member Name ' />
                                </div>
                            </div>
                            
                        </div>
                        {/* <div className="row form-row">
                            <div className="col-12 col-sm-12">
                                    <div className="form-group">
                                        <label className="label25 text-left">Short Para*</label>
                                        <label>Course Tittle</label>
                                        <textarea value={shortPara} type="text" onChange={(e) => handleInputChange(e, setshortPara)} className="form-control" placeholder='Write Short Para' />
                                    </div>
                            </div>
                        </div> */}
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
                                    <label className="label25 text-left"> Thumbnail*</label>
                                    <div className="thumb-item">
                                        <img src={UpdateCourseFile ? UpdateCourseFile : "/static/images/thumbnail-demo.jpg"} alt="" />
                                        <div className="thumb-dt">
                                            <div className="upload-btn">
                                                <input onChange={(e) => handleInputFileChange(e, setCourseFile)} className="uploadBtn-main-input" type="file" id="ThumbFile__input--source" />
                                                <label htmlFor="ThumbFile__input--source" title="Select Thumbnail">Choose Thumbnail</label>
                                            </div>
                                            <span className="uploadBtn-main-file">Size: 416x601 pixels.
                                                Supports: jpg,jpeg, or png</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle()} className="col-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => addMember(Token)} className="col-2 main-btn" disabled={Disable}>Add</button>
                        </div>
                        {/* <button type="button" onClick={() => addCourses(Token)} className="login-btn btn-block">Add</button> */}
                    </form>
                </ModalBody>
            </Modal>

            <Modal className='text-center' isOpen={modal1} toggle={toggle1} size="md" centered={true}>
                <ModalHeader toggle={toggle1}> {modaltitle}</ModalHeader>
                <ModalBody className='text-left'>
                    <form>
                        <div className="row form-row">
                            <div className="col-12 col-sm-12">
                                <div className="form-group">
                                    <label className="label25 text-left">Member Name*</label>
                                    {/* <label>Course Tittle</label> */}
                                    <input type="text" value={MemberName} onChange={(e) => handleInputChange(e, setMemberName)} className="form-control" placeholder='Write Banner Tittle' />
                                </div>
                            </div>
                            
                        </div>
                        {/* <div className="row form-row">
                            <div className="col-12 col-sm-12">
                                    <div className="form-group">
                                        <label className="label25 text-left">Short Para*</label>
                                        <label>Course Tittle</label>
                                        <textarea value={shortPara} type="text" onChange={(e) => handleInputChange(e, setshortPara)} className="form-control" placeholder='Write Short Para' />
                                    </div>
                            </div>
                        </div> */}
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
                                    <label className="label25 text-left">Thumbnail*</label>
                                    <div className="thumb-item">
                                        <img style={{width:'416px',height:'601px'}} src={UpdateCourseFile ? UpdateCourseFile : "/static/images/thumbnail-demo.jpg"} alt="" />
                                        <div className="thumb-dt">
                                            <div className="upload-btn">
                                                <input onChange={(e) => handleInputFileChange(e, setCourseFile)} className="uploadBtn-main-input" type="file" id="ThumbFile__input--source" />
                                                <label htmlFor="ThumbFile__input--source" title="Select Thumbnail">Choose Thumbnail</label>
                                            </div>
                                            <span className="uploadBtn-main-file">Size:  416x601 pixels.
                                                 Supports: jpg,jpeg, or png</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle1()} className="col-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => editMember(Token)} className="col-2 main-btn" disabled={Disable}>Update</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )

}