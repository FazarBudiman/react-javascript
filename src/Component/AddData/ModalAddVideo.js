import React, { useState } from 'react'
import { Modal, Button, Steps, theme, Upload } from 'antd'
import { PlusCircleFilled,} from '@ant-design/icons'
import FormAddVideo from './FormAddVideo';
import FormUploadVideo from './FormUploadVideo';


const steps = [
    {
      title: 'Thumbnail',
      content: <FormUploadVideo name='Thumbnail' />
      
    },
    {
      title: 'Video',
      content: <FormUploadVideo name='Video' />
    },
    {
      title: 'Judul',
      content: <FormAddVideo />
      
    },
  ];


const ModalAddVideo = () => {

    const [open, setOpen] = useState(false)

    const showModal =() => {
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
        window.location.reload(false)
    }

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
      setCurrent(current + 1);
    };

    const prev = () => {
      setCurrent(current - 1);
    };
    
    const items = steps.map((item) => ({
      key: item.title,
      title: item.title,
    }));
    
    const contentStyle = {
      lineHeight: '260px',
      textAlign: 'center',
      color: token.colorTextTertiary,
      backgroundColor: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: `1px dashed ${token.colorBorder}`,
      marginTop: 16,
    };

    
  return (
    <>
        <button onClick={showModal}>
            <PlusCircleFilled style={{fontSize: 24}} />
        </button>
        <Modal
        open={open}
        title="Tambah Video"
        onCancel={handleCancel}
        footer={[null]}
        
      >
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
            style={{
            marginTop: 24,
            }}
        >
            {current < steps.length - 1 &&  (
            <Button onClick={() => next()}>
                Next
            </Button>
            )}
            
            {current > 0 && (
            <Button
                style={{
                margin: '0 8px',
                }}
                onClick={() => prev()}
            >
                Previous
            </Button>
            )}
        </div>
      </Modal>
    </>
  )
}

export default ModalAddVideo;