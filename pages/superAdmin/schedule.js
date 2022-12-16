import Header from "../../components/layout/superAdmin/header";
import Footer from "../../components/layout/superAdmin/footer";
import Schedule from "../../components/superAdmin/schedule/schedule";
import Layout from "../../components/layout/layout";

export default function superAdminShedule() {
    return (
        <>
        <Layout pageTitle="The Tutor Book | Admin | Schedule">
            <Header active="schedule"/>
            <div className="wrapper">
                <div className="sa4d25">
                    <Schedule />
                </div>
                {/* <Footer /> */}
            </div>
            </Layout>
            </>
    )
}