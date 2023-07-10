import React  from 'react';
import { Card, Typography} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon} from '@fortawesome/fontawesome-svg-core/import.macro'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Meta from 'antd/es/card/Meta';
import Cookies from 'js-cookie';
import ModalAddCourse from '../AddData/ModalAddCourse';
import EditCourse from '../EditData/EditCourse';


const {Title} = Typography;

const Course = () => {

  return (
    <>
        <Navbar />
          <div style={{ padding: 24, minHeight: 380, marginTop: 100 }}>
            <div>
              <div className='flex justify-around gap-96'>
                <Title level={2} style={{justifySelf: 'self-start'}}>Kursus</Title>
                {Cookies.get('id_kategori_pengguna') < '4' && 
                <div style={{display: 'flex', justifyContent: 'space-evenly', width: '10%'}}> 
                  <EditCourse />
                  <ModalAddCourse />
                </div>}

              </div>
                <div className="mt-24 flex flex-row justify-center gap-24 ">
                  <Link to="/kursus/100" >
                      <Card style={{
                        width: 200,
                        height: 200,
                        padding: 32,
                      }}
                        cover={<FontAwesomeIcon icon={icon({name: 'book', style: "solid", size: '4x'})} size="6x" />}
                      >
                        <Meta title="Ilmu Umum" />
                      </Card>
                  </Link>

                  <Link to="/kursus/101" >
                      <Card style={{
                        width: 200,
                        height: 200,
                        padding: 32,
                      }}
                        cover={<FontAwesomeIcon icon={icon({name: 'flask', style: "solid", size: '4x'})} size="6x" />}
                      >
                        <Meta title="Ilmu Sains" />
                      </Card>
                  </Link>      

                  <Link to="/kursus/102" >
                      <Card style={{
                        width: 200,
                        height: 200,
                        padding: 32,
                      }}
                        cover={<FontAwesomeIcon icon={icon({name: 'people-group', style: "solid", size: '4x'})} size="6x" />}
                      >
                        <Meta title="Ilmu Sosial" />
                      </Card>
                  </Link>
                </div>
            </div>
          </div>
    </>
  );

};

export default Course;