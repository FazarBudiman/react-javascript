import React from 'react'
import Navbar from '../Navbar'
import DataGuru from '../DataDisplay/DataGuru'

const Guru = () => {
  return (
    <>
        <Navbar />
        <div style={{marginTop:100}}>
            <DataGuru />
        </div>
        
    </>
  )
}

export default Guru