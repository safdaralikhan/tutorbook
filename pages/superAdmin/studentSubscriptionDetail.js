// import Packages from "../../components/superAdmin/packages/packages";
import Header from "../../components/layout/superAdmin/header";
import Footer from "../../components/layout/superAdmin/footer";
import Layout from "../../components/layout/layout";
import StudentSubscription from "../../components/superAdmin/studentSubscriptionDetail/studentSubscriptiondetail";
import { useRouter } from "next/router";

export default function SuperAdminStudentSubscriptionDetail() {

    const Router = useRouter()
    return (
        <>
            <Layout pageTitle="The Tutor Book | Admin | Student">
                <Header active="student" />
                <div className="wrapper">
                    <div className="sa4d25">
                        <StudentSubscription user_ID={Router.query.user_Id} />
                    </div>
                    {/* <Footer /> */}
                </div>
            </Layout>
        </>
    )
}