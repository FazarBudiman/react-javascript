import React from 'react'
import VisualisasiPengguna from './VisualisasiPengguna'
import Charts from './Charts'

const DataVisualization = () => {

  const pengguna = ['Pengguna', 'Guru', 'Siswa', 'Siswa (langganan)']
  const kursus = ['Kategori Kursus', 'Kursus', 'Materi', 'Video Materi']

  return (
    <>
    <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: 30}}>
        <VisualisasiPengguna title = {pengguna} />
        <VisualisasiPengguna title= {kursus} />
    </div>
        <Charts />
    </>
  )
}

export default DataVisualization