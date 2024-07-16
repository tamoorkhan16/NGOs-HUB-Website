import React, { useState, useEffect } from "react";
import "./Community.css";
import { txtDb } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
function Community() {
  const params = useParams();
  // get data from firestore
  const [data, setData] = useState([]);
    // Get data from Firestore
    useEffect(() => {
      const ngoID = params.ngoID;
      if (ngoID) {
        getData(ngoID);
      } else {
        console.error("Invalid NGO ID");
      }
    }, [params]);
  // Function Get data from firestore
  const getData = async (ngoID) => {
    const ValRef = collection(txtDb, "Ngos", ngoID, "Members");
    const dataDB = await getDocs(ValRef);
    const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  
  return (
    <>
      <table className="individual_page_team">
      <tr>
  <th>Name</th>
  <th>Blood Group</th>
  
  
</tr>
          {data.map((data, index) => {
            return (
              <tr key={data.id}>
                <td>{data.memtxtVal}</td>
                <td>{data.memBlood}</td>
              </tr>
            );
          })}
        
      </table>
    </>
  );
}

export default Community;
