import baseUrl from "../../../repositories/baseUrl"
import Swal from "sweetalert2"
import MaterialTable from "material-table";
import { Button, Form, Row, Col, FormGroup, Option, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from "react";
import { Loader } from 'react-overlay-loader'
import Router from 'next/router'

export default function BankDetail() {
    const [BankDetails, setBankDetails] = useState([]);
    const [Token, setToken] = useState(null);
    const [loader, setLoader] = useState(false);

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
    const [PackageType, setPackageType] = useState('');
    const [NoOfPeople, setNoOfPeople] = useState('')

    const [accountName, setaccountName] = useState('');
    const [accountNumber, setaccountNumber] = useState('');

    // add

    // edit 
    const [modal1, setModal1] = useState(false);
    const toggle1 = () => setModal1(!modal1);
    // edit 

    useEffect(() => {
        getBankDetail(localStorage.getItem("superAdminToken"));
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
    

    const getBankDetail = (token) => {
        setLoader(true);
        var requestOptions = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
        };
        fetch(`${baseUrl.baseUrl}webapi/bankDetails`, requestOptions)    
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    setBankDetails(result.data);
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
    
    const addBankDetailModal = () => {

        setaccountName("")
        setaccountNumber("")

        setmodaltitle("Add Bank Detail");
        setModal(true);
    }

    const editBankDetailModal = (Data) => {

        setaccountName(Data.accountname)
        setaccountNumber(Data.accountnumber)

        setmodaltitle("Edit Bank Detail");
        setModal1(true);
    }

    const addBankDetail = (token, bankstatus) => {
        setLoader(true)
        // toggle()
        if(bankstatus == "add"){
            toggle()
        }else{
            toggle1()
        }
        const form = new FormData()
        form.append("accountname", accountName)
        form.append("accountnumber", accountNumber)
        
        var requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/bankDetails`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    getBankDetail(Token);
                    setDisable(true)
                    // toggle()
                    if(bankstatus == "add"){
                        toggle()
                    }else{
                        toggle1()
                    }
                    Swal.fire({
                        title: "Success",
                        text: result.message,
                        icon: "success",
                        confirmButtonColor: "#ed2a26",
                    });
                }
                else {
                    // setModal(true)
                    if(bankstatus == "add"){
                        setModal(true)
                    }else{
                        setModal1(true)
                    }
                    Swal.fire({
                        title: "Oops",
                        text: result.message,
                        icon: "error",
                        confirmButtonColor: "#ed2a26",
                    });
                }
            })
            .catch(error => {
                // setModal(true)
                if(bankstatus == "add"){
                    setModal(true)
                }else{
                    setModal1(true)
                }
                setLoader(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                    confirmButtonColor: "#ed2a26",
                })
            });
    }

    //NOT IN USE
    const editPackages = (e) => {
        toggle1()
        setmodaltitle("Edit Package")
        setPackageId(e.pid)
        setPackagesName(e.packagename)
        setPackagesPrice(e.price)
        setPackagesSession(e.sessions)
        setPackagesDesc(e.desc)
        setPackageType(e.packagetype)
        setNoOfPeople(e.noOfpeople)

    }

     //NOT IN USE
    const editPackage = (token) => {
        setLoader(true)
        toggle1()
        const form = new FormData()
        form.append("pid", PackageId)
        form.append("packagename", PackagesName)
        form.append("desc", PackagesDesc)
        form.append("price", PackagesPrice)
        form.append("session", PackagesSession)
        form.append("packagetype", PackageType)
        if(PackageType === "Private"){
            form.append("noofpeople", 1)
        }else{
            form.append("noofpeople", 5)
        }   
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

    const deleteBankDetail = () => {
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
                // form.append("pid", courseId)
                var requestOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: "Bearer " + Token
                    },
                    // body: form,
                };
                // setLoader(true);
                fetch(`${baseUrl.baseUrl}webapi/bankDetails`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setLoader(false);
                        console.log(result);
                        if (result.status) {
                            getBankDetail(Token);
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

    // console.log("PackageType",PackageType)

    return (
        <>
            {loader == true ? <Loader fullPage loading /> : null}
            {/* mt-50 */}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 col-lg-8">
                        <div className="section3125">
                            <h4 className="item_title">Bank Detail</h4>
                            {
                                BankDetails.length === 0 &&
                                <button type="button" onClick={() => addBankDetailModal()} className="main-btn float-right">Add Detail</button>
                            }
                            <div className="la5lo1">
                                <div className="row">
                                    <div className="col-md-12 item">
                                        <MaterialTable
                                            columns={[
                                                // {title: 'Profile', field: 'Profile', render: item => <img src={baseUrl.baseUrl +'media/' +item.Profile} alt="" border="3" height="40" width="40" style={{ borderRadius: '50%'}} />},
                                                
                                                { title: 'Account Name', field: 'accountname' },
                                                { title: 'Account Number', field: 'accountnumber' },

                                                // { title: 'Description', field: 'desc' },
                                                // { title: 'People', field: 'noOfpeople' },
                                                
                                            ]}
                                            actions={[
                                            rowData => ({
                                                    icon: 'edit',
                                                    tooltip: 'edit Package',
                                                    onClick: (event, rowData) => editBankDetailModal(rowData)
                                                }),
                                                {
                                                    icon: 'delete',
                                                    tooltip: 'delete Package',
                                                    onClick: (event, rowData) => deleteBankDetail()
                                                },
                                                
                                            ]}
                                            data={BankDetails}
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

            {/* ADD Modal in Use  */}
            
            <Modal className='text-center' isOpen={modal} toggle={toggle} size="md" centered={true}>
                <ModalHeader toggle={toggle}  > {modaltitle}</ModalHeader>
                <ModalBody className='text-left'>
                    <form>
                        <div className="row form-row">
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Account Name*</label>
                                    <input type="text" value={accountName} onChange={(e) => handleInputChange(e, setaccountName)} className="form-control" placeholder='Account Name' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Account Number*</label>
                                    <input type="text" value={accountNumber} onChange={(e) => handleInputChange(e, setaccountNumber)} className="form-control" placeholder='Account Number' />
                                </div>
                            </div>
                            
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle()} className="col-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => addBankDetail(Token,"add")} className="col-2 main-btn" disabled={Disable}>Add</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
             {/* ADD Modal in Use  */}

              {/* EDIT Modal in Use  */}
            <Modal className='text-center' isOpen={modal1} toggle={toggle1} size="md" centered={true}>
                <ModalHeader toggle={toggle1}  > {modaltitle}</ModalHeader>
                <ModalBody className='text-left'>
                    <form>
                    <div className="row form-row">
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Account Name*</label>
                                    <input type="text" value={accountName} onChange={(e) => handleInputChange(e, setaccountName)} className="form-control" placeholder='Account Name' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Account Number*</label>
                                    <input type="text" value={accountNumber} onChange={(e) => handleInputChange(e, setaccountNumber)} className="form-control" placeholder='Account Number' />
                                </div>
                            </div>
                            
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle1()} className="col-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => addBankDetail(Token, "update")} className="col-2 main-btn" disabled={Disable}>Update</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
             {/*  EDIT Modal in Use  */}
        </>
    )

}