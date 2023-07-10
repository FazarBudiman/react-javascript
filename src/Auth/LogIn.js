import { Card } from 'antd';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const tabListNoTitle = [
  {
    key: 'signIn',
    tab: 'Sign In',
  },
  {
    key: 'signUp',
    tab: 'Sign Up',
  },
];
const contentListNoTitle = {
  signIn: <div><SignIn /></div>,
  signUp: <div><SignUp /></div>
};

const LogIn = () => {

  const [activeTabKey2, setActiveTabKey2] = useState('signIn');
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };


  return (
    <>
      <br />
      <br />
      <Card
        style={{
          width: '50%',
          marginLeft: '25%',
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        defaultActiveTabKey={'signIn'}
        onTabChange={onTab2Change}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};
export default LogIn;