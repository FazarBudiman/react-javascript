import React, { useState } from 'react';
import { Button, Modal, message, Select  } from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import axios from 'axios';


const ModalAddCourse = () => {
  
  const [open, setOpen] = useState(false);
  
  const showModal = () => {
    setOpen(true);
  };

  const [course, setCourse] = useState({
    id_kategori_kursus: '',
    nama_kursus: '',
    id_kursus: ''
  })

  const handleSelect = (value) => {
    axios.get(`http://localhost:8081/course/id/${value}`)
    .then(res => res.data.map((k, i) => {
      if (k.max === null) {
        setCourse ({
          id_kategori_kursus: value,
          id_kursus: value + '001'
        })
      } else {
        setCourse ({
          id_kategori_kursus: value,
          id_kursus: k.max + 1
        })
    }
    }))
    .catch(err => console.log(err))
  }

  const handleInput = (event) => {
    setCourse(prev => ({...prev, [event.target.name] : [event.target.value]}))
  }

  const handleCancel = () => {
    setCourse({
      id_kategori_kursus: '',
      nama_kursus: '',
      id_kursus: ''
    })
    window.location.reload(false)
    setOpen(false);
  };

  const handleTambahCourse = () => {
    axios.post('http://localhost:8081/course', course)
    .then(res => {
      message.open({type: "success", content: 'Kursus Berhasil Ditambahkan', duration:1, style:{marginTop: 80}})
      setTimeout(() => {
        handleCancel()
      }, 1000)
    })
    .catch(err => message.open({type: "error", content: 'Kursus Gagal Ditambahkan', duration:1, style:{marginTop: 80}}))
  };
  
  return (
    <>
    <button onClick={showModal}>
        <PlusCircleFilled style={{fontSize: 32}} />
    </button>
      <Modal
        open={open}
        title="Tambah Kursus"
        onOk={handleTambahCourse}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Kembali
          </Button>,
          <Button key="submit" onClick={handleTambahCourse}>
            Tambah
          </Button>,
        ]}
      >
        <form>
          <div className='mt-2'>
          <Select
            id='id_kategori_kursus'
            name='id_kategori_kursus'
            placeholder= 'Kategori Kursus'
            style={{
              width: 180,
            }}
            onChange={handleSelect}
            options={[
              {
                value: '100',
                label: 'Ilmu Umum',
              },
              {
                value: '101',
                label: 'Ilmu Sains',
              },
              {
                value: '102',
                label: 'Ilmu Sosial',
              },
            ]}
          />
          </div>

          <div className="mt-2">
              <input
                id="nama_kursus"
                name="nama_kursus"
                type="text"
                onChange={handleInput}
                placeholder='Nama Kursus'
                value={course.nama_kursus}
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
                value={course.id_kursus}
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

export default ModalAddCourse;