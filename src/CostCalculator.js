// CostCalculator.js - הקומפוננטה הראשית שמחברת את הכל
import React, { useEffect, useState } from "react";
import PasswordCheck from "./PasswordCheck";
import ViewSelector from "./ViewSelector";
import DatePicker from "./DatePicker";
import CategoryTable from "./CategoryTable";
import Summary from './Summary';
import "./CostCalculator.css";
import  Axios  from "axios";

const CostCalculator = () => {

  const fullPeriodWorkTypesDemo = [
    { name: "אפיון", hours: 60, cost: 5000, date: "2024-01-10", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' },
    { name: "עיצוב גרפי", hours: 160, cost: 12000, date: "2024-02-05", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' },
    { name: "הנדסה", hours: 256, cost: 20000, date: "2024-03-20", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' },
    { name: "תכנות", hours: 433, cost: 35000, date: "2024-04-15", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' },
    { name: "תשתיות", hours: 25, cost: 2000, date: "2024-05-01", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' },
    { name: "בדיקות", hours: 13, cost: 1000, date: "2024-06-25", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' },
    { name: "נוספות", hours: 8, cost: 600, date: "2024-06-30", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' }
  ];
  const lastMonthWorkTypesDemo=
  [
    { name: "אפיון", hours: 60, cost: 5000, date: "2024-01-10", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' },
    { name: "עיצוב גרפי", hours: 160, cost: 12000, date: "2024-02-05", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' },
    { name: "הנדסה", hours: 256, cost: 20000, date: "2024-03-20", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' },
    { name: "תכנות", hours: 433, cost: 35000, date: "2024-04-15", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' },
    { name: "תשתיות", hours: 25, cost: 2000, date: "2024-05-01", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' },
    { name: "בדיקות", hours: 13, cost: 1000, date: "2024-06-25", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' },
    { name: "נוספות", hours: 8, cost: 600, date: "2024-06-30", xl: 'https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444' }
  ];



  const [validPassword, setValidPassword] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewOption, setViewOption] = useState("all");

  const [fullPeriodWorkTypes, setFullPeriodWorkTypes] = useState(fullPeriodWorkTypesDemo);
  const [lastMonthWorkTypes, setLastMonthWorkTypes] = useState(lastMonthWorkTypesDemo);
  const currentDate = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(currentDate.getMonth() - 1);

  const fetchFullWorkTypes = async () => {
    try{
const {data}=await Axios.get('the/url/of/the/data');
setFullPeriodWorkTypes(data);
    }catch(e){
      console.log(e,"error at fetching data");
    }};
const fetchLastmonthWorkTypes = async()=>{
  try{
    
  const {data}=await Axios.get('the/url/of/the/data');
  setLastMonthWorkTypes(data);

  }catch(e){
    console.log(e,"error at fetching data");}}
    

    useEffect(() => {
fetchFullWorkTypes();
fetchLastmonthWorkTypes();
    },[]);
  const filteredfullPeriodWorkTypes = viewOption === "all"
    ? fullPeriodWorkTypes
    : lastMonthWorkTypes

    const totalHours = filteredfullPeriodWorkTypes?.reduce((sum, category) => sum + category.hours, 0) || 0;
    const totalCost = filteredfullPeriodWorkTypes?.reduce((sum, category) => sum + category.cost, 0) || 0;
    
  if(!validPassword)
return <PasswordCheck onSuccess={() => setValidPassword(true)} />;
  return (
    <div className="container">
        <>
          <h1>מחשבון שעות ועלויות פרויקט</h1>
          <ViewSelector 
            viewOption={viewOption} 
            setViewOption={setViewOption} 
            options={{
              all: "הכל",
              lastMonth: "חודש אחרון"
            }} />
         {  viewOption==='all'&& <h5>כל התקופה האחרונה</h5>}
          {  viewOption==='lastMonth'&& <h5>החודש האחרון</h5>}
          
       {  viewOption!='all'&& <DatePicker label="תאריך התחלה:" value={startDate} onChange={setStartDate} />}
        {viewOption!='all'&&  <DatePicker label="תאריך סיום:" value={endDate} onChange={setEndDate} />}
          <CategoryTable fullPeriodWorkTypes={filteredfullPeriodWorkTypes} />
          <Summary totalHours={totalHours} totalCost={totalCost} />
        </>
         </div>
  );
};

export default CostCalculator;
