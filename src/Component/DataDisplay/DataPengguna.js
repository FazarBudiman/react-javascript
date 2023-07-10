import { Table } from 'antd';
import Title from 'antd/es/typography/Title';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
const columns = [
  {
    title: 'ID Pengguna',
    dataIndex: 'id',
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '40%'
  },
  {
    title: 'Kata Sandi',
    dataIndex: 'kata_sandi',
    width: '20%',
  },
  {
    title: 'Jenis Pengguna',
    dataIndex: 'jenis_pengguna',
    width: '30%',
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const DataPengguna = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/pengguna')
        .then(res => setData(res.data))
        .catch(err => console.log(err.message))
    }, [])
    return (
        <>
            <div style={{paddingLeft: 100, marginLeft: 24}}>
                <div style={{marginBottom: 25}} >
                  <Title level={3}>Data Pengguna</Title>
                </div>
                <Table bordered={true} tableLayout='fixed'  columns={columns} dataSource={data} onChange={onChange} size='middle' style={{width: '70%', height: 90}} />
            </div>
        </>
    )
}
export default DataPengguna;