"use client";

import { NextUIProvider } from "@nextui-org/react";

const NextUiProvider = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextUiProvider;
