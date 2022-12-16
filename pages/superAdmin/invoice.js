// import Packages from "../../components/superAdmin/packages/packages";
import Header from "../../components/layout/superAdmin/header";
import Footer from "../../components/layout/superAdmin/footer";
import Layout from "../../components/layout/layout";
import { useRouter } from "next/router";
import InvoiceGenerate from "../../components/superAdmin/invoice/invoiceGenerate";

export default function SuperAdminInvoicePage() {

    const Router = useRouter()
    return (
        <>
            <Layout pageTitle="The Tutor Book | Admin | Student">
                <Header active="student" />
                <div className="wrapper">
                    <div className="sa4d25">
                        <InvoiceGenerate user_Data={Router.query} />
                    </div>
                    {/* <Footer /> */}
                </div>
            </Layout>
        </>
    )
}