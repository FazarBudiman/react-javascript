import axios from "axios";
import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import {Button, Form, Input, message} from 'antd'
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const SignIn = () => {
    const navigate = useNavigate()
    const [formSignIn] = Form.useForm()
    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleSignIn = (values) => {
        axios.post(`http://localhost:8081/signin`, values)
        .then(res => {if (res.data === 'salah') {
                        message.open({type: 'error', content: 'Email atau Kata Sandi Salah !!', duration:3, style:{marginTop: 80}})
                        formSignIn.resetFields()
                    } else {
                        res.data.map((d) => {
                            if (d.nama !== null) {
                                Cookies.set('nama', d.nama)
                            }
                            Cookies.set('email', d.email)
                            Cookies.set('id_kategori_pengguna', d.id_kategori_pengguna)
        
                            message.open({type: "success", content: 'Berhasil Login', duration:2, style:{marginTop: 80}})
                            setTimeout(() => {
                                switch (parseInt(Cookies.get('id_kategori_pengguna'))) {
                                    case 1:
                                        navigate('/kursus')
                                        break;
                                    case 2:
                                        navigate('/dashboard')
                                        break;
                                    case 3:
                                        navigate('/kursus')
                                        break;
                                    case 4:
                                        navigate('/home')
                                        break;
                                    case 5:
                                        navigate('/home')
                                        break;
                                    default:
                                        navigate('/');
                                        break;
                                }
                                window.location.reload()
                            }, 2000)
                            
                        })
                    }
                }) 
        .catch(err => {
            console.log(err.message)
        })
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form layout="vertical" form={formSignIn} onFinish={handleSignIn} >
                        <Form.Item 
                        name='email' 
                        label='Email' 
                        rules={[
                            {
                                required: true,
                                message: 'Silahkan Masukkan Email Anda !!'
                            }
                        ]}>
                            <Input prefix={<MailOutlined />} />
                        </Form.Item>
                        
                        <Form.Item 
                        name='kataSandi' 
                        label='Kata Sandi'
                        rules={[
                            {
                                required: true,
                                message: 'Silahkan Masukkan Kata Sandi Anda !!'
                            }
                        ]}>
                            <Input.Password 
                            prefix={<LockOutlined />} 
                            visibilityToggle={{
                                visible: passwordVisible, 
                                onVisibleChange: setPasswordVisible
                            }}  />
                        </Form.Item>

                        <Form.Item>
                            <Button 
                            htmlType="submit" 
                            style={{
                                width: '100%', 
                                color: 'black', 
                                border: '1px solid'
                            }} 
                            type="primary"
                            > Sign In </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </>
    )
}
export default SignIn