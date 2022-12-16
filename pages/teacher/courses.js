import Header from '../../components/layout/teacher/teacherHeader'
import Footer from '../../components/layout/teacher/teacherFooter'
import TeacherCourses from '../../components/teacher/teacherCourses/courses'
import Layout from '../../components/layout/layout'

export default function TeacherCourse() {
    return (
        <Layout pageTitle="The Tutor Book | Tutor | Courses">
        <Header active="courses" />
        <div className="wrapper">
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12 col-lg-8">
                            <TeacherCourses />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    </Layout>
    )
}
