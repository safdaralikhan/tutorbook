import Appointment from '../../components/teacher/currentAppointment/currentAppointment'
import Header from '../../components/layout/teacher/teacherHeader'
import Layout from '../../components/layout/layout'
export default function currentAppointment() {
    return (
        <Layout pageTitle="The Tutor Book | Tutor | Appointment">
            <Header active="currentAppointment" />
            <div className="wrapper">
                <div className="sa4d25">
                    <div className="container-fluid">
                        <div className="row">
                            <Appointment />
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