"use client";

import { ConfigProvider } from "antd";

const AntDesignConfigProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorLink: "#000",
        },
        components: {
          Table: {
            borderColor: "#f3f4f6",
            headerBg: "#f3f4f6",
            headerSplitColor: "#e5e7eb",
            borderRadius: 0,
            headerBorderRadius: 0,
            headerColor: "#6b7280",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntDesignConfigProvider;
