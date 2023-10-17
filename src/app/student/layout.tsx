// 'use client';

import React from "react";
import '../dashboard.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import {useState} from "react";
import DashboardSidebar from "@/app/components/DashboardSidebar";
import DashboardHeader from "@/app/components/DashboardHeader";

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Beaver LMS',
//   description: 'Beaver LMS',
// }

export default function StudentDashboardLayout({children,}: {
  children: React.ReactNode
}) {
  return (
      <>
          <DashboardSidebar />
          <div className="content">
            <DashboardHeader headerName={"Student"}/>
            <main>
              {children}
            </main>
          </div>
      </>
  )
}
