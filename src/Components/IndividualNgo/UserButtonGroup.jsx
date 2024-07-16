import React from 'react'
import "./ButtonGroup.css"

function UserButtonGroup({buttons_render, isSelected, setIsselected}) {
  return (
    <>



      <div className="individual_Ngo_button_container">


        {
          buttons_render.map((button_text, index)=>{
            return(

              <button className={isSelected===index ?"ngo_button_render_selected":"ngo_button_render"}
              onClick={()=>{setIsselected(index)}}
              >{button_text}</button>

            )
          })
        }

      </div>
    </>
  )
}

export default UserButtonGroup
