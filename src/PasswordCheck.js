// PasswordCheck.js - קומפוננטת בדיקת סיסמה
import React, { useState } from "react";

const PasswordCheck = ({ onSuccess }) => {
  const [password, setPassword] = useState("");

  const handlePasswordCheck = () => {
    if (password === "1234") {
      onSuccess();
    } else {
      window.location.href = "http://manage.ridosoft.com";
    }
  };

  return (
    <div className="password-container">
      <h2>הכנס סיסמה</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="הכנס סיסמה"
      />
      <button onClick={handlePasswordCheck}>כניסה</button>
    </div>
  );
};

export default PasswordCheck;
