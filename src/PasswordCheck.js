// PasswordCheck.js - קומפוננטת בדיקת סיסמה
import  Axios  from "axios";
import React, { useState } from "react";
import ErrorPasswordMessage from "./ErrorPasswordMessage";

const PasswordCheck = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error,setError]=useState('')
  
  const handlePasswordCheck=async(e)=>{
    try {
      e.preventDefault();
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
  const handlePasswordCheckForTheMeantime=(e)=>{
    e.preventDefault();
    if(password==='1234')
      onSuccess()
    else{
      setError("סיסמא לא נכונה !")
      setTimeout(() => {
        window.location.href = "http://manage.ridosoft.com";
      }, 300);    } 
    }
  
 
  return (
    <form className="password-container" onSubmit={handlePasswordCheckForTheMeantime}>
    {error &&  <ErrorPasswordMessage message={error}/>}

      <h2>הכנס סיסמה</h2>
      <input
      required
        type="password"
        disabled={error===null}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="הכנס סיסמה"
      />
      <button type="submit">כניסה</button>
    </form>
  );
};

export default PasswordCheck;
