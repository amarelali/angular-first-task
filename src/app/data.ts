import { IPermission, IRole } from "./interfaces/role.models";

export const ROLES: IRole[] = [
  { id: '1', name: 'Admin', permissions: [{ id: '1', name: 'Create' }, { id: '2', name: 'Delete' }] },
  { id: '2', name: 'Editor', permissions: [{ id: '3', name: 'Edit' }] },
  { id: '3', name: 'Viewer', permissions: [{ id: '4', name: 'View' }] },
];

export const PERMISSIONS: IPermission[] = [
  { id: '1', name: 'Create' },
  { id: '2', name: 'Delete' },
  { id: '3', name: 'Edit' },
  { id: '4', name: 'View' },
];
export const AUDITLOGS = [
  { username: 'amarelali', actionType: 'edit', contentID: "1", timestamp: '2024-11-22 10:00:00' },
  { username: 'shazaelali', actionType: 'delete', contentID: "2", timestamp: '2024-11-22 11:00:00' },
  { username: 'shazaelali', actionType: 'create', contentID: "3", timestamp: '2024-11-22 12:00:00' },
  { username: 'amarelali', actionType: 'delete', contentID: "4", timestamp: '2024-11-22 13:00:00' },
];

export const DATA = {
  roles: ROLES,
  permissions: PERMISSIONS,
  auditLogs: AUDITLOGS
};

