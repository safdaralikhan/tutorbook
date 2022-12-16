import Appointment from '../../components/superAdmin/teacherAppointment/teacherAppointment'
import Header from '../../components/layout/superAdmin/header'
import Layout from '../../components/layout/layout'
import { useRouter } from "next/router";

export default function SuperAdminAppointment() {

    const Router = useRouter()
    console.log("Router.query.teachid",Router.query.teachid)
    return (
        <Layout pageTitle="The Tutor Book | Tutor | Appointment">
            <Header active="teacher" />
            <div className="wrapper">
                <div className="sa4d25">
                    <div className="container-fluid">
                        <div className="row">
                            <Appointment teachid={Router.query.teachid}/>
                            
                            {/* <div className="col-xl-12 col-lg-8">
                              
                        </div> */}
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </Layout>
    )
}