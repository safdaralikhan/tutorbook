
import Header from "../../components/layout/superAdmin/header";
import Footer from "../../components/layout/superAdmin/footer";
import Layout from "../../components/layout/layout";
import Banner from "../../components/superAdmin/bannerContent/banner";

export default function superAdminBannerContent() {
    return (
        <>
            <Layout pageTitle="The Tutor Book | Admin | Banner">
                <Header active="banner" />
                <div className="wrapper">
                    <div className="sa4d25">
                        <Banner/>
                    </div>
                    {/* <Footer /> */}
                </div>
            </Layout>
        </>
    )
}