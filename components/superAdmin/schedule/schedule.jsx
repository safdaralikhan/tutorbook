import baseUrl from "../../../repositories/baseUrl"
import Swal from "sweetalert2"
import MaterialTable from "material-table";
import { Button, Form, Row, Col, FormGroup, Option, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from "react";
import { Loader } from 'react-overlay-loader'
import Router from 'next/router'

export default function Schedule() {
    const [Schedule, setSchedule] = useState([]);
    const [Token, setToken] = useState(null);
    const [loader, setLoader] = useState(false);

    // add
    const [Disable, setDisable] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [modaltitle, setmodaltitle] = useState('');

    const [ScheduleId, setScheduleId] = useState('');
    const [StartTime, setStartTime] = useState('');
    const [PackagesPrice, setPackagesPrice] = useState('');
    const [PackagesSession, setPackagesSession] = useState('');
    const [EndTime, setEndTime] = useState('');

    // add

    // edit 
    const [modal1, setModal1] = useState(false);
    const toggle1 = () => setModal1(!modal1);
    // edit 

    useEffect(() => {
        getSchedule(localStorage.getItem("superAdminToken"));
        setToken(localStorage.getItem("superAdminToken"))
    }, [])

    const handleInputChange = (e, func) => {
        if (e.target.value == "") {
            setDisable(true);
        } else {
            setDisable(false);
        }
        func(e.target.value)
    }

    const getSchedule = (token) => {
        setLoader(true);
        var requestOptions = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
        };
        fetch(`${baseUrl.baseUrl}webapi/adminslots`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log("Schedules",result);
                if (result.status) {
                    setSchedule(result.data);
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
    const addScheduleModal = () => {
        setStartTime("")
        setEndTime("")

        setmodaltitle("Add Schedule");
        setModal(true);
    }

    const addSchedule = (token) => {
        setLoader(true)
        toggle()
        const form = new FormData()
        form.append("starttime", StartTime)
        form.append("endtime", EndTime)
        var requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/adminslots`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    getSchedule(Token);
                    toggle()
                    Swal.fire({
                        title: "Success",
                        text: result.message,
                        icon: "success",
                        confirmButtonColor: "#ed2a26",
                    });
                }
                else {
                    setModal(true);
                    Swal.fire({
                        title: "Oops",
                        text: result.message,
                        icon: "error",
                        confirmButtonColor: "#ed2a26",
                    });
                }
            })
            .catch(error => {
                setModal(true);
                setLoader(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                    confirmButtonColor: "#ed2a26",
                })
            });
    }

    const editSchedules = (e) => {

        // console.log("stime split",e.starttime.split(":"))
        // let split = e.starttime.split(":")
        // console.log(split.slice(0,2))
        // let split2 = split.slice(0,2)
        // console.log(split2[0],":",split2[1])
        // let split3 = `${split2[0]}:${split2[1]}`
        // console.log(split3)


        setScheduleId(e.adminscheduleid)
        setStartTime(e.starttime)
        setEndTime(e.endtime)

        toggle1()
        setmodaltitle("Edit Schedule")

    }

    const editSchedule = (token) => {
        setLoader(true)
        toggle1()
        const form = new FormData()
        form.append("scheduleid", ScheduleId)
        form.append("starttime", StartTime)
        form.append("endtime", EndTime)
        var requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/adminslots`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    getSchedule(Token);
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

    const deleteSchedule = (courseId) => {
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
                form.append("scheduleid", courseId)
                var requestOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: "Bearer " + Token
                    },
                    body: form,
                };
                // setLoader(true);
                fetch(`${baseUrl.baseUrl}webapi/adminslots`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setLoader(false);
                        console.log(result);
                        if (result.status) {
                            getSchedule(Token);
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
            {/* mt-50 */}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 col-lg-8">
                        <div className="section3125">
                            <h4 className="item_title">Schedule</h4>
                            <button type="button" onClick={() => addScheduleModal()} className="main-btn float-right">Add Schedule</button>
                            <div className="la5lo1">
                                <div className="row">
                                    <div className="col-md-12 item">
                                        <MaterialTable
                                            columns={[
                                                { title: 'Start Time', field: 'starttime' },
                                                { title: 'End Time', field: 'endtime' },
                                            ]}
                                            actions={[
                                                {
                                                    icon: 'edit',
                                                    tooltip: 'Edit Schedule',
                                                    onClick: (event, rowData) => editSchedules(rowData)
                                                },
                                                rowData => ({
                                                    icon: 'delete',
                                                    tooltip: 'Delete Schedule',
                                                    onClick: (event, rowData) => deleteSchedule(rowData.adminscheduleid),
                                                })
                                            ]}
                                            data={Schedule}
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
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Start Time*</label>
                                    <input type="time" value={StartTime} onChange={(e) => handleInputChange(e, setStartTime)} className="form-control" placeholder='Write package name' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">End Time*</label>
                                    <input type="time" value={EndTime} onChange={(e) => handleInputChange(e, setEndTime)} className="form-control" placeholder='Write package description' />
                                </div>
                            </div>
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle()} className="col-md-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => addSchedule(Token)} className="col-md-2 main-btn" disabled={Disable}>Add</button>
                        </div>
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
                                    <label className="label25 text-left">Start Time*</label>
                                    <input type="time" value={StartTime} onChange={(e) => handleInputChange(e, setStartTime)} className="form-control" placeholder='Write package name' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">End Time*</label>
                                    <input type="time" value={EndTime} onChange={(e) => handleInputChange(e, setEndTime)} className="form-control" placeholder='Write package description' />
                                </div>
                            </div>
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle1()} className="col-md-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => editSchedule(Token)} className="col-md-2 main-btn" disabled={Disable}>Update</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )

}