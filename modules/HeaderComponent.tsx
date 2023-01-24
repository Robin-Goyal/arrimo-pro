import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { Fragment, MouseEventHandler, useEffect, useState } from 'react';
import Link from 'next/link';
import { checkUserLogin, loggedIn, logout } from '../redux-modules/User/userSlices';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

const HeaderComponent = () => {

  const loginStatus = useSelector(loggedIn)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (loginStatus) {
      router.push("/user/dashboard");
    }
  }, [loginStatus])
  const items = [
    {
      label: (<Link href="/user/register"><a>Register</a></Link>),
      key: 'mail',
    },
    {
      label: (<Link href="/user/login"><a>login</a></Link>),
      key: 'app',
    },
  ];

  const loginItems = [
    {
      label: (<Link href="/user/dashboard/all-users"><a>All Users</a></Link>),
      key: 'mail',
    },
    {
      label: (<Link href="/user/edit-user"><a>Edit Current User</a></Link>),
      key: 'edit',
    },
    {
      label: (
        <Button onClick={() => {
          dispatch(logout())
          router.push('/')
        }
        }>logout</Button>
      ),
      key: 'logout',
    },
  ];


  const [current, setCurrent] = useState('mail');
  const onClick = (e: any) => {
    setCurrent(e.key);
  };
  return (
    <Fragment>
      <Menu onClick={(e) => onClick(e)} selectedKeys={[current]} mode="horizontal" items={loginStatus ? loginItems : items} style={{ justifyContent: 'center', background: '#c1ff16', color: 'black' }} theme="light" />
    </Fragment>
  )

}

export default HeaderComponent;