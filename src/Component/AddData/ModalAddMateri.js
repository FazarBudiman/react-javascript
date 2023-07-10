import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import axios from 'axios';


const ModalAddMateri = (props) => {
  
  const [materi, setMateri] = useState({
        id_kursus: '',
        nama_materi: '',
        id_materi: ''
    })
  
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
    axios.get(`http://localhost:8081/materi/id/${props.id}`)
    .then(res => 
      res.data.map((k, i) => {
        console.log(k.max)
        if (k.max === null) {
            setMateri({
                id_kursus: parseInt(props.id),
                id_materi: parseInt(props.id + '001')
            })
        } else {
          console.log('affaf')
            setMateri({
                id_kursus: parseInt(props.id),
                id_materi: parseInt(k.max + 1)
            })
        }
    })
    )
    .catch(err => console.log(err.message))
  };

  const handleOk = () => {
    axios.post('http://localhost:8081/materi', materi)
    .then(res => {
      message.open({type: "success", content: 'Materi Berhasil Ditambahkan', duration:1, style:{marginTop: 80}})
      setTimeout(() => {
        handleCancel()
      }, 1000)
    })
    .catch(err => {message.open({type: "error", content: 'Materi Gagal Ditambahkan', duration:1, style:{marginTop: 80}})})
  };

  const handleCancel = () => {
    setMateri({
        id_kursus: '',
        id_materi: '',
        nama_materi: ''
    })
    setOpen(false);
  };


  const handleInput = (event) => {
    setMateri(prev => ({...prev, [event.target.name] : event.target.value}))
  }


  return (
    <>
    <button onClick={showModal}>
        <PlusCircleFilled style={{fontSize: 24}} />
    </button>
      <Modal
        open={open}
        title="Tambah Materi"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Kembali
          </Button>,
          <Button key="submit" onClick={handleOk}>
            Tambah
          </Button>,
        ]}
      >
        <form>
          <div className="mt-2">
              <input
                id="nama_materi"
                name="nama_materi"
                type="text"
                onChange={handleInput}
                placeholder='Nama Materi'
                value={materi.nama_materi}
                required
                className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-2" >
              <input 
                id="id_materi"
                name="id_materi"
                type="text"
                onChange={handleInput}
                placeholder='ID Materi'
                value={materi.id_materi}
                disabled
                required
                className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalAddMateri;