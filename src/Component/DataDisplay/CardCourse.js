import React, {useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {Card } from "antd";
import Navbar from "../Navbar";
import Title from "antd/es/typography/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios";
import Cookies from "js-cookie";
import EditMateri from "../EditData/EditMateri";
import ModalAddMateri from "../AddData/ModalAddMateri";
import { LockFilled } from "@ant-design/icons";


const CardCourse = () => {
  let params = useParams();
  const [kursus, setKursus] = useState([])
  const [materi, setMateri] = useState([])
  const [penggunaLangganan, setPenggunaLangganan] = useState(false)
  
  let [title, setTitle] = useState("")

  useEffect(() => {
    axios.get(`http://localhost:8081/course/kategori/${params.courseName}`)
    .then(res => setKursus(res.data))
    .catch(err => console.log(err))
  }, [kursus])
  
  useEffect(() => {
    axios.get(`http://localhost:8081/materi`)
    .then(res => setMateri(res.data))
    .catch(err => console.log(err))
  }, [materi])
  
  useEffect(() => {
    axios.get(`http://localhost:8081/pengguna/langganan`)
    .then(res => {
      res.data.map((p, k) => {
        if (p.email === Cookies.get('email') && p.tanggal_mulai !== p.tanggal_selesai) {
          setPenggunaLangganan(true)
        } 
      })
    })
    .catch(err => console.log(err))
  }, [penggunaLangganan])

  
  return (
    <>
      <Navbar />
      <Link to='/kursus' ><FontAwesomeIcon icon={icon({name: 'circle-arrow-left', style: "solid"})} size="2x" style={{marginLeft: 24, marginTop:100}} /></Link> 
      <div style={{ padding: 24, minHeight: 380, marginLeft: 24 }}>
      <div className='flex flex-row justify-between px-10 '>
        <Title level={3} >{title}</Title>
      </div>

        {kursus.map((k, i) => {
          if (title === "") {
            setTitle(k.kategori)
          }
          return (
          <>
              <Card 
                key={k.id}
                title={k.nama}
                className="mt-8  p-1" 
                extra={Cookies.get('id_kategori_pengguna') < '4' &&
                  <div className="flex gap-4">
                    <EditMateri id= {k.id} />
                    <ModalAddMateri id={k.id} />
                  </div>}
              >
                {materi.map((m, key) => {
                  if(k.id === m.id_kursus ) {
                    
                      return (
                        <Card.Grid style={{width: '25%', textAlign: 'center'}} key={m.id}>
                          {penggunaLangganan === true || Cookies.get('id_kategori_pengguna') !== 4 ? <Link to={k.id + '/' + m.id + m.judul_materi} >{m.judul_materi}</Link> :
                          <div >
                            <LockFilled style={{display: 'block', fontSize: 25, }} />
                            <p>{m.judul_materi}</p>
                          </div>
                  }
                          
                        </Card.Grid>
                      )
                    }
                })}
              </Card>      
          </>
          )
        })}
      </div>
    </>
  )
}

export default CardCourse;