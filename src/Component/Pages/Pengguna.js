import React from 'react'
import Navbar from '../Navbar'
import DataPengguna from '../DataDisplay/DataPengguna'

const Pengguna = () => {
  return (
    <>
        <Navbar />
        <div style={{marginTop: 100}}>
        <DataPengguna  />
        </div>
        
    </>
  )
}

export default Pengguna