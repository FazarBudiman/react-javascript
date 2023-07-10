import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, message } from 'antd'
import Cookies from 'js-cookie'

const FormAddVideo = () => {
    let params = useParams()
    let idVideo = params.idVideo.substring(0, 9);

    const [dataVideo, setDataVideo] = useState({
        id_kursus: '',
        id_materi: '',
        id: '',
        judul: '',
        direktori: `http://localhost:8081/assets/video/${Cookies.get('video')}`,
        thumbnail: `http://localhost:8081/assets/thumbnail/${Cookies.get('thumbnail')}` ,
    })

    useEffect(() => {
        axios.get(`http://localhost:8081/videomateri/id/${params.idVideo}`)
        .then(res => res.data.map((k, i) => {
            if (k.max === null) {
                setDataVideo (prev => ({...prev,
                    id_kursus: params.idKursus,
                    id_materi: params.idVideo.substring(0, 9),
                    id: params.idVideo.substring(0, 9) + '001'
                }))
            } else {
                setDataVideo(prev => ({...prev,
                    id_kursus: params.idKursus,
                    id_materi: params.idVideo.substring(0, 9),
                    id: parseInt(k.max) + 1
                }))
            }
        }))
        .catch(err => console.log(err.message))
    }, [params.idVideo, params.idKursus])
    
    const handleInput = (event) => {
        setDataVideo(prev => ({...prev, [event.target.name] : [event.target.value],}))
        
      }

    const handleSubmit = () => {
        axios.post('http://localhost:8081/videomateri', dataVideo)
        .then(res => {
            message.open({type: "success", content: 'Video Berhasil Ditambahkan', duration:1, style:{marginTop: 80}})
            setTimeout(() => {
                window.location.reload(false)
            }, 1000)
        })
        .catch(err => {message.open({type: "error", content: 'Video Gagal Ditambahkan', duration:1, style:{marginTop: 80}})})
    }

  return (
    <>
            <form>
                <div className="mt-2">
                    <input
                        id="judul"
                        name="judul"
                        type="text"
                        onChange={handleInput}
                        placeholder='Judul Video'
                        value={dataVideo.judul}
                        required
                        className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="mt-2">
                    <input 
                        id="id_kursus"
                        name="id_kursus"
                        type="text"
                        onChange={handleInput}
                        placeholder='ID Kursus'
                        value={dataVideo.id_kursus}
                        disabled
                        required
                        className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                    
                <div className="mt-2">
                    <input 
                        id="id_materi"
                        name="id_materi"
                        type="text"
                        onChange={handleInput}
                        placeholder='ID Materi'
                        value={dataVideo.id_materi}
                        disabled
                        required
                        className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
    
                <div className="mt-2">
                    <input
                        id="id"
                        name="id"
                        type="text"
                        onChange={handleInput}
                        placeholder='ID Video'
                        value={dataVideo.id}
                        disabled
                        required
                        className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className='mt-8 mb-4'>
                    <Button className="block w-1/6 rounded-md border-1 left-48 " onClick={handleSubmit}>Tambah</Button>
                </div>
                
            </form>
         </>
  )
}

export default FormAddVideo;