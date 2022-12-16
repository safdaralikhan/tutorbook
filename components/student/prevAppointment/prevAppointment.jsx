import style from "../../../styles/Appointment.module.css";
// import style from './Appointment.module.css'
export default function Appointment() {
  return (
    <>
      
        <div className="col-md-4 ">
          <div className={`card ${style.card} shadow`}>
            <div
              className={`row d-flex justify-content-between mx-2 px-2 ${style.cardStrip}`}
            >
            <div className="col-md-6">
              <div className="left d-flex flex-column">
                <h5 className="mb-1">10:00 - 11:00 AM</h5>
                <p className={` mb-1 ${style.smText} ${style.textMuted}`}>
                  Monday, August 19
                </p>
              </div>
              </div>
            <div className="col-md-6">
              <div className="text-right">
                {" "}
                <img
                  className={`${style.img1}`}
                  src="https://i.imgur.com/Mcd6HIg.jpg"
                  alt=""
                />{" "}
              </div>
              </div>
            </div>
            <div
              className={`row d-flex justify-content-between mx-2 px-3 ${style.cardStrip}`}
            >
            <div className="col-md-7">
              <div className="left d-flex flex-column">
                <h5 className="mb-1">Lindsey Johnson</h5>
                <p className={` mb-1 ${style.smText} ${style.textMuted}`}>FIRST VISIT</p>
              </div>
              </div>
              <div className="col-md-5">
              <div className="text-right ">
                <div className={`fa fa-comment text-right ${style.fa} ${style.faComment} `} />
                <div className={`fa fa-phone text-right ${style.fa} ${style.faPhone}`} />
              </div>
              </div>
            </div>
            <div
              className={`row justify-content-between mx-2 px-3 ${style.cardStrip}`}
            >
             <div className="col-md-9">
              <div className="left d-flex">
                <h5 className={`mb-1 text-muted ${style.textMuted} ${style.smText}`}>Blowout and style</h5>{" "}
                <span className={style.time}>1 hr</span>
              </div>
              </div>
              <div className="col-md-3">
              <div className="right d-flex">
                <p className={`mb-0 ${style.price}`}>
                  <strong className="text-muted">$80.00</strong>
                </p>
              </div>
              </div>
            </div>
            <div className="row d-flex justify-content-between mx-2 px-3">
              {" "}
              <button className={`${style.btn} ${style.btnWhite} rounded`}>
                Reschedule
              </button>{" "}
              <button className={`${style.btn} rounded  ${style.btnPurple}`}>
                Approve
              </button>{" "}
            </div>
          </div>
          </div>

          <div className="col-md-4">
          <div className={`card ${style.card} shadow`}>
            <div
              className={`row d-flex justify-content-between mx-2 px-2 ${style.cardStrip}`}
            >
            <div className="col-md-6">
              <div className="left d-flex flex-column">
                <h5 className="mb-1">10:00 - 11:00 AM</h5>
                <p className={` mb-1 ${style.smText} ${style.textMuted}`}>
                  Monday, August 19
                </p>
              </div>
              </div>
            <div className="col-md-6">
              <div className="text-right">
                {" "}
                <img
                  className={`${style.img1}`}
                  src="https://i.imgur.com/Mcd6HIg.jpg"
                  alt=""
                />{" "}
              </div>
              </div>
            </div>
            <div
              className={`row d-flex justify-content-between mx-2 px-3 ${style.cardStrip}`}
            >
            <div className="col-md-7">
              <div className="left d-flex flex-column">
                <h5 className="mb-1">Lindsey Johnson</h5>
                <p className={` mb-1 ${style.smText} ${style.textMuted}`}>FIRST VISIT</p>
              </div>
              </div>
              <div className="col-md-5">
              <div className="text-right ">
                <div className={`fa fa-comment text-right ${style.fa} ${style.faComment} `} />
                <div className={`fa fa-phone text-right ${style.fa} ${style.faPhone}`} />
              </div>
              </div>
            </div>
            <div
              className={`row justify-content-between mx-2 px-3 ${style.cardStrip}`}
            >
             <div className="col-md-9">
              <div className="left d-flex">
                <h5 className={`mb-1 text-muted ${style.textMuted} ${style.smText}`}>Blowout and style</h5>{" "}
                <span className={style.time}>1 hr</span>
              </div>
              </div>
              <div className="col-md-3">
              <div className="right d-flex">
                <p className={`mb-0 ${style.price}`}>
                  <strong className="text-muted">$80.00</strong>
                </p>
              </div>
              </div>
            </div>
            <div className="row d-flex justify-content-between mx-2 px-3">
              {" "}
              <button className={`${style.btn} ${style.btnWhite} rounded`}>
                Reschedule
              </button>{" "}
              <button className={`${style.btn} rounded  ${style.btnPurple}`}>
                Approve
              </button>{" "}
            </div>
          </div>
          </div>

          <div className="col-md-4">
          <div className={`card ${style.card} shadow`}>
            <div
              className={`row d-flex justify-content-between mx-2 px-2 ${style.cardStrip}`}
            >
            <div className="col-md-6">
              <div className="left d-flex flex-column">
                <h5 className="mb-1">10:00 - 11:00 AM</h5>
                <p className={` mb-1 ${style.smText} ${style.textMuted}`}>
                  Monday, August 19
                </p>
              </div>
              </div>
            <div className="col-md-6">
              <div className="text-right">
                {" "}
                <img
                  className={`${style.img1}`}
                  src="https://i.imgur.com/Mcd6HIg.jpg"
                  alt=""
                />{" "}
              </div>
              </div>
            </div>
            <div
              className={`row d-flex justify-content-between mx-2 px-3 ${style.cardStrip}`}
            >
            <div className="col-md-7">
              <div className="left d-flex flex-column">
                <h5 className="mb-1">Lindsey Johnson</h5>
                <p className={` mb-1 ${style.smText} ${style.textMuted}`}>FIRST VISIT</p>
              </div>
              </div>
              <div className="col-md-5">
              <div className="text-right ">
                <div className={`fa fa-comment text-right ${style.fa} ${style.faComment} `} />
                <div className={`fa fa-phone text-right ${style.fa} ${style.faPhone}`} />
              </div>
              </div>
            </div>
            <div
              className={`row justify-content-between mx-2 px-3 ${style.cardStrip}`}
            >
             <div className="col-md-9">
              <div className="left d-flex">
                <h5 className={`mb-1 text-muted ${style.textMuted} ${style.smText}`}>Blowout and style</h5>{" "}
                <span className={style.time}>1 hr</span>
              </div>
              </div>
              <div className="col-md-3">
              <div className="right d-flex">
                <p className={`mb-0 ${style.price}`}>
                  <strong className="text-muted">$80.00</strong>
                </p>
              </div>
              </div>
            </div>
            <div className="row d-flex justify-content-between mx-2 px-3">
              {" "}
              <button className={`${style.btn} ${style.btnWhite} rounded`}>
                Reschedule
              </button>{" "}
              <button className={`${style.btn} rounded  ${style.btnPurple}`}>
                Approve
              </button>{" "}
            </div>
          </div>
          </div>

          <div className="col-md-4 mt-4">
          <div className={`card ${style.card} shadow`}>
            <div
              className={`row d-flex justify-content-between mx-2 px-2 ${style.cardStrip}`}
            >
            <div className="col-md-6">
              <div className="left d-flex flex-column">
                <h5 className="mb-1">10:00 - 11:00 AM</h5>
                <p className={` mb-1 ${style.smText} ${style.textMuted}`}>
                  Monday, August 19
                </p>
              </div>
              </div>
            <div className="col-md-6">
              <div className="text-right">
                {" "}
                <img
                  className={`${style.img1}`}
                  src="https://i.imgur.com/Mcd6HIg.jpg"
                  alt=""
                />{" "}
              </div>
              </div>
            </div>
            <div
              className={`row d-flex justify-content-between mx-2 px-3 ${style.cardStrip}`}
            >
            <div className="col-md-7">
              <div className="left d-flex flex-column">
                <h5 className="mb-1">Lindsey Johnson</h5>
                <p className={` mb-1 ${style.smText} ${style.textMuted}`}>FIRST VISIT</p>
              </div>
              </div>
              <div className="col-md-5">
              <div className="text-right ">
                <div className={`fa fa-comment text-right ${style.fa} ${style.faComment} `} />
                <div className={`fa fa-phone text-right ${style.fa} ${style.faPhone}`} />
              </div>
              </div>
            </div>
            <div
              className={`row justify-content-between mx-2 px-3 ${style.cardStrip}`}
            >
             <div className="col-md-9">
              <div className="left d-flex">
                <h5 className={`mb-1 text-muted ${style.textMuted} ${style.smText}`}>Blowout and style</h5>{" "}
                <span className={style.time}>1 hr</span>
              </div>
              </div>
              <div className="col-md-3">
              <div className="right d-flex">
                <p className={`mb-0 ${style.price}`}>
                  <strong className="text-muted">$80.00</strong>
                </p>
              </div>
              </div>
            </div>
            <div className="row d-flex justify-content-between mx-2 px-3">
              {" "}
              <button className={`${style.btn} ${style.btnWhite} rounded`}>
                Reschedule
              </button>{" "}
              <button className={`${style.btn} rounded  ${style.btnPurple}`}>
                Approve
              </button>{" "}
            </div>
          </div>
          </div>
      
    </>
  );
}
