import React from "react";
import Navbar from "../Navbar";
import { Card, Typography } from 'antd';
import PaketBelajar from "../PaketBelajar";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const {Text, Title} = Typography

const Home = () => {
    const nama = Cookies.get('nama')
    
    return(
        <>
            <Navbar />
            {Cookies.get('id_kategori_pengguna') <= 2 && <Navigate to='/kursus' />}
            <div className="flex justify-center pt-12">
            <div className='flex flex-col w-full'>
            <Card
                bordered={true}
                style={{
                    backgroundColor: '#142D55',
                    display: "flex",
                    width: "90%",
                    height: 300,
                    margin: 'auto',
                    borderRadius: 20,
                    marginTop: 100
                }}
            >
               <Title level={2} style={{
                marginTop: 50,
                color: 'white',
               }}>Selamat Datang, {nama}</Title> 

               < Title level={5} style={{
                marginTop: 90,
                color: 'white',
               }}>"Pendidikan adalah senjata terkuat untuk mengubah dunia"</Title>
               
               <Text italic style={{
                color: 'white',
               }}>- Nelson Mandela -</Text>
            </Card>
            <PaketBelajar />
        </div>
            </div>
        </>
    )   
}

export default Home