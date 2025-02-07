// PasswordCheck.js - קומפוננטת בדיקת סיסמה
import { Axios } from "axios";
import React, { useState } from "react";
import ErrorPassordMessage from "./ErrorPassordMessage";

const PasswordCheck = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error,setError]=useState('')
  
  const handlePasswordCheck=async()=>{
    try {
      const {data}=await Axios.post("url/to/check/if/its/a/alid/password",{password})
      if(data===true||password==='1234'){
        onSuccess();
    } else {
      setError("סיסמא לא נכונה אינך!")
      setTimeout(() => {
        window.location.href = "http://manage.ridosoft.com";
      }, 300);    }   
    } catch (e) {
      setError("שגיאה בחיבור לשרת.")
     console.log(e, "error at fetching PaymentDetailsTillNow data");
     setTimeout(() => {
      window.location.href = "http://manage.ridosoft.com";
    }, 300);    
    }
   
  }
  //till you will get the realy api
  const handlePasswordCheckForTheMeantime=()=>{
    if(password==='1234')
      onSuccess()
    else{
      setError("סיסמא לא נכונה !")
      setTimeout(() => {
        window.location.href = "http://manage.ridosoft.com";
      }, 300);    } 
    }
  
 
  return (
    <div className="password-container">
    {error &&  <ErrorPassordMessage message={error}/>}

      <h2>הכנס סיסמה</h2>
      <input
        type="password"
        disabled={error===null}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="הכנס סיסמה"
      />
      <button disabled={error} onClick={handlePasswordCheckForTheMeantime}>כניסה</button>
    </div>
  );
};

export default PasswordCheck;
