
import Header from "../../components/layout/superAdmin/header";
import Footer from "../../components/layout/superAdmin/footer";
import Layout from "../../components/layout/layout";
import SessionDescription from "../../components/superAdmin/sessionDescription/sessionDescription";


export default function superAdminSessionDescription() {
    return (
        <>
            <Layout pageTitle="The Tutor Book | Admin | Background">
                <Header active="session" />
                <div className="wrapper">
                    <div className="sa4d25">
                        <SessionDescription/>
                        {/* <BackgroundImages/> */}
                    </div>
                    {/* <Footer /> */}
                </div>
            </Layout>
        </>
    )
}