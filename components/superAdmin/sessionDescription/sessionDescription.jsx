import baseUrl from "../../../repositories/baseUrl"
import Swal from "sweetalert2"
import MaterialTable from "material-table";
import { Button, Form, Row, Col, FormGroup, Option, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from "react";
import { Loader } from 'react-overlay-loader'
import Router from 'next/router'

export default function SessionDescription() {

    const [SessionDescription, setSessionDescription] = useState([]);
    const [Token, setToken] = useState(null);
    const [loader, setLoader] = useState(false);

    // add
    const [Disable, setDisable] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [modaltitle, setmodaltitle] = useState('');

    const [BannerId, setBannerId] = useState('');
    const [SessionId, setSessionId] = useState('')
    const [PackagesName, setPackagesName] = useState('');
    const [PackagesPrice, setPackagesPrice] = useState('');
    const [PackagesSession, setPackagesSession] = useState('');
    const [PackagesDesc, setPackagesDesc] = useState('');
    const [PackageType, setPackageType] = useState('');
    const [NoOfPeople, setNoOfPeople] = useState('')

    const [SessionType, setSessionType] = useState('');
    const [SessionDesc, setSessionDesc] = useState('');
    const [BannerType, setBannerType] = useState('');
    const [shortPara, setshortPara] = useState('');
    const [CourseFile, setCourseFile] = useState("");
    const [UpdateCourseFile, setUpdateCourseFile] = useState(null);


    // add

    // edit 
    const [modal1, setModal1] = useState(false);
    const toggle1 = () => setModal1(!modal1);
    // edit 

    useEffect(() => {
        // getBannerContent(localStorage.getItem("superAdminToken"));
        getSessionContent()
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


    const getSessionContent = (token) => {
        setLoader(true);
        var requestOptions = {
            method: 'GET',
            // headers: {
            //     Authorization: "Bearer " + token
            // }
        };
        fetch(`${baseUrl.baseUrl}webapi/sessionDescription`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    setSessionDescription(result.data);
                }
                else {
                    if (result.message == "token is expire") {
                        Router.push("/superAdmin/auth/login")
                    }else{
                        setSessionDescription(result.data);
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
   

   

    const editSessionContent = (e) => {
        toggle1()
        setmodaltitle("Edit Session")
        setSessionId(e.id)

        setSessionType(e.sessiontype)
        setSessionDesc(e.desc)
        // setshortPara(e.shortpara)

    }

    const editSession = (token) => {
        setLoader(true)
        toggle1()
        const form = new FormData()
        form.append("sessiontype", SessionType)
        form.append("desc", SessionDesc)
        
        var requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/sessionDescription`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    setDisable(true)
                    getSessionContent();
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
                    icon: 'error',
                    text: error.message,
                    confirmButtonColor: "#ed2a26",
                })
            });
    }

    
    // console.log("Packages",BackgroundImages)

    return (
        <>
            {loader == true ? <Loader fullPage loading /> : null}
            {/* mt-50 */}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 col-lg-8">
                        <div className="section3125">
                            <h4 className="item_title">Session</h4>
                            {/* <button type="button" onClick={() => addBannerModal()} className="main-btn float-right">Add Content</button> */}
                            <div className="la5lo1">
                                <div className="row">
                                    <div className="col-md-12 item">
                                        <MaterialTable
                                            columns={[
                                               
                                                { title: 'Type', field: 'sessiontype' },
                                                { title: 'Description', field: 'desc' },
                                                // { title: 'Short Para', field: 'shortpara' },
                                                
                                            ]}
                                            actions={[
                                                {
                                                    icon: 'edit',
                                                    tooltip: 'Edit Banner',
                                                    onClick: (event, rowData) => editSessionContent(rowData)
                                                },
                                                // rowData => ({
                                                //     icon: 'delete',
                                                //     tooltip: 'Delete User',
                                                //     onClick: (event, rowData) => deleteBanner(rowData.id),
                                                // })
                                            ]}
                                            data={SessionDescription}
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


            <Modal className='text-center' isOpen={modal1} toggle={toggle1} size="md" centered={true}>
                <ModalHeader toggle={toggle1}> {modaltitle}</ModalHeader>
                <ModalBody className='text-left'>
                    <form>
                        <div className="row form-row">
                            <div className="col-12 col-sm-12">
                                <div className="form-group">
                                    <label className="label25 text-left">Sesson Type*</label>
                                    {/* <label>Course Tittle</label> */}
                                    
                                    <input type="text" value={SessionType} readOnly className="form-control" placeholder='Write Banner Tittle' />
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
                        <div className="row form-row">
                            <div className="col-12 col-sm-12">
                                <div className="form-group">
                                    <label className="label25 text-left">Session Description*</label>
                                    {/* <label>Course Tittle</label> */}
                                    
                                    <textarea type="text" value={SessionDesc} onChange={(e)=>handleInputChange(e, setSessionDesc)} className="form-control" placeholder='Write Banner Tittle' />
                                </div>
                            </div>
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle1()} className="col-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => editSession(Token)} className="col-2 main-btn" disabled={Disable}>Update</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )

}