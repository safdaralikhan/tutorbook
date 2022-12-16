import Packages from "../../components/superAdmin/packages/packages";
import Header from "../../components/layout/superAdmin/header";
import Footer from "../../components/layout/superAdmin/footer";
import Layout from "../../components/layout/layout";

export default function superAdminPackages() {
    return (
        <>
            <Layout pageTitle="The Tutor Book | Admin | Packages">
                <Header active="packages" />
                <div className="wrapper">
                    <div className="sa4d25">
                        <Packages />
                    </div>
                    {/* <Footer /> */}
                </div>
            </Layout>
        </>
    )
}