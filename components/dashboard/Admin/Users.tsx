'use client';

import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  Search,
  SlidersHorizontal,
  ShieldCheck,
  ShieldOff,
  Trash2,
  Eye,
  X,
  Mail,
  Calendar,
  MapPin,
} from 'lucide-react';
import { FaUsers, FaUserCheck, FaShieldAlt } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';
import {
  useManageUserQuery,
  useStatusChangeMutation,
} from '@/state/services/admin/AdminService';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'provider' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  image?: string;
  phone?: string;
  location?: {
    address: string;
  };
  createdAt: string;
  totalRequests?: number;
  completedJobs?: number;
  rating?: number;
}
const statusStyles: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  suspended: 'bg-red-50 text-red-600 border-red-200',
  pending: 'bg-amber-50 text-amber-600 border-amber-200',
};

const roleStyles: Record<string, string> = {
  admin: 'bg-purple-50 text-purple-600 border-purple-200',
  provider: 'bg-blue-50 text-blue-600 border-blue-200',
  user: 'bg-gray-100 text-gray-600 border-gray-200',
};

const roleFilters = [
  { label: 'All', value: 'all' },
  { label: 'Users', value: 'user' },
  { label: 'Providers', value: 'provider' },
  { label: 'Admins', value: 'admin' },
] as const;

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    'suspend' | 'active' | 'delete' | null
  >(null);
  // page
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: usersManage, isLoading: manageLoading } = useManageUserQuery({
    role: roleFilter,
    search: searchQuery,
    currentPage,
  });
  console.log('checking user manage', usersManage);

  // Total pages for pagination
  const totalPages: number = usersManage?.pagination?.totalPages || 1;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // status update
  const [statusChange, { isLoading: statusLoading }] =
    useStatusChangeMutation();

  const stats = useMemo(
    () => ({
      total: usersManage?.statsInfo ? usersManage?.statsInfo?.totalUsers : 0,
      active: usersManage?.statsInfo
        ? usersManage?.statsInfo?.totalActiveUsers
        : 0,
      suspended: usersManage?.statsInfo
        ? usersManage?.statsInfo?.totalSuspendUsers
        : 0,
      pending:
        usersManage?.data &&
        usersManage?.data?.filter((u: any) => u.status === 'pending').length,
    }),
    []
  );

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setDetailOpen(true);
  };

  const handleConfirmAction = (
    action: 'suspend' | 'active' | 'delete',
    user: User
  ) => {
    setSelectedUser(user);
    setConfirmAction(action);
    setConfirmOpen(true);
  };

  const handleStatusChange = async () => {
    try {
      const statusData = {
        status: confirmAction,
      };
      const userId = selectedUser?._id;
      console.log('checking user id data', userId);
      const res = await statusChange({ userId, statusData }).unwrap();
      if (res?.success) {
        setConfirmOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
              <p className="text-sm text-gray-500 mt-1">
                View, manage and control all platform users.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <FiUserPlus className="size-4" />
                <span className="hidden sm:inline">Add User</span>
              </Button>
              <Button size="sm">
                <SlidersHorizontal className="size-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
            {[
              {
                label: 'Total',
                value: usersManage?.statsInfo?.totalUsers || 0,
                color: 'text-gray-900',
                bg: 'bg-gray-50',
                icon: <FaUsers className="text-gray-500" />,
              },
              {
                label: 'Active',
                value: usersManage?.statsInfo?.totalActiveUsers || 0,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
                icon: <FaUserCheck className="text-emerald-500" />,
              },
              {
                label: 'Suspended',
                value: usersManage?.statsInfo?.totalSuspendUsers || 0,
                color: 'text-red-600',
                bg: 'bg-red-50',
                icon: <ShieldOff className="text-red-500" />,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  'flex items-center gap-2.5 rounded-xl px-3.5 py-2.5',
                  stat.bg
                )}
              >
                <span className="text-sm">{stat.icon}</span>
                <div>
                  <p
                    className={cn('text-lg font-bold leading-none', stat.color)}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100/50">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search by name, email or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <div className="flex gap-1.5 bg-gray-100 p-1 rounded-lg w-fit">
              {roleFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setRoleFilter(filter.value)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                    roleFilter === filter.value
                      ? 'bg-white text-gray-900 shadow-xs'
                      : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Users List */}
        {!manageLoading ? (
          <>
            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3">
              {usersManage?.data?.length > 0 ? (
                usersManage?.data?.map((user: any) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100/50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-linear-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                          {user.image ? (
                            <img src={user.image} className="rounded-full" />
                          ) : (
                            getInitials(user.name)
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-gray-400">
                        {user._id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        className={cn(
                          'border px-2 py-0.5 text-[11px] font-medium capitalize',
                          roleStyles[user.role]
                        )}
                      >
                        {user.role}
                      </Badge>
                      <Badge
                        className={cn(
                          'border px-2 py-0.5 text-[11px] font-medium capitalize',
                          statusStyles[user.status]
                        )}
                      >
                        {user.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleViewUser(user)}
                      >
                        <Eye className="size-3.5" />
                        View
                      </Button>
                      {user.status === 'active' ? (
                        <Button
                          variant="ghost"
                          size="xs"
                          className="text-amber-600 hover:text-amber-700"
                          onClick={() => handleConfirmAction('suspend', user)}
                        >
                          <ShieldOff className="size-3.5" />
                          Suspend
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="xs"
                          className="text-emerald-600 hover:text-emerald-700"
                          onClick={() => handleConfirmAction('active', user)}
                        >
                          <ShieldCheck className="size-3.5" />
                          active
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="xs"
                        className="text-red-500 hover:text-red-600 ml-auto"
                        onClick={() => handleConfirmAction('delete', user)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-10 shadow-xs border border-gray-100/50 text-center">
                  <FaUsers className="size-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No users found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block bg-white rounded-2xl shadow-xs border border-gray-100/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
                      <th className="px-4 py-3.5 font-medium">User</th>
                      <th className="px-4 py-3.5 font-medium">ID</th>
                      <th className="px-4 py-3.5 font-medium">Email</th>
                      <th className="px-4 py-3.5 font-medium">Role</th>
                      <th className="px-4 py-3.5 font-medium">Status</th>
                      <th className="px-4 py-3.5 font-medium">Joined</th>
                      <th className="px-4 py-3.5 font-medium text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersManage?.data?.length > 0 ? (
                      usersManage?.data?.map((user: any) => (
                        <tr
                          key={user._id}
                          className="border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50/50"
                        >
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="size-9 rounded-full bg-linear-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                                {user.image ? (
                                  <img
                                    src={user.image}
                                    className="rounded-full size-full object-cover"
                                  />
                                ) : (
                                  getInitials(user.name)
                                )}
                              </div>
                              <span className="font-medium text-gray-900">
                                {user.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-gray-500 font-mono text-xs">
                            {user._id.slice(0, 10)}
                          </td>
                          <td className="px-4 py-3.5 text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-4 py-3.5">
                            <Badge
                              className={cn(
                                'border px-2 py-0.5 text-xs font-medium capitalize',
                                roleStyles[user.role]
                              )}
                            >
                              {user.role}
                            </Badge>
                          </td>
                          <td className="px-4 py-3.5">
                            <Badge
                              className={cn(
                                'border px-2 py-0.5 text-xs font-medium capitalize',
                                statusStyles[user.status]
                              )}
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3.5 text-gray-500 text-xs">
                            {new Date(user.createdAt).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => handleViewUser(user)}
                                title="View details"
                              >
                                <Eye className="size-3.5" />
                              </Button>
                              {user.status === 'active' ? (
                                <Button
                                  variant="ghost"
                                  size="icon-xs"
                                  className="text-amber-600 hover:text-amber-700"
                                  onClick={() =>
                                    handleConfirmAction('suspend', user)
                                  }
                                  title="Suspend user"
                                >
                                  <ShieldOff className="size-3.5" />
                                </Button>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="icon-xs"
                                  className="text-emerald-600 hover:text-emerald-700"
                                  onClick={() =>
                                    handleConfirmAction('active', user)
                                  }
                                  title="active user"
                                >
                                  <ShieldCheck className="size-3.5" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                className="text-red-500 hover:text-red-600"
                                onClick={() =>
                                  handleConfirmAction('delete', user)
                                }
                                title="Delete user"
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center">
                          <FaUsers className="size-10 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 font-medium">
                            No users found
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            Try adjusting your search or filters.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full mt-6 flex items-center justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className="w-30"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                    />
                  </PaginationItem>

                  {pages.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      className="w-22"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100/50"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="size-10 rounded-full bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-44 bg-gray-200" />
                    <Skeleton className="h-3 w-60 bg-gray-200" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
                  <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedUser && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className="size-12 rounded-full bg-linear-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-base font-semibold shrink-0">
                    {selectedUser.image ? (
                      <img
                        src={selectedUser.image}
                        className="rounded-full size-full object-cover"
                      />
                    ) : (
                      getInitials(selectedUser.name)
                    )}
                  </div>
                  <div>
                    <DialogTitle className="text-lg">
                      {selectedUser.name}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2 mt-0.5">
                      <Badge
                        className={cn(
                          'border px-2 py-0.5 text-[11px] font-medium capitalize',
                          roleStyles[selectedUser.role]
                        )}
                      >
                        {selectedUser.role}
                      </Badge>
                      <Badge
                        className={cn(
                          'border px-2 py-0.5 text-[11px] font-medium capitalize',
                          statusStyles[selectedUser.status]
                        )}
                      >
                        {selectedUser.status}
                      </Badge>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-3 py-2">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 text-gray-400" />
                  <span className="text-gray-600">{selectedUser.email}</span>
                </div>
                {selectedUser.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <svg
                      className="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-600">{selectedUser.phone}</span>
                  </div>
                )}
                {selectedUser.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="size-4 text-gray-400" />
                    <span className="text-gray-600">
                      {selectedUser?.location?.address}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="size-4 text-gray-400" />
                  <span className="text-gray-600">
                    Joined{' '}
                    {new Date(selectedUser.createdAt).toLocaleDateString(
                      'en-US',
                      { month: 'long', day: 'numeric', year: 'numeric' }
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="size-4 text-gray-400 flex items-center justify-center font-mono text-xs">
                    #
                  </span>
                  <span className="text-gray-600 font-mono text-xs">
                    {selectedUser._id}
                  </span>
                </div>

                {selectedUser.role === 'provider' && (
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                    <div className="text-center p-2.5 rounded-xl bg-blue-50">
                      <p className="text-lg font-bold text-blue-600">
                        {selectedUser.totalRequests}
                      </p>
                      <p className="text-[11px] text-blue-500">Requests</p>
                    </div>
                    <div className="text-center p-2.5 rounded-xl bg-emerald-50">
                      <p className="text-lg font-bold text-emerald-600">
                        {selectedUser.completedJobs}
                      </p>
                      <p className="text-[11px] text-emerald-500">Completed</p>
                    </div>
                    <div className="text-center p-2.5 rounded-xl bg-purple-50">
                      <p className="text-lg font-bold text-purple-600">
                        {selectedUser.rating?.toFixed(1)}
                      </p>
                      <p className="text-[11px] text-purple-500">Rating</p>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="mt-2">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {selectedUser.status === 'active' ? (
                    <Button
                      variant="outline"
                      className="text-amber-600 border-amber-200 hover:bg-amber-50 flex-1 sm:flex-none"
                      onClick={() => {
                        setDetailOpen(false);
                        handleConfirmAction('suspend', selectedUser);
                      }}
                    >
                      <ShieldOff className="size-4" />
                      Suspend
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 flex-1 sm:flex-none"
                      onClick={() => {
                        setDetailOpen(false);
                        handleConfirmAction('active', selectedUser);
                      }}
                    >
                      <ShieldCheck className="size-4" />
                      active
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-200 hover:bg-red-50 flex-1 sm:flex-none"
                    onClick={() => {
                      setDetailOpen(false);
                      handleConfirmAction('delete', selectedUser);
                    }}
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Action Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {confirmAction === 'suspend' && 'Suspend User'}
              {confirmAction === 'active' && 'active User'}
              {confirmAction === 'delete' && 'Delete User'}
            </DialogTitle>
            <DialogDescription>
              {confirmAction === 'suspend' &&
                `Are you sure you want to suspend ${selectedUser?.name}? They will lose access to the platform.`}
              {confirmAction === 'active' &&
                `Are you sure you want to active ${selectedUser?.name}? They will regain access to the platform.`}
              {confirmAction === 'delete' &&
                `Are you sure you want to permanently delete ${selectedUser?.name}? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={confirmAction === 'delete' ? 'destructive' : 'default'}
              className={cn(
                confirmAction === 'suspend' &&
                  'bg-amber-600 hover:bg-amber-700',
                confirmAction === 'active' &&
                  'bg-emerald-600 hover:bg-emerald-700'
              )}
              onClick={handleStatusChange}
            >
              {confirmAction === 'suspend' && 'Suspend'}
              {confirmAction === 'active' && 'active'}
              {confirmAction === 'delete' && 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
