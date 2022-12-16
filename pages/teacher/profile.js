import Header from '../../components/layout/teacher/teacherHeader'
import Footer from '../../components/layout/teacher/teacherFooter'
import Profile from '../../components/teacher/profile/profile'
import Layout from '../../components/layout/layout'
export default function TeacherProfile() {
  return (
    <Layout pageTitle="The Tutor Book | Tutor | Profile">
      <Header active="profile" />
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
  )
}
