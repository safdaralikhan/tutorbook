import Head from 'next/head'
// import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../../components/layout/student/studentHeader'
import Footer from '../../components/layout/student/studentFooter'
import Dashboard from '../../components/student/dashboard/dashboard'
import Layout from '../../components/layout/layout'

export default function Dashboard1() {
  return (
    <Layout pageTitle="The Tutor Book | Student | Dashboard">
      <Header active="dashboard" />
      <div className="wrapper">
        <div className="sa4d25">
          <Dashboard />
        </div>
        {/* <Footer /> */}
      </div>
    </Layout>
  )
}
