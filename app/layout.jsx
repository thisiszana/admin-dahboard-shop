import { Inter } from "next/font/google";
import "../styles/globals.css";

import { Toaster } from "react-hot-toast";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Dashboard",
    template: "Dashboard | %s",
  },
  description: "Powerful Admin dashboard for E-Commerce",
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <div>
            <Toaster position="top-center" />
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
