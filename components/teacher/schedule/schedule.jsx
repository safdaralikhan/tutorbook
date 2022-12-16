import React, { useEffect, useState } from "react";
import baseUrl from "../../../repositories/baseUrl";
// import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Button, Form, Row, Col, FormGroup, Option, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from "sweetalert2";
import { Loader } from "react-overlay-loader";
import Router from "next/router";
import { useRouter } from "next/router";

export default function Schedule() {
    const Router = useRouter();
    const [loader, setLoader] = useState(false);
    const [Token, setToken] = useState(null);
    const [TeacherData, setTeacherData] = useState(null);
    const [WeeksDuration, setWeeksDuration] = useState([]);
    const [btnStatus, setbtnStatus] = useState(false);

    // console.log("WeeksDuration",WeeksDuration)
    // console.log("Router", Router)

    useEffect(() => {
        if (Router.query.courseId == undefined) {
            Router.push("/teacher/dashboard")
        } else {
            getSchedule(localStorage.getItem("teacherToken"), JSON.parse(localStorage.getItem("teacherData")))
        }
        setToken(localStorage.getItem("teacherToken"))
        setTeacherData(JSON.parse(localStorage.getItem("teacherData")))
    }, [])

    const getSchedule = (token, teacherData) => {
        console.log("teacherData", teacherData)
        setLoader(true);
        var requestOptions = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
        };
        fetch(`${baseUrl.baseUrl}webapi/teacherSchedule?teacherid=${teacherData?.id}&courseid=${Router.query.courseId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    setWeeksDuration(result.data);
                    setMondayShedules(result.data.monday_Duration);
                    setTuesdayShedules(result.data.tuesday_Duration);
                    setWednesdayShedules(result.data.wednesday_Duration);
                    setThursdayShedules(result.data.thursday_Duration);
                    setFridayShedules(result.data.friday_Duration);
                    setSaturdayShedules(result.data.saturday_Duration);
                    setSundayShedules(result.data.sunday_Duration);

                    if(result.data.monday_Duration.length == 0 && result.data.tuesday_Duration.length == 0 && 
                        result.data.wednesday_Duration.length == 0 && result.data.thursday_Duration.length == 0 && result.data.friday_Duration.length == 0 && result.data.saturday_Duration.length == 0 && result.data.sunday_Duration.length == 0){
                            setbtnStatus(true);
                        }
                    else{
                        setbtnStatus(false);
                    }
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

    const addAndeditSchedule = () => {
        setLoader(true);
        const form = new FormData()
        form.append("monday", JSON.stringify(MondayShedules))
        form.append("tuesday", JSON.stringify(TuesdayShedules))
        form.append("wednesday", JSON.stringify(WednesdayShedules))
        form.append("thursday", JSON.stringify(ThursdayShedules))
        form.append("friday", JSON.stringify(FridayShedules))
        form.append("saturday", JSON.stringify(SaturdayShedules))
        form.append("sunday", JSON.stringify(SundayShedules))
        form.append("courseid", Router.query.courseId)
        var requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + Token
            },
            body: form,
        };
        fetch(`${baseUrl.baseUrl}webapi/teacherSchedule`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);
                if (result.status) {
                    getSchedule(Token, TeacherData)
                    Swal.fire({
                        title: "Success",
                        text: result.message,
                        icon: "success",
                        confirmButtonColor: "#ed2a26",
                    });
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

    // monday
    const [MondayShedules, setMondayShedules] = useState([{ starttime: '', endtime: '' }])
    // console.log("MondayShedules", MondayShedules)

    const InputChangeHandle = (e, index) => {
        const { name, value, files, type } = e.target;
        const list = [...MondayShedules];
        list[index][name] = value;
        setMondayShedules(list);
    }

    const handleAddClick = () => {
        setMondayShedules([...MondayShedules, {}]);
    }
    const handleRemoveClick = (index) => {
        MondayShedules.splice(index, 1);
        setMondayShedules([...MondayShedules]);
    }
    // monday

    // tuesday
    const [TuesdayShedules, setTuesdayShedules] = useState([{ starttime: '', endtime: '' }])
    // console.log("TuesdayShedules", TuesdayShedules)

    const InputChangeHandle1 = (e, index) => {
        const { name, value, files, type } = e.target;
        const list1 = [...TuesdayShedules];
        list1[index][name] = value;
        setTuesdayShedules(list1);
    }

    const handleAddClick1 = () => {
        setTuesdayShedules([...TuesdayShedules, {}]);
    }
    const handleRemoveClick1 = (index) => {
        TuesdayShedules.splice(index, 1)
        setTuesdayShedules([...TuesdayShedules])
    }
    // tuesday

    // wednesday
    const [WednesdayShedules, setWednesdayShedules] = useState([{ starttime: '', endtime: '' }])
    // console.log("WednesdayShedules", WednesdayShedules)

    const InputChangeHandle2 = (e, index) => {
        const { name, value, files, type } = e.target;
        const list2 = [...WednesdayShedules];
        list2[index][name] = value;
        setWednesdayShedules(list2);
    }

    const handleAddClick2 = () => {
        setWednesdayShedules([...WednesdayShedules, {}]);
    }
    const handleRemoveClick2 = (index) => {
        WednesdayShedules.splice(index, 1)
        setWednesdayShedules([...WednesdayShedules])
    }
    // wednesday

    // thursday
    const [ThursdayShedules, setThursdayShedules] = useState([{ starttime: '', endtime: '' }])
    // console.log("ThursdayShedules", ThursdayShedules)

    const InputChangeHandle3 = (e, index) => {
        const { name, value, files, type } = e.target;
        const list3 = [...ThursdayShedules];
        list3[index][name] = value;
        setThursdayShedules(list3);
    }

    const handleAddClick3 = () => {
        setThursdayShedules([...ThursdayShedules, {}]);
    }
    const handleRemoveClick3 = (index) => {
        ThursdayShedules.splice(index, 1)
        setThursdayShedules([...ThursdayShedules])
    }
    // thursday

    // friday
    const [FridayShedules, setFridayShedules] = useState([{ starttime: '', endtime: '' }])
    //  console.log("FridayShedules", FridayShedules)

    const InputChangeHandle4 = (e, index) => {
        const { name, value, files, type } = e.target;
        const list4 = [...FridayShedules];
        list4[index][name] = value;
        setFridayShedules(list4);
    }

    const handleAddClick4 = () => {
        setFridayShedules([...FridayShedules, {}]);
    }
    const handleRemoveClick4 = (index) => {
        FridayShedules.splice(index, 1)
        setFridayShedules([...FridayShedules])
    }
    // friday

    // saturday
    const [SaturdayShedules, setSaturdayShedules] = useState([{ starttime: '', endtime: '' }])
    // console.log("SaturdayShedules", SaturdayShedules)

    const InputChangeHandle5 = (e, index) => {
        const { name, value, files, type } = e.target;
        const list5 = [...SaturdayShedules];
        list5[index][name] = value;
        setSaturdayShedules(list5);
    }

    const handleAddClick5 = () => {
        setSaturdayShedules([...SaturdayShedules, {}]);
    }
    const handleRemoveClick5 = (index) => {
        SaturdayShedules.splice(index, 1)
        setSaturdayShedules([...SaturdayShedules])
    }
    // saturday

    // sunday
    const [SundayShedules, setSundayShedules] = useState([{ starttime: '', endtime: '' }])
    //  console.log("SundayShedules", SundayShedules)

    const InputChangeHandle6 = (e, index) => {
        const { name, value, files, type } = e.target;
        const list6 = [...SundayShedules];
        list6[index][name] = value;
        setSundayShedules(list6);
    }

    const handleAddClick6 = () => {
        setSundayShedules([...SundayShedules, {}]);
    }
    const handleRemoveClick6 = (index) => {
        SundayShedules.splice(index, 1)
        setSundayShedules([...SundayShedules])
    }
    // sunday

    const [SelectWeek, setSelectWeek] = useState("")

    const weeks = (value) => {
        if (SelectWeek == value) {
            setSelectWeek("")
        } else {
            setSelectWeek(value)
        }
    }
    return (
        <>
            {loader == true ? <Loader fullPage loading /> : null}
            <div className="tab-from-content">
                <div className="title-icon">
                    <h3 className="title"><i className="fas fa-clipboard-list" />Schedule</h3>
                </div>
                <div className="course__form">
                    <div className="general_info10">
                        <div className="row">
                            {/* schedule monday */}
                            <div className="col-lg-12 col-md-12">
                                {/* <h3 className='bg-secondary p-3'>Schedules</h3> */}
                                <div className="ui search focus lbel25 mt-30">
                                    <div onClick={() => weeks("Moday")} className="weeks mt-20 shadow">
                                        <h5>Monday</h5>
                                    </div>
                                    {/* <label onClick={() => weeks("Moday")}>Monday</label> */}
                                    {SelectWeek == "Moday" ?
                                        <div className="ui form swdh30 mt-3">
                                            <div className="field">
                                                {MondayShedules.map((e, i) => {
                                                    return (
                                                        <>
                                                            <div key={i} className='row'>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">Start Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.starttime} type="time" onChange={(e) => { InputChangeHandle(e, i) }} name='starttime' />
                                                                </div>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">End Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.endtime} type="time" onChange={(e) => { InputChangeHandle(e, i) }} name='endtime' />
                                                                </div>
                                                                <div className='col-md-2'>
                                                                    <label className="label25 text-left">&nbsp;</label>
                                                                    {MondayShedules.length !== 0 &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick}><i className="fas fa-plus" /></button>
                                                                    }
                                                                    {MondayShedules.length !== 0 &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={(e) => { handleRemoveClick(i) }}><i className="fas fa-trash" /></button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                                {MondayShedules.length == 0 &&
                                                    <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick}><i className="fas fa-plus" /></button>
                                                }
                                            </div>
                                        </div>
                                        : null}
                                </div>
                            </div>
                            {/* schedule monday*/}

                            {/* schedule tuesday */}
                            <div className="col-lg-12 col-md-12">
                                <div className="ui search focus lbel25 mt-30">
                                    <div onClick={() => weeks("Tuesday")} className="weeks mt-20 shadow">
                                        <h5>Tuesday</h5>
                                    </div>
                                    {/* <label onClick={() => weeks("Tuesday")}>Tuesday</label> */}
                                    {SelectWeek == "Tuesday" ?
                                        <div className="ui form swdh30 mt-3">
                                            <div className="field">
                                                {TuesdayShedules.map((e, i) => {
                                                    return (
                                                        <>
                                                            <div key={i} className='row'>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">Start Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.starttime} type="time" onChange={(e) => { InputChangeHandle1(e, i) }} name='starttime' />
                                                                </div>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">End Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.endtime} type="time" onChange={(e) => { InputChangeHandle1(e, i) }} name='endtime' />
                                                                </div>
                                                                <div className='col-md-2'>
                                                                    <label className="label25 text-left">&nbsp;</label>
                                                                    {TuesdayShedules.length &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick1}><i className="fas fa-plus" /></button>
                                                                    }
                                                                    {TuesdayShedules.length !== 0 &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={(e) => { handleRemoveClick1(i) }}><i className="fas fa-trash" /></button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                                {TuesdayShedules.length == 0 &&
                                                    <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick1}><i className="fas fa-plus" /></button>
                                                }
                                            </div>
                                        </div>
                                        : null}
                                </div>
                            </div>
                            {/* schedule tuesday*/}

                            {/* schedule wednesday */}
                            <div className="col-lg-12 col-md-12">
                                <div className=" ui search focus lbel25 mt-30">
                                    <div onClick={() => weeks("Wednesday")} className="weeks mt-20 shadow">
                                        <h5>Wednesday</h5>
                                    </div>
                                    {/* <label onClick={() => weeks("Wednesday")}>Wednesday</label> */}
                                    {SelectWeek == "Wednesday" ?
                                        <div className=" ui form swdh30 mt-3">
                                            <div className="field">
                                                {WednesdayShedules.map((e, i) => {
                                                    return (
                                                        <>
                                                            <div key={i} className='row'>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">Start Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.starttime} type="time" onChange={(e) => { InputChangeHandle2(e, i) }} name='starttime' />
                                                                </div>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">End Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.endtime} type="time" onChange={(e) => { InputChangeHandle2(e, i) }} name='endtime' />
                                                                </div>
                                                                <div className='col-md-2'>
                                                                    <label className="label25 text-left">&nbsp;</label>
                                                                    {WednesdayShedules.length &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick2}><i className="fas fa-plus" /></button>
                                                                    }
                                                                    {WednesdayShedules.length !== 0 &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={(e) => { handleRemoveClick2(i) }}><i className="fas fa-trash" /></button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                                {WednesdayShedules.length == 0 &&
                                                    <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick2}><i className="fas fa-plus" /></button>
                                                }
                                            </div>
                                        </div>
                                        : null}
                                </div>
                            </div>
                            {/* schedule wednesday*/}

                            {/* schedule thursday */}
                            <div className="col-lg-12 col-md-12">
                                <div className=" ui search focus lbel25 mt-30">
                                    <div onClick={() => weeks("Thursday")} className="weeks mt-20 shadow">
                                        <h5>Thursday</h5>
                                    </div>
                                    {/* <label onClick={() => weeks("Wednesday")}>Wednesday</label> */}
                                    {SelectWeek == "Thursday" ?
                                        <div className=" ui form swdh30 mt-3">
                                            <div className="field">
                                                {ThursdayShedules.map((e, i) => {
                                                    return (
                                                        <>
                                                            <div key={i} className='row'>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">Start Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.starttime} type="time" onChange={(e) => { InputChangeHandle3(e, i) }} name='starttime' />
                                                                </div>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">End Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.endtime} type="time" onChange={(e) => { InputChangeHandle3(e, i) }} name='endtime' />
                                                                </div>
                                                                <div className='col-md-2'>
                                                                    <label className="label25 text-left">&nbsp;</label>
                                                                    {ThursdayShedules.length &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick3}><i className="fas fa-plus" /></button>
                                                                    }
                                                                    {ThursdayShedules.length !== 0 &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={(e) => { handleRemoveClick3(i) }}><i className="fas fa-trash" /></button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                                {ThursdayShedules.length == 0 &&
                                                    <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick3}><i className="fas fa-plus" /></button>
                                                }
                                            </div>
                                        </div>
                                        : null}
                                </div>
                            </div>
                            {/* schedule thursday*/}

                            {/* schedule friday */}
                            <div className="col-lg-12 col-md-12">
                                <div className=" ui search focus lbel25 mt-30">
                                    <div onClick={() => weeks("Friday")} className="weeks mt-20 shadow">
                                        <h5>Friday</h5>
                                    </div>
                                    {/* <label onClick={() => weeks("Wednesday")}>Wednesday</label> */}
                                    {SelectWeek == "Friday" ?
                                        <div className=" ui form swdh30 mt-3">
                                            <div className="field">
                                                {FridayShedules.map((e, i) => {
                                                    return (
                                                        <>
                                                            <div key={i} className='row'>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">Start Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.starttime} type="time" onChange={(e) => { InputChangeHandle4(e, i) }} name='starttime' />
                                                                </div>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">End Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.endtime} type="time" onChange={(e) => { InputChangeHandle4(e, i) }} name='endtime' />
                                                                </div>
                                                                <div className='col-md-2'>
                                                                    <label className="label25 text-left">&nbsp;</label>
                                                                    {FridayShedules.length &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick4}><i className="fas fa-plus" /></button>
                                                                    }
                                                                    {FridayShedules.length !== 0 &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={(e) => { handleRemoveClick4(i) }}><i className="fas fa-trash" /></button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                                {FridayShedules.length == 0 &&
                                                    <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick4}><i className="fas fa-plus" /></button>
                                                }
                                            </div>
                                        </div>
                                        : null}
                                </div>
                            </div>
                            {/* schedule friday*/}

                            {/* schedule saturday */}
                            <div className="col-lg-12 col-md-12">
                                <div className=" ui search focus lbel25 mt-30">
                                    <div onClick={() => weeks("Saturday")} className="weeks mt-20 shadow">
                                        <h5>Saturday</h5>
                                    </div>
                                    {/* <label onClick={() => weeks("Wednesday")}>Wednesday</label> */}
                                    {SelectWeek == "Saturday" ?
                                        <div className=" ui form swdh30 mt-3">
                                            <div className="field">
                                                {SaturdayShedules.map((e, i) => {
                                                    return (
                                                        <>
                                                            <div key={i} className='row'>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">Start Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.starttime} type="time" onChange={(e) => { InputChangeHandle5(e, i) }} name='starttime' />
                                                                </div>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">End Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.endtime} type="time" onChange={(e) => { InputChangeHandle5(e, i) }} name='endtime' />
                                                                </div>
                                                                <div className='col-md-2'>
                                                                    <label className="label25 text-left">&nbsp;</label>
                                                                    {SaturdayShedules.length &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick5}><i className="fas fa-plus" /></button>
                                                                    }
                                                                    {SaturdayShedules.length !== 0 &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={(e) => { handleRemoveClick5(i) }}><i className="fas fa-trash" /></button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                                {SaturdayShedules.length == 0 &&
                                                    <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick5}><i className="fas fa-plus" /></button>
                                                }
                                            </div>
                                        </div>
                                        : null}
                                </div>
                            </div>
                            {/* schedule saturday*/}

                            {/* schedule sunday */}
                            <div className="col-lg-12 col-md-12">
                                <div className=" ui search focus lbel25 mt-30">
                                    <div onClick={() => weeks("Sunday")} className="weeks mt-20 shadow">
                                        <h5>Sunday</h5>
                                    </div>
                                    {/* <label onClick={() => weeks("Wednesday")}>Wednesday</label> */}
                                    {SelectWeek == "Sunday" ?
                                        <div className=" ui form swdh30 mt-3">
                                            <div className="field">
                                                {SundayShedules.map((e, i) => {
                                                    return (
                                                        <>
                                                            <div key={i} className='row'>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">Start Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.starttime} type="time" onChange={(e) => { InputChangeHandle6(e, i) }} name='starttime' />
                                                                </div>
                                                                <div className='col-md-5'>
                                                                    <label className="label25 text-left">End Time</label>
                                                                    <input className="prompt srch_explore mb-1" value={e.endtime} type="time" onChange={(e) => { InputChangeHandle6(e, i) }} name='endtime' />
                                                                </div>
                                                                <div className='col-md-2'>
                                                                    <label className="label25 text-left">&nbsp;</label>
                                                                    {SundayShedules.length &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick6}><i className="fas fa-plus" /></button>
                                                                    }
                                                                    {SundayShedules.length !== 0 &&
                                                                        <button className='btn btn-danger mx-2' type='button' onClick={(e) => { handleRemoveClick6(i) }}><i className="fas fa-trash" /></button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                                {SundayShedules.length == 0 &&
                                                    <button className='btn btn-danger mx-2' type='button' onClick={handleAddClick6}><i className="fas fa-plus" /></button>
                                                }
                                            </div>
                                        </div>
                                        : null}
                                </div>
                            </div>
                            {/* schedule sunday*/}
                            {
                                btnStatus == true?
                                <div className="col-md-12">
                                    <div className="mt-30 lbel25">
                                        <Button className="btn btn-danger" onClick={addAndeditSchedule}>Add</Button>
                                        {/* disabled={Disable} */}
                                    </div>
                                </div> 
                                :
                                <div className="col-md-12">
                                <div className="mt-30 lbel25">
                                    <Button className="btn btn-danger" onClick={addAndeditSchedule}>Update</Button>
                                    {/* disabled={Disable} */}
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}