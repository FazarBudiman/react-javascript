import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Image, Alert} from 'antd'
import Cookies from 'js-cookie';


const FormUploadVideo = (props) => {
  const [form, setForm] = useState('')
  const [preview, setPreview] = useState(null)
  const [uploaded, setUploaded] = useState(false)
  const [uploaddedThumbnail, setUploadedThumbnail] = useState(false)
  const [uploadedVideo, setUploadedVideo] = useState(false)

  useEffect(() => {
    if (props.name === 'Video') {
      setUploaded(false)
    }
  }, [props.name])
  
    const handleInput = (e) => {
        setForm(e.target.files[0])
        let Preview = URL.createObjectURL(e.target.files[0])
        setPreview(Preview)
        
      }

      const handleUpload =() => {
        const formdata = new FormData()
          let url = ''
  
          if (form.type === 'image/png') {
            formdata.append('thumbnail', form) 
            url = 'http://localhost:8081/videomateri/thumbnail'
          } else {
            formdata.append('video', form)
            url = 'http://localhost:8081/videomateri/video'
          }
    
          axios.post(url, formdata)
          .then(res => {
            if (props.name === 'Thumbnail') {
              setUploaded(true)
              setUploadedThumbnail(true)
              Cookies.set('thumbnail', res.data)
            } else {
              setUploadedVideo(true)
              setUploaded(false)
              Cookies.set('video', res.data)
            }
           
            setForm('')
          })
          .catch(err => console.log(err.message))
      }
  return (
            <>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 pb-2">
                <div className="flex justify-center">{(uploaddedThumbnail === false || uploaded === false) && (uploadedVideo === false) ? 
                    <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600 flex-col " >
                        {form !== '' ? <div>{props.name !== 'Video' ? <Image src={preview}  alt='image'/> : <video controls src={preview} /> }  </div> : 
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Tambah {props.name}</span>
                          <input id="file-upload" name="upload" type="file" accept={props.name === 'Video' ? 'video/*' : 'image/*' } className="sr-only" onChange={handleInput} />
                          <p className="text-xs leading-5 text-gray-600">{props.name === 'Video' ? 'MP4' : 'JPG/JPEG/PNG'}</p>
                        </label> }
                        {form !== '' && <Button className='mt-12 mb-0 mx-36' onClick={handleUpload}>Upload</Button>}
                   </div> : 
                   <Alert 
                    message={'Upload ' +props.name+ ' Berhasil'}
                    description='Pilih Next untuk melanjutkan penambahan data'
                    type="success" 
                    showIcon
                    style={{margin: 30}}
                  />
                }</div> 
              </div>
            </>
         )
}

export default FormUploadVideo;
