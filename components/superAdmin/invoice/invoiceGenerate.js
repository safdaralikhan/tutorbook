
import React from 'react'
import { jsPDF } from "jspdf";

const InvoiceGenerate = ({user_Data})=> {

    console.log("props>>>",user_Data)

    const saveDiv =()=> {
      const doc = new jsPDF('p', 'pt',[620,650], true);
      let contain = "<div style='font-size:11px; padding: 15px 15px; width:620px;'>"+
      document.getElementById('pdf').innerHTML+"</div>";

      doc.html(contain, {
        callback: function (doc) {
          doc.save();
        },
     });

    }
    
      return (
        <>
      <div id='pdf' className=" mt-3" style={{width: '680px',
        margin: '0 auto'}} >
         
        <table width="100%">
          <tbody><tr className='justify-content-center'>
              <td width="100%" >
                <div style={{background: 'rgb(224 224 255)', color: '#fff', height: '75px', lineHeight: '75px', textAlign: 'center', fontSize: '11px'}} >
                <img src='/static/images/logo-dark backup2.png' style={{width:'270px',height:'40px'}} alt='logo'/>
              </div>
              </td>

              <td />
            </tr>
          </tbody></table> 
        <br /><br />
        <table width="100%" style={{borderCollapse: 'collapse'}}>
          <tbody><tr>
              <td width="50%" style={{backgroundColor: 'rgb(221 220 220)', padding: '20px'}}>
                <strong>Date:</strong> {user_Data.creation}<br />
                <strong>Email:</strong> needhelp1@tutorlearner.com<br />
                <strong>Phone:</strong> 444 888 0001<br />
              </td>
              
            </tr>
          </tbody></table><br />
        
     
        
        <table width="100%" style={{borderCollapse: 'collapse', borderBottom: '1px solid #eee'}}>
          <tbody><tr>
              <td width="40%" style={{backgroundColor: 'rgb(221 220 220)', textTransform: 'uppercase', padding: '15px', fontSize: '11px', borderRight: '1px solid #eee'}} className="">Package&nbsp; Name</td>
              <td width="20%" style={{backgroundColor: 'rgb(221 220 220)', textTransform: 'uppercase', padding: '15px', fontSize: '11px', borderRight: '1px solid #eee'}} className="">Price</td>
              <td width="20%" style={{backgroundColor: 'rgb(221 220 220)', textTransform: 'uppercase', padding: '15px', fontSize: '11px', borderRight: '1px solid #eee'}} className="">Quantity</td>
              <td width="20%" style={{backgroundColor: 'rgb(221 220 220)', textTransform: 'uppercase', padding: '15px', fontSize: '11px', borderRight: '1px solid #eee'}} className="">Total</td>
            </tr>
            <tr>
              <td className="" style={{padding: '7px 14px', borderLeft: '1px solid rgb(217 208 208)', borderRight: '1px solid rgb(217 208 208)', borderBottom: '1px solid rgb(217 208 208)'}}>{user_Data.packagename}</td>
              <td className="" style={{padding: '7px 14px', borderLeft: '1px solid rgb(217 208 208)', borderRight: '1px solid rgb(217 208 208)', borderBottom: '1px solid rgb(217 208 208)'}}>{user_Data.price} CHF</td>
              <td className="" style={{padding: '7px 14px', borderLeft: '1px solid rgb(217 208 208)', borderRight: '1px solid rgb(217 208 208)', borderBottom: '1px solid rgb(217 208 208)'}}>1 <span style={{color: '#777'}}>X</span> {user_Data.price} CHF</td>
              <td className="" style={{padding: '7px 14px', borderLeft: '1px solid rgb(217 208 208)', borderRight: '1px solid rgb(217 208 208)', borderBottom: '1px solid rgb(217 208 208)'}}>{user_Data.price} CHF</td>
            </tr>
            
          </tbody></table><br />
        <table width="100%" style={{background: 'rgb(221 220 220)', padding: '40px'}}>
          <tbody><tr>
              <td style={{padding: '20px'}}>
                <table width="300px" style={{float: 'right'}}>
                  <tbody><tr>
                      <td><strong>Sub-Total:</strong></td>
                      <td style={{textAlign: 'right'}}>{user_Data.price} CHF</td>
                    </tr>  
                    <tr>
                      <td><strong>Total:</strong></td>    
                      <td style={{textAlign: 'right'}}>{user_Data.price} CHF</td>
                    </tr>
                   
                  </tbody></table>
              </td>
            </tr>
          </tbody></table>
       
      </div>
      <div style={{maxWidth: '680px',margin: '0 auto'}} className=' mt-3 mb-3 text-end'>
            <button type='button' onClick={()=>saveDiv()} className=" main-btn">Generate PDF!</button>
      </div>




        </>
      );
  
  }


export default InvoiceGenerate;
