import React from 'react'
import Navbar from '../Navbar'
import { Tabs } from 'antd'
import DataGuru from '../DataDisplay/DataGuru'
import DataPengguna from '../DataDisplay/DataPengguna'
import { BarChartOutlined,SolutionOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import DataVisualization from '../DataDisplay/DataVisualization'

const Dashboard = () => {
  return (
    <>
    <Navbar />
    <Tabs
    defaultActiveKey='1'
    tabPosition='left'
    size='middle'
    style={{
        height: '100%',
        width: '100%',
        marginTop: 90,
    }}
    items= {[
        {
            label: (
                <span style={{display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'space-between', width: 150}}>
                    Dashboard
                    <BarChartOutlined style={{fontSize: 18}} />
                </span>
            ),
            key: 1,
            children: <DataVisualization />
        },
        {
            label: (
                <span style={{display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'space-between', width: 150}}>
                    Pengguna
                    <SolutionOutlined style={{fontSize: 18}} />
                </span>
            ),
            key: 2,
            children: <DataPengguna />
        },
        {
            label: (
                <span style={{display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'space-between', width: 150}}>
                    Guru
                    <UsergroupAddOutlined style={{fontSize: 18}} />
                </span>
            ),
            key: 3,
            children: <DataGuru />
        }
    ]}

    />
    </>
  )
}

export default Dashboard