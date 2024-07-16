import React , {useEffect, useState}from "react";
import "./RenderComponents.css";

import { txtDb } from "../Firebase/firebase";
import { v4 } from "uuid";
import {  useParams } from "react-router-dom"

import { 
  collection,
  getDocs,
} from "firebase/firestore";

function Projects() {
  const params = useParams();
  
  // get data from firestore
  const [data, setData] = useState([]);
  useEffect(() => {
    const ngoID = params.ngoID; // Assuming params.ngoID contains the NGO ID
    if (ngoID) {
      getData(ngoID);
    } else {
      console.error("Invalid NGO ID");
    }
  }, [params]);
  
    // Function Get data from firestore
    const getData = async () => {
  
  
      const ngoID = params.ngoID;
      const ValRef = collection(txtDb, "Ngos", ngoID, "Projects");
      const dataDB = await getDocs(ValRef);
      const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
      setData(allData);
    };
  
    useEffect(() => {
      getData();
    }, []); // Run getData when user changes
  return (
    <>
      <section className="individual_page_projects">
      {data.map((data, index) => {
          return (
            <div className="event_card" key={index}>
              <img src={data.imgURL} alt="Event" />
              <div className="event__card__content">
                <div className="event__card__content__inner__box">
                  <div className="event_card_content_left_side">
                    <p className="event__card__title">{data.txtVal}</p>
                    <p className="event__card__description">{data.projectDescription}</p>
                   
                  </div>

                  <div className="event_card_content_right_side">
                    <img src={data.imgURL} alt="" srcSet="" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Projects;
