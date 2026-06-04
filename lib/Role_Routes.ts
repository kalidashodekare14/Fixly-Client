export const Role_Routes = {
  admin: ['/dashboard/admin'],
  user: ['/dashboard/user'],
  provider: ['/dashboard/provider'],
} as const;

export type UserRole = keyof typeof Role_Routes;
