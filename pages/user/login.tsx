import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserLogin,
  getCurrentUser,
  loggedIn,
} from "../../redux-modules/User/userSlices";
import { AsyncThunkAction, current } from "@reduxjs/toolkit";
import { useRouter } from "next/dist/client/router";

const UserLogin = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(loggedIn);
  const currentUser = useSelector(getCurrentUser);
  const router = useRouter();

  console.log("loginStatus :>> ", loginStatus);

  useEffect(() => {
    if (loginStatus) {
      router.push("/user/dashboard");
    } else {
      if (currentUser !== "") {
        console.log("currentUser :>> ", currentUser);
        alert("Invalid username/Password");
      }
    }
  }, [loginStatus, currentUser]);

  const onFinish = (values: any) => {
    // @ts-ignore
    dispatch(checkUserLogin(values));
    console.log(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username/Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserLogin;
