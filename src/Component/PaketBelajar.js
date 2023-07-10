import React, { useEffect, useState } from 'react'
import {Card, Col, Row, Button, Modal, QRCode, message} from 'antd'
import axios from 'axios'
import Title from 'antd/es/typography/Title'
import Cookies from 'js-cookie'


const PaketBelajar = () => {
  const [data, setData] = useState([])
  

  useEffect(() => {
    axios.get(`http://localhost:8081/langganan`)
    .then(res => {
      setData(res.data)
    })
    .catch(err => console.log(err.message))
  }, [data])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataPayment, setDataPayment] = useState({})

  useEffect(() => {
    if (isModalOpen === true) {
      setTimeout(() => {
        axios.post(`http://localhost:8081/langganan/pembayaran/sukses`, ({id_langganan: dataPayment.id, id_jenis_langganan: dataPayment.id_jenis_langganan, email: Cookies.get('email'), lama_langganan: dataPayment.lama_langganan}))
        .then(res => {
          message.open({type: "success", content: `${res.data}`, duration:2, style:{marginTop: 80}})
          setIsModalOpen(false)
        })
        .catch(err => message.open({type: "error", content: `${err.message}`, duration:2, style:{marginTop: 80}}))
        
      }, 3000)
      
    }
  }, [isModalOpen, dataPayment])




  const showModal = (id_jenis_langganan) => {
    const id_langganan = Math.floor(Math.random()* 100000) + 1
    data.map((k) => {
      if (k.id === id_jenis_langganan) {
        setDataPayment({
          id: id_langganan,
          id_jenis_langganan: k.id,
          nama: k.nama,
          harga: k.harga,
          lama_langganan: k.lama_langganan
        })

        axios.post(`http://localhost:8081/langganan/pembayaran`, ({
            id: id_langganan,
            id_jenis_langganan: k.id,
            jumlah: k.harga,
           
          }))
      }
    })
    
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Row style={{gap: 25, marginTop: 50, display:'flex', justifyContent: 'center', marginBottom: 50}}>
        {data.map((k, i) => {
          return(
          <Col span={6}>
          <Card 
          title={k.nama} 
          bordered={true} 
          hoverable
          style={{border: '1px solid black'}}
          headStyle={{textAlign: 'center'}} 
          actions={[<Button onClick={() => showModal(k.id)} >Langganan</Button>]}>
            <Title level={2} style={{textAlign: 'center'}}>{ 'Rp ' + k.harga}<Title level={5}>{k.lama_langganan}</Title></Title>
            <div style={{marginTop: 30}}>{k.deskripsi}</div>
          </Card>
          </Col>
          )
        })}
      </Row>

      <Modal 
      open={isModalOpen}
      onCancel={closeModal}
      footer={[null]}>
        <Card 
          title={dataPayment.nama} 
          bordered={false} 
          style={{}}
          headStyle={{textAlign: 'center'}} 
        >
            <Title level={2} style={{textAlign: 'center'}}>{ 'Rp ' + dataPayment.harga}</Title>
            <div style={{display:'flex', alignItems: 'center', flexDirection: 'column', marginTop: 50}}>
              <Title level={4}>Scan Untuk Berlangganan</Title>
              <QRCode value='http://google.com' />
            </div>
          </Card>
      </Modal>

    </>
  )
}

export default PaketBelajar

