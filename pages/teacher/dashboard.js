import Header from '../../components/layout/teacher/teacherHeader'
import Footer from '../../components/layout/teacher/teacherFooter'
import Dashboard from '../../components/teacher/dashboard/dashboard'
import Layout from '../../components/layout/layout'

export default function Dashboard1() {
  return (
    <Layout pageTitle="The Tutor Book | Tutor | Dashboard">
    <Header active="dashboard"/>
    <div className="wrapper">
      <div className="sa4d25">
        <Dashboard />
      </div>
      {/* <Footer /> */}
    </div>
  </Layout>
  )
}
