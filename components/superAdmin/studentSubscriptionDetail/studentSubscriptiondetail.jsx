import baseUrl from "../../../repositories/baseUrl"
import Swal from "sweetalert2"
import MaterialTable from "material-table";
import { Button, Form, Row, Col, FormGroup, Option, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from "react";
import { Loader } from 'react-overlay-loader'
import Router from 'next/router'

export default function StudentSubscription({user_ID}) {
    // destructing of props.user_ID
    // console.log("data",user_ID)
    const [Packages, setPackages] = useState([]);
    const [AllPackage, setAllPackage] = useState([]);
    const [Token, setToken] = useState(null);
    const [loader, setLoader] = useState(false);

    // add
    const [Disable, setDisable] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [modaltitle, setmodaltitle] = useState('');

    const [SubscriptionId, setSubscriptionId] = useState('');
    const [PackagesName, setPackagesName] = useState('');
    const [PackagesPrice, setPackagesPrice] = useState('');
    const [TotalSession, setTotalSession] = useState('');
    const [useSession, setuseSession] = useState('');
    const [creationDate, setcreationDate] = useState('');
    const [PackagesDesc, setPackagesDesc] = useState('');
    const [PackageType, setPackageType] = useState('');
    const [NoOfPeople, setNoOfPeople] = useState('')

    const [PackageID, setPackageID] = useState('');
    const [StudentID, setStudentID] = useState('');

    // console.log("PackageID",PackageID)

    // add

    // edit 
    const [modal1, setModal1] = useState(false);
    const toggle1 = () => setModal1(!modal1);
    // edit 

    useEffect(() => {
        getPackages(localStorage.getItem("superAdminToken"));
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
    

    const getPackages = (token) => {
        setLoader(true);
        var requestOptions = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
        };
        if(user_ID == undefined){
            Router.push('/superAdmin/studentDetail')
        }
        else{
            fetch(`${baseUrl.baseUrl}webapi/studentDetails?all=&userid=${user_ID}`, requestOptions)    
                .then(response => response.json())
                .then(result => {
                    setLoader(false);
                    console.log(result);
                    if (result.status) {
                        setPackages(result.data);
                        setAllPackage(result.allPackages)
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
    }
    
    useEffect(()=>{
        if(AllPackage.length == 0 && Packages.length == 0 ||Packages == undefined){

        }else{
            Packages.map((a)=>{
            const index = AllPackage.findIndex(packagename => packagename.packagename == a.packagename);

            // console.log("index",index)

            AllPackage.splice(index,1)
            })
        }
        // console.log("AllPackage",AllPackage)
        // console.log("Packages",Packages)
    },[AllPackage])

    const addPackageModal = () => {
        setPackageID("")

        // setPackagesName("")
        // setPackagesPrice("")
        // setTotalSession("")
        // setPackageType("")
        // setPackagesDesc("")
        // setNoOfPeople("")

        setmodaltitle("Add Package");
        setModal(true);
    }

    const addPackage = (token) => {
        setLoader(true)
        toggle()
        const form = new FormData()
        form.append("packageid", PackageID)
        form.append("studentid", user_ID)
        // form.append("price", PackagesPrice)
        // form.append("sessions", TotalSession)
       
        var requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/studentDetails`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    getPackages(Token);
                    setDisable(true);
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
        setmodaltitle("Edit  Subscription")
        setSubscriptionId(e.subscriptionId)
        setPackagesName(e.packagename)
        setTotalSession(e.totalSessions)
        setPackageType(e.packagetype)
        setuseSession(e.useSession)
        setcreationDate(e.creation)
        // setPackagesPrice(e.price)
        // setPackagesDesc(e.desc)
        // setNoOfPeople(e.noOfpeople)

    }

    const editPackage = (token) => {
        setLoader(true)
        toggle1()
        const form = new FormData()
        form.append("subscriptionId", SubscriptionId)
        form.append("totalsessions", TotalSession)
        
        
        var requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + token
            },
            body: form,
        };
        // setLoader(true); 
        fetch(`${baseUrl.baseUrl}webapi/studentDetails`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    getPackages(Token);
                    toggle1()
                    setDisable(true);
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

    // Not in USe
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

    // console.log("PackageType",PackageType)

    return (
        <>
            {loader == true ? <Loader fullPage loading /> : null}
            {/* mt-50 */}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 col-lg-8">
                        <div className="section3125">
                            <h4 className="item_title">Subscription Detail</h4>
                            <button type="button" onClick={() => addPackageModal()} className="main-btn float-right">Add</button>
                            <div className="la5lo1">
                                <div className="row">
                                    <div className="col-md-12 item">
                                        <MaterialTable
                                            columns={[
                                                // {title: 'Profile', field: 'Profile', render: item => <img src={baseUrl.baseUrl +'media/' +item.Profile} alt="" border="3" height="40" width="40" style={{ borderRadius: '50%'}} />},
                                                
                                                { title: 'Package Name', field: 'packagename' },
                                                { title: 'Package Type', field: 'packagetype' },
                                                { title: 'Total Sessions', field: 'totalSessions' },
                                                { title: 'Use Session', field: 'useSession' },
                                                { title: 'Package Creation', field: 'creation' },
                                                // { title: 'Description', field: 'desc' },
                                                // { title: 'People', field: 'noOfpeople' },
                                                
                                            ]}
                                            actions={[
                                                {
                                                    icon: 'edit',
                                                    tooltip: 'Edit',
                                                    onClick: (event, rowData) => editPackages(rowData)
                                                },
                                                rowData => ({
                                                    icon: 'receipt',
                                                    tooltip: 'invooice',
                                                    onClick: (event, rowData) => Router.push({pathname:'/superAdmin/invoice',query:{user_Id: rowData.Studentid,creation: rowData.creation, packagename:rowData.packagename,price:rowData.price}} ),
                                                })
                                                // rowData => ({
                                                //     icon: 'edit',
                                                //     tooltip: 'Edit',
                                                //     // onClick: (event, rowData) => deletePackage(rowData.pid),
                                                // })
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

            {/* in Use  */}
            
            <Modal className='text-center' isOpen={modal} toggle={toggle} size="md" centered={true}>
                <ModalHeader toggle={toggle}  > {modaltitle}</ModalHeader>
                <ModalBody className='text-left'>
                    <form>
                        <div className="row form-row">
                            {/* <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Package Name*</label>
                                    <input type="text" value={PackagesName} onChange={(e) => handleInputChange(e, setPackagesName)} className="form-control" placeholder='Write package name' />
                                </div>
                            </div> */}
                            {/* <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Package Description*</label>
                                    <input type="text" value={PackagesDesc} onChange={(e) => handleInputChange(e, setPackagesDesc)} className="form-control" placeholder='Write package description' />
                                </div>
                            </div> */}
                           
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                        <label className="label25 text-left">Package Type*</label>
                                        <select className="form-select " onChange={(e)=> handleInputChange(e, setPackageID)} name="package-type" id="package-type">
                                            <option value="">Select Type</option>
                                        {
                                            AllPackage.map(e=>(
                                                <>
                                                 <option value={e.pid} > {`${e.packagename}  (${e.packagetype})`}</option>
                                                   
                                                </>
                                            
                                            ))
                                        }
                                        </select>
                                    {/* <input type="number" value={PackageType} onChange={(e) => handleInputChange(e, setPackageType)} className="form-control" placeholder='Write package type' /> */}
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
             {/* in Use  */}

              {/* In Use  */}
            <Modal className='text-center' isOpen={modal1} toggle={toggle1} size="md" centered={true}>
                <ModalHeader toggle={toggle1}  > {modaltitle}</ModalHeader>
                <ModalBody className='text-left'>
                    <form>
                        <div className="row form-row">
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Package Name*</label>
                                    <input type="text" readOnly value={PackagesName} className="form-control" placeholder='Write package name' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Package Type*</label>
                                    <input type="text" value={PackageType} readOnly className="form-control" placeholder='Write package description' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Use Sessions*</label>
                                    <input type="number" value={useSession} readOnly className="form-control" placeholder='Write package sessions' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Creation Date*</label>
                                    <input type="date" value={creationDate} readOnly className="form-control" placeholder='Write package sessions' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Total Sessions*</label>
                                    <input type="number" value={TotalSession} onChange={(e) => handleInputChange(e, setTotalSession)} className="form-control" placeholder='Write package price' />
                                </div>
                            </div>

                            {/* <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="label25 text-left">Package Type*</label>
                                    <select value={PackageType} className="form-select" onChange={(e)=> handleInputChange(e, setPackageType)} name="package-type" id="package-type">
                                        <option value="">select type</option>
                                        <option value="Private">Private</option>
                                        <option value="Shared">Shared</option>
                                        
                                    </select>
                                    <input type="number" value={PackageType} onChange={(e) => handleInputChange(e, setPackageType)} className="form-control" placeholder='Write package type' />
                                </div>
                            </div> */}
                          
                        </div>
                        <div className="row text-center justify-content-end">
                            <button type="button" onClick={() => toggle1()} className="col-2 main-btn cancel">Close</button>
                            <button type="button" onClick={() => editPackage(Token)} className="col-2 main-btn" disabled={Disable}>Update</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
             {/* in Use  */}
        </>
    )

}