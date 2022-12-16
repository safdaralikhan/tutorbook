
// This file is copied from superAdmin Packages, changes required according to student Packages..!!!

import baseUrl from "../../../repositories/baseUrl"
import Swal from "sweetalert2"
import MaterialTable from "material-table";
import { Button, Form, Row, Col, FormGroup, Option, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from "react";
import { Loader } from 'react-overlay-loader'
import Router from 'next/router'

export default function Packages() {

    const [statusCheck, setstatusCheck] = useState(false)
    const [Packages, setPackages] = useState([]);
    const [Token, setToken] = useState(null);
    const [loader, setLoader] = useState(false);

    // setstatusCheck(!statusCheck)

    // add
    const [Disable, setDisable] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [modaltitle, setmodaltitle] = useState('');

    const [PackageId, setPackageId] = useState('');
    const [PackagesName, setPackagesName] = useState('');
    const [PackagesPrice, setPackagesPrice] = useState('');
    const [PackagesSession, setPackagesSession] = useState('');
    const [PackagesDesc, setPackagesDesc] = useState('');

    // add

    // edit 
    const [modal1, setModal1] = useState(false);
    const toggle1 = () => setModal1(!modal1);
    // edit 

    useEffect(() => {
        getPackages(localStorage.getItem("studentToken"));
        setToken(localStorage.getItem("studentToken"))
    }, [])

    const handleInputChange = (e, func) => {
        if (e.target.value == "") {
            setDisable(true);
        } else {
            setDisable(false);
        }
        func(e.target.value)
    }

    const getPackages = (token) => {
        
        setLoader(true);
        var requestOptions = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
        };
        fetch(`${baseUrl.baseUrl}clientside/studentSubscriptionCheckout`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    setPackages(result.data);
                }
                else {
                    if (result.message == "token is expire") {
                        Router.push("/student/auth/login")
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
    const addPackageModal = () => {
        setPackagesName("")
        setPackagesPrice("")
        setPackagesSession("")
        setPackagesDesc("")

        setmodaltitle("Add Package");
        setModal(true);
    }

    const addPackage = (token) => {
        setLoader(true)
        toggle()
        const form = new FormData()
        form.append("packagename", PackagesName)
        form.append("desc", PackagesDesc)
        form.append("price", PackagesPrice)
        form.append("sessions", PackagesSession)
        var requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/package`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    getPackages(Token);
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

    const editPackages = (e) => {
        toggle1()
        setmodaltitle("Edit Package")
        setPackageId(e.pid)
        setPackagesName(e.packagename)
        setPackagesPrice(e.price)
        setPackagesSession(e.sessions)
        setPackagesDesc(e.desc)

    }

    const editPackage = (token) => {
        setLoader(true)
        toggle1()
        const form = new FormData()
        form.append("pid", PackageId)
        form.append("packagename", PackagesName)
        form.append("desc", PackagesDesc)
        form.append("price", PackagesPrice)
        form.append("session", PackagesSession)
        var requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/package`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    getPackages(Token);
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

    const deletePackage = (courseId) => {
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
                form.append("pid", courseId)
                var requestOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: "Bearer " + Token
                    },
                    body: form,
                };
                // setLoader(true);
                fetch(`${baseUrl.baseUrl}webapi/package`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setLoader(false);
                        console.log(result);
                        if (result.status) {
                            getPackages(Token);
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
                            <h4 className="item_title">Packages</h4>
                            {/* <button type="button" onClick={() => addPackageModal()} className="main-btn float-right">Add Packages</button> */}
                            <div className="la5lo1">
                                <div className="row">
                                    <div className="col-md-12 item">
                                        <MaterialTable
                                            columns={[
                                             
                                                { title: 'Package Name', field: 'packagename' },
                                                { title: 'Sessions', field: 'totalSessions' }, 
                                                { title: 'Use Session', field: 'useSession' },
                                                { title: 'Creation Date', field: 'creation' },
                                            ]}
                                            actions={[
                                                rowData => ({
                                                    icon: 'check',
                                                    tooltip: 'Active ',
                                                    hidden: rowData.status == 'False' 
                                                  }),
                                                  rowData => ({
                                                    icon: 'cancel',
                                                    tooltip: 'Disabled',
                                                    hidden: rowData.status == 'True'
                                                  })
                                            ]}
                                            data={Packages}
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
                                    <label className="label25 text-left">Package Name*</label>
                                    <input type="text" value={PackagesName} onChange={(e) => handleInputChange(e, setPackagesName)} className="form-control" placeholder='Write package name' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Package Description*</label>
                                    <input type="text" value={PackagesDesc} onChange={(e) => handleInputChange(e, setPackagesDesc)} className="form-control" placeholder='Write package description' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Package Price*</label>
                                    <input type="number" value={PackagesPrice} onChange={(e) => handleInputChange(e, setPackagesPrice)} className="form-control" placeholder='Write package price' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Package Sessions*</label>
                                    <input type="number" value={PackagesSession} onChange={(e) => handleInputChange(e, setPackagesSession)} className="form-control" placeholder='Write package sessions' />
                                </div>
                            </div>
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle()} className="col-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => addPackage(Token)} className="col-2 main-btn" disabled={Disable}>Add</button>
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
                                    <label className="label25 text-left">Package Name*</label>
                                    <input type="text" value={PackagesName} onChange={(e) => handleInputChange(e, setPackagesName)} className="form-control" placeholder='Write package name' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Package Description*</label>
                                    <input type="text" value={PackagesDesc} onChange={(e) => handleInputChange(e, setPackagesDesc)} className="form-control" placeholder='Write package description' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Package Price*</label>
                                    <input type="number" value={PackagesPrice} onChange={(e) => handleInputChange(e, setPackagesPrice)} className="form-control" placeholder='Write package price' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Package Sessions*</label>
                                    <input type="number" value={PackagesSession} onChange={(e) => handleInputChange(e, setPackagesSession)} className="form-control" placeholder='Write package sessions' />
                                </div>
                            </div>
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle1()} className="col-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => editPackage(Token)} className="col-2 main-btn" disabled={Disable}>Update</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )

}