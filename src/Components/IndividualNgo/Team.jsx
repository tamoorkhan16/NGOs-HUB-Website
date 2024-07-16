import React,{useEffect, useState} from 'react'
import {  txtDb } from "../Firebase/firebase";
import {  collection, getDocs } from "firebase/firestore";

import { useParams } from 'react-router-dom';
import "./Team.css"
function Team() {

  const params = useParams();
  

  useEffect(() => {
    const ngoID = params.ngoID; // Assuming params.ngoID contains the NGO ID
    if (ngoID) {
      getData(ngoID);
    } else {
      console.error("Invalid NGO ID");
    }
  }, [params]);
  // get data from firestore
  const [data, setData] = useState([]);
 
  // Function Get data from firestore
  const getData = async () => {
    

    const ngoID = params.ngoID;
    const ValRef = collection(txtDb, "Ngos", ngoID, "Team");
    const dataDB = await getDocs(ValRef);
    const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, []); // Run getData when user changes
  return (
    <>
<table className='individual_page_team'>

<tr>
  <th>Profile</th>
  <th>Name</th>
  <th colSpan={4}>Designation</th>
  <th colSpan={1}>Contact</th>
  
</tr>

{data.map((data, index) => {
            return (
              <tr key={data.id}>
          <td>
            <img src={data.imgURL} alt="" />
          </td>
          <td>{data.txtVal}</td>
          <td colSpan={4}>{data.memberPosition}</td>
          <td>
            {data.memberContact}
          </td>
          
          
        </tr> 
            );
          })}


</table>
    </>
  )
}

export default Team
