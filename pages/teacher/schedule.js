import Header from '../../components/layout/teacher/teacherHeader'
import Footer from '../../components/layout/teacher/teacherFooter'
import Schedule from '../../components/teacher/schedule/schedule'
import Layout from '../../components/layout/layout'
export default function TeacherProfile() {
  return (
    <Layout pageTitle="The Tutor Book | Tutor | Schedule">
      <Header active="schedule" />
      <div className="wrapper">
        <div className="sa4d25">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 col-lg-8">
                <Schedule />
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </Layout>
  )
}
