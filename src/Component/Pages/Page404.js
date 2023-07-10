import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Mohon Maaf. Mau Kemana Nich ???"
        extra={<Button className='bg-blue-600 text-white hover:bg-white'> <Link to='/'>Back Home</Link> </Button>}
    
        className=' mt-24'
      />

    </>
  )
  };

export default Page404;