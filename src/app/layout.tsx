// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Logout from "@/components/shared/Logout";
import {Sidebar} from "@/components/shared/Sidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AthenaShield",
  description: "Your AI-powered email security assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      
      <body className={inter.className}>
        <div className="flex h-screen">
          <Sidebar>
            <Logout />
          </Sidebar>
          <main className="flex-1 overflow-y-auto">
              {children}
            </main>
        </div>
      </body>
    </html>
  );
}
