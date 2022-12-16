import Header from '../../components/layout/superAdmin/header'
import Footer from '../../components/layout/superAdmin/footer'
import Courses from '../../components/superAdmin/courses/courses'
import Layout from '../../components/layout/layout'
export default function Home() {
  return (<>
  <Layout pageTitle="The Tutor Book | Admin | Courses">
    <Header active="courses"/>
    <div className="wrapper">
      <div className="sa4d25">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-lg-8">
              <Courses />
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
