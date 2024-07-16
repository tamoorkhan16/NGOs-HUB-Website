import React from "react";
import "./AboutUsElement.css";

function AboutUsElement() {
  return (
    <div>
      <main className="about_container">
        <section className="about_differ_para">
          <h2 className="about_differ_para_heading">
            What's different when you work with us?
          </h2>

          <div className="paragraph_box">
            <p className="about_differ_paragraph para">
              {" "}
              NGO Hub is the catalyst for meaningful change, dedicated to
              fostering collaboration and amplifying impact in the social
              sector. Our platform brings together NGOs, organizations, and
              individuals, providing a unified space to share resources,
              expertise, and inspiration. By connecting passionate changemakers,
              NGO Hub accelerates the journey towards a better world, where
              every voice is heard, and every action counts. Join us in creating
              lasting, positive change for communities worldwide.
            </p>
            <p className="about_differ_paragraph bullets">
              {" "}
              <ul>
                <li>
                  Connect with like-minded organizations and individuals,
                  fostering collaboration and synergy to tackle complex social
                  issues more effectively.
                </li>
                <li>
                  {" "}
                  Access a wealth of resources, knowledge, and best practices
                  shared by NGOs and organizations, enabling more efficient and
                  impactful operations.
                </li>
                <li>
                  Increase visibility and reach for your organization's mission
                  and initiatives, attracting support and engagement from a
                  broader audience.
                </li>
                <li>
                  Build a supportive community of changemakers, where ideas are
                  exchanged, partnerships are formed, and collective action is
                  celebrated.
                </li>
              </ul>
            </p>
          </div>
        </section>

        {/* <section className="dynamic_numbering_container">
          <div className="full_dynamic_numbering_container_box">
            <div className="dynamic_numbering_container_box">
              <h3>{count}</h3>
            </div>
            <h3>Organizations</h3>
          </div>
          <div className="full_dynamic_numbering_container_box">
            <div className="dynamic_numbering_container_box">
              <h3>1000+</h3>
            </div>
            <h3>Members</h3>
          </div>
          <div className="full_dynamic_numbering_container_box">
            <div className="dynamic_numbering_container_box">
              <h3>80+</h3>
            </div>
            <h3>Projects</h3> 
          </div>
          <div className="full_dynamic_numbering_container_box">
            <div className="dynamic_numbering_container_box">
              <h3>4500+</h3>
            </div>
            <h3>Community</h3>
          </div>
        </section> */}

        <section className="about_us_flex_container">
          <div className="about_us_team_heading">
            <h2>Team</h2>
          </div>
          <div className="about_us_team_names">
            <div className="team_names_box">
              <h3>Tamoor Ahmad</h3>
              <div className="team_image">
                <img src="Images\Team\Tamoor_Profile.png" alt="Team_Image" />
              </div>
              <p className="about_us_team_para">
                <h4>Designation</h4> ABC{" "}
              </p>
              <p className="about_us_team_para">
                <h4>Email</h4> tamoorgamil.com{" "}
              </p>
              <p className="about_us_team_para">
                <h4>Phone No.</h4> 310 00000000{" "}
              </p>
            </div>

            <div className="team_names_box">
              <h3>Zain</h3>
              <div className="team_image">
                <img src="Images\Team\Zain_Profile.png" alt="Team_Image" />
              </div>
              <p className="about_us_team_para">
                <h4>Designation</h4> ABC{" "}
              </p>
              <p className="about_us_team_para">
                <h4>Email</h4> Zain@gamil.com{" "}
              </p>
              <p className="about_us_team_para">
                <h4>Phone No.</h4> 310 00000000{" "}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutUsElement;
