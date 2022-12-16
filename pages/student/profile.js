import Head from 'next/head'
// import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../../components/layout/student/studentHeader'
import Footer from '../../components/layout/student/studentFooter'
import Profile from '../../components/student/profile/profile'
import Layout from '../../components/layout/layout'
export default function TeacherProfile() {
  return (
    <Layout pageTitle="The Tutor Book | Student | Profile">
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
