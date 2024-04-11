import request from '@/axios'

export const getMenuListApi = () => {
  return request.post({ url: '/api/permissions/menu/list' })
}
