
import Header from '../../components/layout/superAdmin/header'
import Footer from '../../components/layout/superAdmin/footer'
// import Profile from '../../components/superAdmin/profile/profile'
// import AboutContent from '../../components/superAdmin/aboutContent/aboutContent'
import ContactUsContent from '../../components/superAdmin/contactUsContent/contactUsContent'
import Layout from '../../components/layout/layout'
export default function SuperContactUsContent() {
    return (<>
    <Layout pageTitle="The Tutor Book | Admin | Contact Us">
        <Header active="contact"/>
            <div className="wrapper">
            <div className="sa4d25">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 col-lg-8">
                    <ContactUsContent />
                    </div>
                </div>
                </div>
            </div>
            {/* <Footer /> */}
            </div>
            </Layout>
    </>
    )
}
