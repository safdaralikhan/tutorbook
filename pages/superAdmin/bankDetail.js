// import Packages from "../../components/superAdmin/packages/packages";
import Header from "../../components/layout/superAdmin/header";
import Footer from "../../components/layout/superAdmin/footer";
import Layout from "../../components/layout/layout";
import BankDetail from "../../components/superAdmin/bankDetail/bankdetail";

export default function superAdminBankDetail() {
    return (
        <>
            <Layout pageTitle="The Tutor Book | Admin | Student">
                <Header active="bank" />
                <div className="wrapper">
                    <div className="sa4d25">
                        <BankDetail />
                    </div>
                    {/* <Footer /> */}
                </div>
            </Layout>
        </>
    )
}