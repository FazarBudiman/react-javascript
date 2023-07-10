import React, { useState } from 'react'
import axios from 'axios'
import { Modal, Popconfirm, message } from 'antd';
import {DeleteOutlined, EditFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';


const EditVideo = (props) => {
    const params = useParams()
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([{
        id: '',
        direktori: '',
        thumbnail: ''
    }])

    const showModal = () => {
        setOpen(true)
        axios.get(`http://localhost:8081/videomateri/${params.idVideo.slice(0, 9)}`)
        .then(res => {
            setData(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    const handleCancel = () => {
        setOpen(false)
        setData([])
    }

    const handleDelete = (id, direktori, thumbnail) => {
            axios.post(`http://localhost:8081/videomateri/deleteVideo`, ({id: id, direktori: direktori, thumbnail: thumbnail}))
            .then(res => {
                if (res.data === 'update or delete on table "materi" violates foreign key constraint "video_materi_fk" on table "video_materi"') {
                    message.open({type:'error', content: 'Silahkan hapus video pada materi terlebih dahulu', duration:3, style:{marginTop: 80}})
                } else {
                    message.open({type: "success", content:`${res.data}`, duration:1, style:{marginTop: 80}})
                }
                handleCancel()
                window.location.reload(false)
            })
            .catch(err => message.open({type:'error', content: `${err.message}`, duration:5, style:{marginTop: 80}}))
    }

      const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: (a, b) => a.id -b.id,
            width: '20%'
        },
        {
            title: 'Judul Video',
            dataIndex: 'judul',
            width: '45%',
        },
        {
            title: 'Action',
            dataIndex: 'direktori',
            render: (_, record) => (
                <Popconfirm title='Data Akan Dihapus ?' placement='right' onConfirm={() => handleDelete(record.id, record.direktori, record.thumbnail)} okText='Hapus' okType='danger' cancelText= 'Tidak' icon={<QuestionCircleOutlined
                    style={{
                      color: 'red',
                    }}
                  />}>
                   <DeleteOutlined style={{fontSize: 18, width:50}} />
                </Popconfirm>
               
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
                title="Tabel Video"
                onCancel={handleCancel}
                footer={[null]}
                width='45%'
            >
                <Table columns={columns} dataSource={data} size='small' rowKey={data.id}   />
            </Modal>
        </>
  )
}

export default EditVideo;
