export interface DepartmentItem {
  id: string
  departmentName: string
  children?: DepartmentItem[]
}

export interface DepartmentListResponse {
  list: DepartmentItem[]
}

export interface DepartmentUserParams {
  pageSize: number
  pageIndex: number
  id: string
  username?: string
  account?: string
}

export interface DepartmentUserItem {
  id: string
  username: string
  account: string
  email: string
  createTime: string
  role: string
  department: DepartmentItem
}

export interface DepartmentUserResponse {
  list: DepartmentUserItem[]
  total: number
}

export interface UserItem {
  id: string
  username: string
  account: string
  email: string
  created_at: string
  role: string
  department: DepartmentItem
}

export interface Page {
  total: number
  page: number
  page_size: number
}

export interface UserListParams {
  page_size: number
  page: number
  username?: string
  account?: string
}

export interface UserListResponse {
  list: UserItem[]
  page: Page
}
