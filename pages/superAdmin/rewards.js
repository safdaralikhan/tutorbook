import Header from '../../components/layout/superAdmin/header'
import Footer from '../../components/layout/superAdmin/footer'
import Courses from '../../components/superAdmin/courses/courses'
import Layout from '../../components/layout/layout'
import Rewards from '../../components/superAdmin/rewards/rewards'


export default function SuperAdminRewards() {

    
  return (<>
  <Layout pageTitle="The Tutor Book | Admin | Courses">
    <Header active="rewards"/>
    <div className="wrapper">
      <div className="sa4d25">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-lg-8">
              <Rewards />
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
