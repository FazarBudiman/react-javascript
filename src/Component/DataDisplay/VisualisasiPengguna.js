import React, { useEffect, useState } from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import axios from 'axios'

const VisualisasiPengguna = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        if (props.title[0] === 'Kategori Kursus') {
            axios.get(`http://localhost:8081/dashboard/kursus`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err.message))
        } else if (props.title[0] === 'Pengguna'){
            axios.get(`http://localhost:8081/dashboard/pengguna`)
            .then(res => setData(res.data))
            .catch(err => console.log(err.message))
        }

    }, [])
    
    
  return (
    <>
        <Row gutter={10} style={{width: '50%', backgroundColor: '#f1f1f1', padding: 15}}>
        <Col span={24} >
            <Card bordered={false} >
                <Statistic
                title={props.title[0]}
                value={data.map((k) => {
                    return k.jumlah_1
                })}
                valueStyle={{
                    color: '#cf1322',
                }}
                />
            </Card>
        </Col>

        <Col span={24} >
            <Card bordered={false} >
                <Card.Grid style={{width: '33%'}} hoverable={false}  bordered={false}>
                <Statistic
                title={props.title[1]}
                value={data.map((k) => {
                    return k.jumlah_2
                })}
                valueStyle={{
                    color: '#3f8600',
                }}
                />
                </Card.Grid>

                <Card.Grid style={{width: '33%'}} hoverable={false}  bordered={false}>
                <Statistic
                  title={props.title[2]}
                value={data.map((k) => {
                    return k.jumlah_3
                })}
                valueStyle={{
                    color: '#3f8600',
                }}
                />
                </Card.Grid>

                <Card.Grid style={{width: '33%'}} hoverable={false}  bordered={false}>
                <Statistic
                 title={props.title[3]}
                value={data.map((k) => {
                    return k.jumlah_4
                })}
                valueStyle={{
                    color: '#3f8600',
                }}
                />
                </Card.Grid>
                
               

            </Card>
        </Col>
        
  
  </Row>
    </>
  )
}

export default VisualisasiPengguna