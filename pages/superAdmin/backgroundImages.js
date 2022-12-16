
import Header from "../../components/layout/superAdmin/header";
import Footer from "../../components/layout/superAdmin/footer";
import Layout from "../../components/layout/layout";
import BackgroundImages from "../../components/superAdmin/backgroundImages/backgroundImages";

export default function superAdminBackgroundImages() {
    return (
        <>
            <Layout pageTitle="The Tutor Book | Admin | Background">
                <Header active="background" />
                <div className="wrapper">
                    <div className="sa4d25">
                        <BackgroundImages/>
                    </div>
                    {/* <Footer /> */}
                </div>
            </Layout>
        </>
    )
}