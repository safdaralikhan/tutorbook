
import Header from '../../components/layout/superAdmin/header'
import Footer from '../../components/layout/superAdmin/footer'
import Profile from '../../components/superAdmin/profile/profile'
import Layout from '../../components/layout/layout'
export default function SuperProfile() {
    return (<>
    <Layout pageTitle="The Tutor Book | Admin | Profile">
        <Header active="profile"/>
    <div className="wrapper">
      <div className="sa4d25">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-lg-8">
              <Profile />
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
