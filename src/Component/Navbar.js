import React, { useEffect, useState } from "react";
import {Button, Layout, Menu} from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { Link, useHistory, redirect, useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
const { Header} = Layout;

const Navbar = () => {
      let navigate = useNavigate()
      
      const logout = () => {
        Cookies.remove("nama")
        Cookies.remove("email")
        Cookies.remove("kataSandi")
        Cookies.remove('id_kategori_pengguna')
        navigate('/')
      }
      const [item, setItem] = useState([])
    
      const itemSiswa =[
        {
          key: 1,
          label: (
            <Link to='/home'>
              Home
            </Link>
          )
        },
        {
            key: 2,
            label: (
              <Link to='/kursus'>
                Kursus
              </Link>
            )
        },
        {
          key: 5,
          label: (
              <Button type="text" style={{color: 'white', display: 'block', top: 15, left: 750}} icon={<UserOutlined  style={{fontSize: '24px'}} />}>
              </Button>)
          
        },
        {
          key: 6,
          label: (
            <Button onClick={logout} style={{ backgroundColor: 'white', color: 'blue', display: 'block', top: 17, left: 750}}>Log Out</Button>
          )
          
        }
      ]

      const itemAdmin =[
        {
            key: 1,
            label: (
              <Link to='/pengguna'>
                Pengguna
              </Link>
            )
        },
        {
          key: 2,
          label: (
            <Link to='/kursus'>
              Kursus
            </Link>
          )
        }, 
        {
          key: 3,
          label: (
            <Link to='/guru'>
              Guru
            </Link>
          )
        }, 
        {
          key: 5,
          label: (
              <Button type="text" style={{color: 'white', display: 'block', top: 15, left: 750}} icon={<UserOutlined  style={{fontSize: '24px'}} />}>
              </Button>)
          
        },
        {
          key: 6,
          label: (
            <Button onClick={logout} style={{ backgroundColor: 'white', color: 'blue', display: 'block', top: 17, left: 750}}>Log Out</Button>
          )
          
        }
      ]

      const itemAnalis =[
        {
            key: 1,
            label: (
              <Link to='/dashboard'>
                Dashboard
              </Link>
            )
        },
        {
          key: 5,
          label: (
              <Button type="text" style={{color: 'white', display: 'block', top: 15, left: 750}} icon={<UserOutlined  style={{fontSize: '24px'}} />}>
              </Button>)
          
        },
        {
          key: 6,
          label: (
            <Button onClick={logout} style={{ backgroundColor: 'white', color: 'blue', display: 'block', top: 17, left: 750}}>Log Out</Button>
          )
          
        }
      ]

      const itemGuru =[
        {
            key: 1,
            label: (
              <Link to='/kursus'>
                Kursus
              </Link>
            )
        }, 
        {
          key: 5,
          label: (
              <Button type="text" style={{color: 'white', display: 'block', top: 15, left: 750}} icon={<UserOutlined  style={{fontSize: '24px'}} />}>
              </Button>)
          
        },
        {
          key: 6,
          label: (
            <Button onClick={logout} style={{ backgroundColor: 'white', color: 'blue', display: 'block', top: 17, left: 750}}>Log Out</Button>
          )
          
        }
      ]

      useEffect(() => {
        const idKategoriPengguna = parseInt(Cookies.get('id_kategori_pengguna'))
        switch (idKategoriPengguna) {
         case 1:
            setItem(itemAdmin)
            break;
         case 2:
            setItem(itemAnalis)
            break;
         case 3:
            setItem(itemGuru)
            break;
         case 4:
           setItem(itemSiswa)
           break;
         case 5:
            setItem(itemSiswa)
            break;
        
         default:
           break;
        }
        
     }, [])

      

 
      return (
        <Layout>
          <Header style={{position:'fixed', top: 0, zIndex: 10,  width: '100%', marginBottom: 20 }}>
            <div
              style={{
                containerName: 'RuangGuru',
                float: 'left',
                width: 120,
                height: 31,
                margin: '16px 48px 16px 0',
                background: '#142D55',
              }}
            ><p className='absolute top-5 left-16 text-base font-bold text-white '>RuangGuru</p></div>
            <Menu
              theme="dark"
              mode="horizontal"
              items={item}
            />
          </Header>
        </Layout>
      );
}
export default Navbar;