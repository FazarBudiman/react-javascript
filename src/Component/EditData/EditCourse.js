import React, { useState } from 'react'
import axios from 'axios'
import { Modal, Popconfirm, message, Button, Input, Space } from 'antd';
import {DeleteOutlined, EditFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';

const EditCourse = () => {
    
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    
    const showModalEdit = () => {
        axios.get('http://localhost:8081/course')
        .then(res => setData(res.data))
        .catch(err => console.log(err.message))
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };


    const [modalUpdate, setModalUpdate] = useState(false);
    const [updateData, setUpdateData] = useState({
        id_kategori_kursus: '',
        id: '',
        nama: '',
    })
    const showModalUpdate = (id) => {
        axios.get(`http://localhost:8081/course/${id}`)
        .then(res => {
            res.data.map((k, i) => {
                setUpdateData({
                    id_kategori_kursus: k.id_kategori_kursus,
                    id: k.id,
                    nama: k.nama
                })
            })
        })
        .catch(err => console.log(err.message))
        setModalUpdate(true);
    };
    
    const handleInput = (e) => {
        setUpdateData(prev => ({...prev, nama: e.target.value}))
    }

    const handleUpdate = (id) => {
        axios.put(`http://localhost:8081/course/${id}`, (updateData))
        .then(res => message.open({type: "success", content:`${res.data}`, duration:1, style:{marginTop: 80}}))
        .catch(err => message.open({type: "error", content:`${err.message}`, duration:1, style:{marginTop: 80}}))
        
        setModalUpdate(false);
        setTimeout(() => {
            showModalEdit()
        }, 500)
    };

    const handleCancelUpdate = () => {
        setModalUpdate(false);
    };


    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/course/${id}`)
        .then(res => {
            if (res.data === 'update or delete on table "kursus" violates foreign key constraint "materi_fk" on table "materi"') {
                message.open({type:'error', content: 'Silahkan hapus materi pada kursus terlebih dahulu', duration:3, style:{marginTop: 80}})
            } else {
                message.open({type: "success", content:`${res.data}`, duration:1, style:{marginTop: 80}})
            }
        })
        .catch(err => message.open({type:'error', content: `${err.message}`, duration:3, style:{marginTop: 80}}))
        setOpen(false)
    }

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
            title: 'Kategori',
            dataIndex: 'kategori',
            width: '30%',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (_, record) => (
                <div className='flex gap-3'>
                    <EditFilled onClick={() => showModalUpdate(record.id)} style={{fontSize: 18}} />
                    <Modal title="Update Course" open={modalUpdate} footer onCancel={handleCancelUpdate}>
                        <Space.Compact style={{ width: '100%'}}>
                            <Input value={updateData.nama} onChange={handleInput} />
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
            <button onClick={showModalEdit}>
                <EditFilled style={{fontSize: 32}} />
            </button>
            <Modal
                open={open}
                title="Tabel Kursus"
                onCancel={handleCancel}
                footer={[null]}
                width='45%'
            >
                <Table columns={columns} dataSource={data} onChange={onChange} size='small' rowKey={data.id}   />
            </Modal>
        </>
  )
}

export default EditCourse;
