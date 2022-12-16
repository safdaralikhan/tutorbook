import Packages from "../../components/student/packages/packages";
import Header from "../../components/layout/student/studentHeader";
import Footer from "../../components/layout/student/studentFooter";
import Layout from "../../components/layout/layout";

export default function StudentPackages() {
    return (
        <Layout pageTitle="The Tutor Book | Student | Packages">
            <Header active="packages" />
            <div className="wrapper">
                <div className="sa4d25">
                    <Packages />
                </div>
                {/* <Footer /> */}
            </div>
        </Layout>
    )
}