import { IoCreateOutline } from 'react-icons/io5';
import { MdDashboard, MdChat, MdOutlineFeedback } from 'react-icons/md';
import { CiViewList } from 'react-icons/ci';
import { FaUserCog, FaUsers } from 'react-icons/fa';
import { BsClipboardCheck, BsSend } from 'react-icons/bs';
import { RiSettings3Line } from 'react-icons/ri';

export type Role = 'user' | 'provider' | 'admin';

export const sidebarConfig = {
  user: [
    { label: 'Overview', href: '/dashboard/user', icon: <MdDashboard /> },
    {
      label: 'Create Request',
      href: '/dashboard/create_request',
      icon: <IoCreateOutline />,
    },
    { label: 'My Requests', href: '/dashboard/requests', icon: <CiViewList /> },
    {
      label: 'View Offers',
      href: '/dashboard/offers',
      icon: <BsClipboardCheck />,
    },
    {
      label: 'Select Provider',
      href: '/dashboard/select_provider',
      icon: <FaUserCog />,
    },
    { label: 'Chat', href: '/dashboard/chat', icon: <MdChat /> },
    { label: 'Profile', href: '/dashboard/profile', icon: <FaUsers /> },
    {
      label: 'Feedback',
      href: '/dashboard/feedback',
      icon: <MdOutlineFeedback />,
    },
  ],

  provider: [
    { label: 'Overview', href: '/dashboard/provider', icon: <MdDashboard /> },
    {
      label: 'Incoming Requests',
      href: '/dashboard/provider/requests',
      icon: <CiViewList />,
    },
    {
      label: 'Send Offers',
      href: '/dashboard/provider/send_offers',
      icon: <BsSend />,
    },
    {
      label: 'My Jobs',
      href: '/dashboard/provider/jobs',
      icon: <BsClipboardCheck />,
    },
    { label: 'Chat', href: '/dashboard/provider/chat', icon: <MdChat /> },
    {
      label: 'Profile',
      href: '/dashboard/provider/profile',
      icon: <FaUsers />,
    },
  ],

  admin: [
    { label: 'Overview', href: '/dashboard/admin', icon: <MdDashboard /> },
    {
      label: 'Manage Users',
      href: '/dashboard/admin/users',
      icon: <FaUsers />,
    },
    {
      label: 'Manage Requests & Offers',
      href: '/dashboard/admin/requests',
      icon: <CiViewList />,
    },
    {
      label: 'Platform Settings',
      href: '/dashboard/admin/settings',
      icon: <RiSettings3Line />,
    },
  ],
};
