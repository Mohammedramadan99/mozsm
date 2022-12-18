import React from 'react'

function MainAlert() {
  return (
    <div className='mainAlert' style={{padding:"5px",fontSize: "12px",fontWeight:"600",color:"white",textAlign:"center"}}>
      some actions will be slow because I use the Shared Cluster of mongodb (free)
    </div>
  )
}

export default MainAlert