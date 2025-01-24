export interface IRole {
  id: string,
  name: string,
  permissions: IPermission[]
}

export interface IPermission {
  id: string,
  name: string,
}
