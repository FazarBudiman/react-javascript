import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Select, Table, message } from 'antd';
import Title from 'antd/es/typography/Title';
import Navbar from '../Navbar';
import axios from 'axios';
import { EditOutlined, FileAddOutlined, LockOutlined, MailOutlined, PlusCircleFilled, UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import Cookies from 'js-cookie';


const DataGuru = () => {
    const [data, setData] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:8081/guru')
        .then(res => setData(res.data))
        .catch(err => console.log(err.message))
    }, [])

    const [modalAdd, SetModalAdd] = useState(false)
    const [kategoriGuru, setKategoriGuru] = useState([])
    const [formGuru] = Form.useForm()

    const showModal = (e, nama, id, kategori) => {
        if (e === 'add') {
            axios.get('http://localhost:8081/guru/kategori')
            .then(res => setKategoriGuru(res.data))
            .catch(err => console.log(err))
            SetModalAdd(true)
            formGuru.setFieldValue('id', Math.floor(Math.random() * 100000) + 1)
            
        } else {
            axios.get('http://localhost:8081/guru/kategori')
            .then(res => {
                setKategoriGuru(res.data)
               
            })
            .catch(err => console.log(err))
            formGuru.setFieldValue('nama_guru', nama)
            formGuru.setFieldValue('id_guru', id)
            // formGuru.setFieldValue('id_kategori', kategori)
                setModalEdit(true)
        }
    }

    const closeModal = (e) => {
        formGuru.resetFields()
        if (e === 'add') {
            SetModalAdd(false)
        } else {
            setModalEdit(false)
        }
    }

    const handleSubmit = (values) => {
        axios.post(`http://localhost:8081/guru`, values) 
        .then(res => {
            message.open({type: "success", content: 'Guru Berhasil Ditambahkan', duration:1, style:{marginTop: 80}})
            setTimeout(() => {
               window.location.reload(false)
            }, 1000)
        })
        .catch(err =>message.open({type: "error", content: 'Guru Gagal Ditambahkan', duration:1, style:{marginTop: 80}}))
    }

    const [modalEdit, setModalEdit] = useState(false)
    const handleUpdate = (values) => {
        axios.put(`http://localhost:8081/guru/${values.id_guru}`, values)
        .then(res =>  message.open({type: "success", content:`${res.data}`, duration:1, style:{marginTop: 80}}))
        setTimeout(() => {
           window.location.reload(false)
        }, 1000)
        .catch(err => message.open({type: "error", content: 'Guru Gagal Ditambahkan', duration:1, style:{marginTop: 80}}))
    }

    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8081/guru/${id}`)
        .then(res => {
            message.open({type: "success", content:`${res.data}`, duration:1, style:{marginTop: 80}})
            setTimeout(() => {
                window.location.reload(false)
            }, 1000)
        })
        .catch(err => message.open({type: "error", content: `${err.message}`, duration:1, style:{marginTop: 80}}))
        
    }

    const columns = [
        {
          title: 'ID Guru',
          dataIndex: 'id_guru',
          width: '10%',
        },
        {
            title: 'Nama',
            dataIndex: 'nama_guru',
            width: '10%',
          },
        {
          title: 'Email',
          dataIndex: 'email',
          width: '40%'
        },
        {
          title: 'Kategori',
          dataIndex: 'jenis_kategori',
          width: '20%',
        },
        {
            title: 'Action',
            dataIndex: 'id_guru',
            render: (_, record) => (
                <>
                    <EditOutlined style={{fontSize: 22, marginLeft: '25%'}} onClick={() => showModal('edit', record.nama_guru, record.id_guru, record.jenis_kategori) }  />
                    <Modal open={modalEdit} onCancel={() => closeModal('edit')} footer={[null]} title= 'Edit Guru'>
                    <Form layout='horizontal' form={formGuru} onFinish={handleUpdate} >
                        <Form.Item name='nama_guru' required>
                            <Input prefix={<UserOutlined />} placeholder='Nama' size='large' required />
                        </Form.Item>
                        <Form.Item name='id_guru'  hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item name='id_kategori' required >
                            <Select placeholder='Kategori Guru' clearIcon={<UserOutlined />} size='large' required
                            options={kategoriGuru.map((k, i) => ({
                                label: k.jenis_kategori,
                                value: k.id_kategori
                            }))} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit'>Update</Button>
                            <Button danger style={{display: 'block', left: 400, top: -30, marginBottom: -30}} onClick={() => handleDelete(record.id_guru)}>Delete</Button>
                        </Form.Item>
                    </Form>
                    </Modal>
                </>
            ),
            width: '5%',
          },
      ];
      
      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
    return (
        <>
            <div style={{paddingLeft: 100, width: '100%'}}>
                {Cookies.get('id_kategori_pengguna') === '1'}
                <div style={{marginBottom: 25, display: 'flex', width: '70%', justifyContent: 'space-between'}}>
                    <Title level={3}>Data Guru</Title>
                    {Cookies.get('id_kategori_pengguna') === '1' &&
                    <PlusCircleFilled style={{fontSize: 32}}  onClick={() => showModal('add')}/>
                    }
                </div>
                <Modal 
                title='Tambah Guru'
                 open={modalAdd} 
                 onCancel={() => closeModal('add')} 
                 footer={[null]} >
                    <Form layout='horizontal' form={formGuru} onFinish={handleSubmit} >
                        <Form.Item name='nama_guru'>
                            <Input prefix={<UserOutlined />} placeholder='Nama' size='large' />
                        </Form.Item>
                        <Form.Item name='id' hidden>
                            <Input placeholder='id' value={() => { return Math.floor(Math.random() * 100000) + 1}} />
                        </Form.Item>
                        <Form.Item name='id_kategori' >
                            <Select placeholder='Kategori Guru' clearIcon={<UserOutlined />} size='large'>
                                {kategoriGuru.map((k, i) => {
                                    return (
                                        <Select.Option value={k.id_kategori}>{k.jenis_kategori}</Select.Option>
                                    )
                                })}
                                
                            </Select>
                        </Form.Item>
                        <Form.Item name='email'>
                            <Input prefix={<MailOutlined />} placeholder='Email' size='large' />
                        </Form.Item>
                        <Form.Item name='kata_sandi'>
                            <Input.Password prefix={<LockOutlined />} placeholder='Kata Sandi' size='large' />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit'>Submit</Button>
                        </Form.Item>
                    </Form>
                 </Modal>
                <Table bordered  columns={columns} dataSource={data} onChange={onChange} style={{width: '70%', height: 100}} size='middle' />
            </div>
        </>
    )
}

export default DataGuru
