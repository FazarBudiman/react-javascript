import axios from 'axios';
import React, {useEffect, useState } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Charts = () => {
  const [siswa, setSiswa] = useState([])
  const [siswaLangganan, setSiswaLangganan] = useState([])
  const [tahun, setTahun] = useState()


  useEffect(() => {
    axios.get(`http://localhost:8081/dashboard/pengguna/chart`)
    .then(res =>  {
        setSiswa([])
        setSiswaLangganan([])
          res.data.map((k, i) => {
              setTahun(k.tahun)
              setSiswa(prev => [...prev, parseInt(k.siswa_tidak_langganan)])
              setSiswaLangganan(prev => [...prev, parseInt(k.siswa_langganan)])
            console.log(siswa[0])

          })
    })
    .catch(err => console.log(err.message))
  }, [])

 
  const options = {

    chart: {
      type: 'column',
      inverted: false
    },
    title: {
      text: `Grafik Pengguna Tahun ${tahun} `
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Jumlah'
      }
    },
    series: [{
      name: 'Siswa Langganan',
      data: siswaLangganan
  
    }, {
      name: 'Siswa Tidak Langganan',
      data: siswa
  
    }, ]
  }


    return (
      <>
        <div style={{width: '50%'}}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </>
    );
}

export default Charts;