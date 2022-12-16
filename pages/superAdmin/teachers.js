
import Header from '../../components/layout/superAdmin/header'
import Footer from '../../components/layout/superAdmin/footer'
import Teacher from '../../components/superAdmin/teachers/teachers'
import Layout from '../../components/layout/layout'

export default function Teachers() {
    return (<>
    <Layout pageTitle="The Tutor Book | Admin | Tutors">
      <Header active="teacher"/>
      <div className="wrapper">
        <div className="sa4d25">
          <div className="container-fluid">
            <div className="row">
                <Teacher />
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
      </Layout>
    </>
    )
  }