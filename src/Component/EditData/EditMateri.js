import React, {useState } from 'react'
import axios from 'axios'
import { Modal, Popconfirm, message, Space, Input, Button } from 'antd';
import {DeleteOutlined, EditFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';

const EditMateri = (props) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

    const showModal = () => {
        setOpen(true)
        axios.get('http://localhost:8081/materi')
        .then(res =>
            res.data.map((k, i) => {
                if (k.id_kursus === props.id && k.id !== null) {
                    setData(prev => ([ ...prev, {
                        id: k.id,
                        nama: k.judul_materi,
                        kategori: k.nama_kursus,
                    }]))
                }
            })
        )
        .catch(err => console.log(err.message))
        
    }

    const handleCancel = () => {
        setOpen(false)
        setData([])
    }
    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/materi/${id}`)
        .then(res => {
            if (res.data === 'update or delete on table "materi" violates foreign key constraint "video_materi_fk" on table "video_materi"') {
                message.open({type:'error', content: 'Silahkan hapus video pada materi terlebih dahulu', duration:3, style:{marginTop: 80}})
            } else {
                message.open({type: "success", content:`${res.data}`, duration:1, style:{marginTop: 80}})
            }
            handleCancel()
        })
        .catch(err => message.open({type:'error', content: `${err.message}`, duration:5, style:{marginTop: 80}}))
    
    }

    const [modalUpdate, setModalUpdate] = useState(false);
    const [updateData, setUpdateData] = useState({
        id: '',
        judul_materi: ''
    })
    const showModalUpdate = (id) => {
        axios.get(`http://localhost:8081/materi/${id}`)
       .then(res => res.data.map((k, i) => {
        setUpdateData({
            id: k.id,
            judul_materi: k.judul_materi
        })
       }))
       .catch(err => console.log(err.message))
        setModalUpdate(true)
    };
    
    const handleInput = (e) => {
        setUpdateData(prev => ({...prev, judul_materi: e.target.value}))
    }

    const handleUpdate = (id) => {
      axios.put(`http://localhost:8081/materi/${id}`, (updateData))
      .then(res => message.open({type: "success", content:`${res.data}`, duration:1, style:{marginTop: 80}}))
      .catch(err => message.open({type: "error", content:`${err.message}`, duration:1, style:{marginTop: 80}}))
      
      setModalUpdate(false)
      setData([])
      setTimeout(() => {
        showModal()
      }, 100)
      
    };

    const handleCancelUpdate = () => {
        setModalUpdate(false);
    };

      const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: (a, b) => a.id -b.id,
            width: '20%'
        },
        {
            title: 'Nama',
            dataIndex: 'nama',
            width: '45%',
        },
        
        {
            title: 'Kategori Materi',
            dataIndex: 'kategori',
            width: '30%',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (_, record) => (
                <div className='flex gap-3'>
                    <EditFilled onClick={() => showModalUpdate(record.id)} style={{fontSize: 18}} />
                    <Modal title="Update Materi" open={modalUpdate} footer onCancel={handleCancelUpdate}>
                        <Space.Compact style={{ width: '100%'}}>
                            <Input value={updateData.judul_materi} onChange={handleInput} />
                            <Button type='primary' style={{color: 'black'}} onClick={() => handleUpdate(updateData.id)}>Update</Button>
                        </Space.Compact>
                    </Modal>
                    <Popconfirm title='Data Akan Dihapus ?' placement='right' onConfirm={() => handleDelete(record.id)} okText='Hapus' okType='danger' cancelText= 'Tidak' icon={<QuestionCircleOutlined
                        style={{
                        color: 'red',
                        }}
                    />}>
                    <DeleteOutlined style={{fontSize: 18, width:50}} />
                    </Popconfirm>

                </div>
               
            )
        }
    ];
  return ( 
        <>
            <button onClick={showModal}>
                <EditFilled style={{fontSize: 24}} />
            </button>
            <Modal
                open={open}
                title="Tabel Materi"
                onCancel={handleCancel}
                footer={[null]}
                width='45%'
            >
                <Table columns={columns} dataSource={data}  size='small' rowKey={data.id}   />
            </Modal>
        </>
  )
}

export default EditMateri;
