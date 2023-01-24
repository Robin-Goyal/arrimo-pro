import { Button, Form, Input, InputNumber, Space, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, getAllUsers, resertUserAddedStatus, updateCurrentUser, userAddedErrorMessage, userAddedErrorStatus, userAddedStatus, userList } from '../redux-modules/User/userSlices';
import { co } from '@fullcalendar/core/internal-common';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

type RegisterUserPropType = {
  edit: boolean,
  id: string | null
}

const RegisterOrEditUser = (props: RegisterUserPropType) => {
  const { edit, id } = props;
  const dispatch = useDispatch();
  const status = useSelector(userAddedStatus);
  const userListData = useSelector(userList);

  const errorStatus = useSelector(userAddedErrorStatus);
  const errorMessage = useSelector(userAddedErrorMessage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Title } = Typography;
  const [user, setUser] = useState<any>(userListData.filter((item: any) => item._id === id)[0] || null);

  const form = useRef(null);

  const onFinish = (values: any) => {
    if (edit === false) {
      // @ts-ignore
      dispatch(createNewUser(values.user))
      setUser(values.user)
    }
    console.log(values);
  };

  useEffect(() => {
    if (status || errorStatus) {
      showModal()
    }
  }, [status, errorStatus])

  useEffect(() => {
    if (form?.current) {
      // @ts-ignore
      form.current.resetFields()
    }
  }, [user]);

  useEffect(() => {
    if (userListData && userListData.length) {
      setUser(userListData.filter((item: any) => item._id === id)[0]);
    }
    else {
      // @ts-ignore
      dispatch(getAllUsers());

    }
  }, [])

  useEffect(() => {
    if (userListData && userListData.length) {
      setUser(userListData.filter((item: any) => item._id === id)[0]);
    }
  }, [userListData])




  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(resertUserAddedStatus())
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(resertUserAddedStatus())
  };
  return (
    <div style={{ margin: 'auto', marginTop: '10vh', maxWidth: '500px', width: '100%', justifyContent: 'space-around' }}>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} ref={form}
      >
        <Typography style={{ textAlign: 'center' }}>
          <Title>{edit === false ? `Register New User` : `Edit ${user?.name ? (user.name).toUpperCase() : null}'s Details`}</Title>
        </Typography>
        <Form.Item
          name={['user', 'name']}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={user && user.name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[
            {
              type: 'email',
            },
          ]}
          initialValue={user && user.email}
        >
          <Input />
        </Form.Item>
        {edit === false ? <>
          <Form.Item
            name={['user', 'password']}
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue(["user", "password"]) === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </> : null
        }
        <Form.Item
          name={['user', 'age']}
          label="Age"
          rules={[
            {
              type: 'number',
              min: 0,
              max: 99,
            },
          ]}
          initialValue={user && user.age}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={['user', 'city']}
          label="City"
          initialValue={user && user.city}

        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'state']}
          label="State"
          initialValue={user && user.state}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'address']} label="Address" initialValue={user && user.address}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{status && `User has been successfuly registerd with us with the email ${user.email}`}</p>
        <p>{errorStatus === true ? `${errorMessage}` : null}</p>
      </Modal>

    </div >
  );
};
export default RegisterOrEditUser;