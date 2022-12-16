import Appointment from '../../components/student/prevAppointment/prevAppointment'
import Header from '../../components/layout/student/studentHeader'
import Layout from '../../components/layout/layout'
export default function prevAppointment() {
    return (
        <Layout pageTitle="The Tutor Book | Student | Previous Appointment">
            <Header active="previousAppointment" />
            <div className="wrapper">
                <div className="sa4d25">
                    <div className="container-fluid">
                        <div className="row">
                            <Appointment />
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </Layout>
    )
}