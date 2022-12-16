// import Packages from "../../components/superAdmin/packages/packages";
import Header from "../../components/layout/superAdmin/header";
import Footer from "../../components/layout/superAdmin/footer";
import Layout from "../../components/layout/layout";
import StudentDetail from "../../components/superAdmin/studentDetail/studentdetail";

export default function superAdminStudentDetail() {
    return (
        <>
            <Layout pageTitle="The Tutor Book | Admin | Student">
                <Header active="student" />
                <div className="wrapper">
                    <div className="sa4d25">
                        <StudentDetail />
                    </div>
                    {/* <Footer /> */}
                </div>
            </Layout>
        </>
    )
}