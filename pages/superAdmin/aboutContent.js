
import Header from '../../components/layout/superAdmin/header'
import Footer from '../../components/layout/superAdmin/footer'
// import Profile from '../../components/superAdmin/profile/profile'
import AboutContent from '../../components/superAdmin/aboutContent/aboutContent'
import Layout from '../../components/layout/layout'
export default function SuperAboutContent() {
    return (<>
    <Layout pageTitle="The Tutor Book | Admin | About">
        <Header active="about"/>
            <div className="wrapper">
            <div className="sa4d25">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 col-lg-8">
                    <AboutContent />
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
