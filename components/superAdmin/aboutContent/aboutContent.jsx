import React, { useEffect, useState, Suspense } from "react";
import baseUrl from "../../../repositories/baseUrl";
// import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Swal from "sweetalert2";
import { Loader } from "react-overlay-loader";
import Router from "next/router";

import dynamic from 'next/dynamic';

const importJodit = () => import('jodit-react');

const JoditEditor = dynamic(importJodit, {
    ssr: false,
});

export default function AboutContent() {
    const [InputText, setInputText] = useState("");
    const [loader, setLoader] = useState(false);
    const [Disable, setDisable] = useState(true);
    const [Token, setToken] = useState(null);

    const [value, setValue] = useState("");
    console.log("jodit",value)

    const handleInputChange = (event, func) => {
        func(event.target.value);
        setDisable(false);
    }

    useEffect(() => {
        setToken(localStorage.getItem("superAdminToken"))
        getAboutContent(localStorage.getItem("superAdminToken"));
    }, [0])


    const getAboutContent = (token) => {
        setLoader(true);
        var requestOptions = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
        };
        fetch(`${baseUrl.baseUrl}clientside/aboutUs`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log("GET content", result);
                if (result.status) {
                    setValue(result.data[0].content);
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

    const updateContent = () => {
        setLoader(true);
        const form = new FormData();
        form.append("content", value);

        var requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + Token
            },
            body: form,
        };
        fetch(`${baseUrl.baseUrl}clientside/aboutUs`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log("content result", result);
                if (result.status) {
                    getAboutContent(Token)
                    setDisable(true);
                    Swal.fire({
                        // title: "Success",
                        text: result.data,
                        icon: "success",
                        confirmButtonColor: "#ed2a26",
                    });
                } else {
                    Swal.fire({
                        title: "Oops",
                        text: result.message,
                        icon: "error",
                        confirmButtonColor: "#ed2a26",
                    });
                }
            }, (error) => {
                setLoader(false);
                // console.log(error);
                Swal.fire({
                    title: "Oops",
                    text: error,
                    icon: "error",
                    confirmButtonColor: "#ed2a26",
                });
            });
    }
    return (
        <>
            {loader == true ? <Loader fullPage loading /> : null}
            <div className="section3125">
                <h4 className="item_title">About-Us Content</h4>
                <div className="la5lo1">
                    <div className="row">
                        <div className="card" style={{ width: '100%' }}>
                            <div className="card-body">
                                <h5 className="card-title mb-3">Edit Content*</h5>
                                <div className="row form-row">
                                    <div className="col-md-12">
                                        <JoditEditor value={value} onChange={(val) => setValue(val)} />
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-md-2 text-right mt-3">
                                        <button onClick={() => updateContent()} className="main-btn" type="button" >Save Content</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}