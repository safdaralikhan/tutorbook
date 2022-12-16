import Header from '../../components/layout/superAdmin/header'
import Footer from '../../components/layout/superAdmin/footer'
import Dashboard from '../../components/superAdmin/dashboard/dashboard'
import Layout from '../../components/layout/layout'
export default function Dashboard1() {
  return (<>
    <Layout pageTitle="The Tutor Book | Admin | Dashboard">
      <Header active="dashboard" />
      <div className="wrapper">
        <div className="sa4d25">
          <Dashboard />
        </div>
        {/* <Footer /> */}
      </div>
    </Layout>
  </>
  )
}
