
import Header from "../../components/layout/superAdmin/header";
import Footer from "../../components/layout/superAdmin/footer";
import Layout from "../../components/layout/layout";
import Banner from "../../components/superAdmin/bannerContent/banner";
import Team from "../../components/superAdmin/team/team";

export default function superAdminTeamContent() {
    return (
        <>
            <Layout pageTitle="The Tutor Book | Admin | Banner">
                <Header active="team" />
                <div className="wrapper">
                    <div className="sa4d25">
                        {/* <Banner/> */}
                        <Team/>
                    </div>
                    {/* <Footer /> */}
                </div>
            </Layout>
        </>
    )
}