"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  HomeIcon, GlobeAltIcon, EnvelopeIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import Image from "next/image";

interface SidebarProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

// Navigation items
const navigationItems = [
  { name: 'Home', icon: HomeIcon, href: '/' },
  {name: 'Emails', icon: EnvelopeIcon, href:'/emails'},
  {name: 'Dashboard', icon: Squares2X2Icon, href: '/dashboard'},
  {name: 'Education', icon: GlobeAltIcon, href: '/education'}
];




export const Sidebar: React.FC<SidebarProps> = ({ children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black dark:bg-gray-100 bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 flex flex-col w-80 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <Image
            src="/logo.png"
            alt="Logo"
            width={400}
            height={200}
            className="h-8 w-auto"
          />
          <button
            onClick={closeSidebar}
            className="focus:outline-none lg:hidden"
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="px-4 py-4 border-b">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-2 py-2 text-base rounded-md mb-1 ${
                pathname === item.href
                  ? " bg-cyan-400 text-white dark:text-black dark:bg-cyan-100"
                  : " hover:bg-gray-50  dark:hover:bg-gray-700"
              }`}
              onClick={closeSidebar}
            >
              <item.icon className="mr-3 h-6 w-6" />
              {item.name}
            </Link>
          ))}
        </nav>

        

        {/* Footer */}
        <div className="p-4 border-t mt-auto">{children}</div>
      </div>
    </>
  );
};