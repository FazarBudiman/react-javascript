import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {Card, Col, Row} from 'antd';
import Navbar from "../Navbar";
import Title from "antd/es/typography/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios";
import Cookies from "js-cookie";
import EditVideo from "../EditData/EditVideo";
import ModalAddVideo from "../AddData/ModalAddVideo";

const CardVideo = () => {
    let params = useParams()
    const [dataVideo, setDataVideo] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8081/videomateri/${params.idVideo.slice(0, 9)}`)
        .then(res => setDataVideo(res.data))
        .catch(err => console.log(err.message))
    }, [params.idVideo])

   const handleClick = (el) => {
        const previewVideo = document.getElementById("previewVideo");
        previewVideo.removeAttribute('hidden')
        let url_video = el.currentTarget.dataset.id;
        previewVideo.src = url_video;
        console.log(url_video)
     }
   

    return (
        <> 
            <Navbar />
            <Link to={'/kursus/' + params.courseName} ><FontAwesomeIcon icon={icon({name: 'circle-arrow-left', style: "solid"})} size="2x" style={{marginLeft: 24, marginTop:100}} /></Link>
            <div className='flex flex-row justify-between px-10 '>
                <Title level={4} style={{marginLeft: 60, marginTop: 8}}>{params.idVideo.slice(9)}</Title> 
                {Cookies.get('id_kategori_pengguna') < '4' && 
                <div className="flex gap-3">
                    <EditVideo />
                    <ModalAddVideo />
                </div>
                }
            </div>

            <video controls id="previewVideo"  hidden src="" className="mt-16 w-2/4 mx-auto" />

            <div className=" mt-10 w-11/12 mx-auto " >   
                <Row gutter={16}  >
                    {dataVideo.map((d, i) => {
                            return (
                                <Col span={4} className="mb-4" id={d.id} >
                                    <Card title={d.judul} onClick={handleClick} className="trigger-video" hoverable data-id={d.direktori}>
                                    <img src={d.thumbnail} alt="thumbnail" />
                                    </Card>
                                </Col>
                            )
                        }
                    )}
                </Row>
            </div>
        </>
    )
}

export default CardVideo;