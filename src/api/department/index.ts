import request from '@/axios'
import { UserListResponse, UserListParams } from './types'

export const getUserListApi = (params: UserListParams) => {
  return request.post<UserListResponse>({ url: '/api/permissions/user/list', params })
}

export const deleteUserByIdApi = (ids: string[] | number[]) => {
  return request.post({ url: '/mock/department/user/delete', data: { ids } })
}

export const saveUserApi = (data: any) => {
  return request.post({ url: '/mock/department/user/save', data })
}

export const saveDepartmentApi = (data: any) => {
  return request.post({ url: '/mock/department/save', data })
}

export const deleteDepartmentApi = (ids: string[] | number[]) => {
  return request.post({ url: '/mock/department/delete', data: { ids } })
}

export const getDepartmentTableApi = (params: any) => {
  return request.get({ url: '/mock/department/table/list', params })
}
