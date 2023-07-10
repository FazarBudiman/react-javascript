import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Form, Input, Select, message } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";

const SignUp = () => {

    const [formSignUp] = Form.useForm()
    const [passwordVisible, setpasswordVisible] = useState(false)

    useEffect(() => {
        formSignUp.setFieldValue('id_siswa', Math.floor(Math.random() * 100000) + 1 )
        formSignUp.setFieldValue('id_kategori_pengguna', 4)

    }, [formSignUp])

    const handleSignUp = (values) => {
        axios.post(`http://localhost:8081/signup`, values)
        .then (res => {
            message.open({type: "success", content: 'Daftar Berhasil', duration:2, style:{marginTop: 80}})
            formSignUp.resetFields()
        })
        .catch(err => {message.open({type: 'error', content: 'Daftar Gagal', duration: 5, style:{marginTop: 80} })})
        
        console.log(values)
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <Form layout="vertical" form={formSignUp} onFinish={handleSignUp}>
                    <Form.Item name='id_kategori_pengguna' label='Id Siswa' hidden>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='id_siswa' label='Id Siswa' hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item name='nama_siswa' label='Nama' rules={[
                        {
                            required: true,
                            message: 'Silahkan Masukkan Nama Anda'
                        }]}>
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item name='email_siswa' label='Email' rules={[
                        {
                            required: true,
                            message: 'Silahkan Masukkan Email Anda'
                        }]}>
                        <Input prefix={<MailOutlined />} />
                    </Form.Item>
                    <Form.Item name='kataSandi' label='Kata Sandi' rules={[
                        {
                            required: true,
                            message: 'Silahkan Masukkan Kata Sandi !!'
                        },
                        {
                            min: 8,
                            message: 'Kata Sandi harus 8 karakter'
                        },
                        {
                            pattern: /[A-Z]/,
                            message: 'Harus Mengandung 1 Huruf Kapital'
                        },
                        {
                            pattern: /[0-9]/,
                            message: 'Harus Mengandung Angka'
                        },
                        {
                            pattern: /[^A-Za-z0-9]/,
                            message: 'Harus mengandung 1 karakter spesial'
                        }
                    ]}>
                        <Input.Password prefix={<LockOutlined />}
                        visibilityToggle={{
                            visible: passwordVisible,
                            onVisibleChange: setpasswordVisible,
                        }} />
                    </Form.Item>
                    <Form.Item name='jenjang' label='Jenjang'>
                        <Select allowClear placeholder='Pilih Jenjang' 
                        options={[
                            {
                                label: 'SD',
                                value: 'SD',
                            },
                            {
                                label: 'SMP',
                                value: 'SMP',
                            },
                            {
                                label: 'SMA',
                                value: 'SMA',
                            },
                        ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" style={{width: '100%', color: 'black', border: '1px solid'}} type="primary">Sign Up</Button>
                    </Form.Item>

                </Form>
                </div>
            </div>
        </>
    )
}
export default SignUp;