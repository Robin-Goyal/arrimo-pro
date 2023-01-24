import { Avatar, Button, List, Modal, Skeleton, Typography } from 'antd';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../../config/config';
import { deleteCurrentUser, deleteUser, getAllUsers, getDeleteCode, userList } from '../../../redux-modules/User/userSlices';
import { UserType } from '../../../types/UserType';
const count = 3;
const ShowAllUsers = () => {
  const router = useRouter();
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userlistData = useSelector(userList);

  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const [userToDelete, setUserToDelete] = useState<UserType>();

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllUsers());
    setList(userlistData)
    setData(userlistData)
    setLoading(false);
    setInitLoading(false)
  }, []);


  useEffect(() => {
    // @ts-ignore
    setList(userlistData)
    setData(userlistData)
    setLoading(false);
    setInitLoading(false)
  }, [userlistData]);

  const editUser = (id: string) => {
    router.push(`/user/edit-user/${id}`);
  }

  const showModal = (item: UserType) => {
    setUserToDelete(item)
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    if (userToDelete) {
      // @ts-ignore
      dispatch(deleteUser(userToDelete._id))
    }
  };


  useEffect(() => {
    setConfirmLoading(false);
    setOpen(false)
    setIsModalOpen(false);
  }, [userlistData])

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
      </div>
    ) : null;
  return (
    <>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item: UserType) => (
          <List.Item
            actions={
              [
                <a key="list-loadmore-edit" onClick={() => editUser(item._id)}>Edit</a>,
                <a key="list-loadmore-more" onClick={() => {
                  showModal(item)
                }}>Delete</a>
              ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <Modal
        title="Warning Delete User"
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};
export default ShowAllUsers;