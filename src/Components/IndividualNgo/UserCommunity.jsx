import React, { useState, useEffect } from "react";
import "./Community.css";
import { txtDb } from "../Firebase/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

function UserCommunity() {
  const params = useParams();
  const [data, setData] = useState([]);

  // Function to get data from Firestore
  const getData = async (ngoID) => {
    try {
      const ValRef = collection(txtDb, "Ngos", ngoID, "Members");
      const dataDB = await getDocs(ValRef);
      const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
      setData(allData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const ngoID = params.ngoID;
    if (ngoID) {
      getData(ngoID);
    } else {
      console.error("Invalid NGO ID");
    }
  }, [params]);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const ngoID = params.ngoID;
      const deleteVal = doc(txtDb, "Ngos", ngoID, "Members", id); // Corrected the collection path
      await deleteDoc(deleteVal);
      toast.success("Member deleted successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getData(ngoID); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting member: ", error);
      toast.error("Error deleting member: " + error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <table className="individual_page_team">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th colSpan={2}>Email</th>
            <th colSpan={2}>Contact</th>
            <th colSpan={2}>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((member) => (
            <tr key={member.id}>
              <td>{member.memtxtVal}</td>
              <td>{member.memBlood}</td>
              <td colSpan={2}>{member.memEmail}</td>
              <td colSpan={2}>{member.memContact}</td>
              <td colSpan={2}>{member.memAddress}</td>
              <td>
                <i
                  className="fa-solid fa-trash delete_icon_for_teamMember"
                  onClick={() => handleDelete(member.id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </>
  );
}

export default UserCommunity;
