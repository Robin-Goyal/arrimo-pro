import { Content } from "antd/lib/layout/layout";
import React from "react";

const MainContent = (props: any) => {
  return (
    <Content style={{ minHeight: '85vh' }}>
      {
        props.children
      }
    </Content>

  )
}

export default MainContent;