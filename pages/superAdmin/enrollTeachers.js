
import Header from '../../components/layout/superAdmin/header'
import Footer from '../../components/layout/superAdmin/footer'
import EnrollTeacher from '../../components/superAdmin/enrollTeacher/enrollTeacher'
import Layout from '../../components/layout/layout'

export default function enrollTeachers() {
    return (<>
    <Layout pageTitle="The Tutor Book | Admin | Enroll Tutors">
      <Header />
      <div className="wrapper">
        <div className="sa4d25">
          <div className="container-fluid">
            <div className="row">
                <EnrollTeacher />
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
      </Layout>
    </>
    )
  }