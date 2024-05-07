<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref, unref, reactive } from 'vue'
// import { ElInput, ElDivider } from 'element-plus'
import { getUserListApi, saveUserApi, deleteUserByIdApi } from '@/api/department'
import type { UserItem } from '@/api/department/types'
import { useTable } from '@/hooks/web/useTable'
import { Search } from '@/components/Search'
import Write from './components/Write.vue'
import Detail from './components/Detail.vue'
import { Dialog } from '@/components/Dialog'
import { getRoleListApi } from '@/api/role'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { BaseButton } from '@/components/Button'
import { ElTag } from 'element-plus'

const { t } = useI18n()

const renderTag = (enable?: boolean) => {
  return <ElTag type={!enable ? 'danger' : 'success'}>{enable ? '启用' : '禁用'}</ElTag>
}

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState
    const res = await getUserListApi({
      page: unref(currentPage),
      page_size: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.data.list || [],
      total: res.data.page.total || 0
    }
  },
  fetchDelApi: async () => {
    const res = await deleteUserByIdApi(unref(ids))
    return !!res
  }
})
const { total, loading, dataList, pageSize, currentPage } = tableState
const { getList, getElTableExpose, delList } = tableMethods

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'selection',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    },
    table: {
      type: 'selection'
    }
  },
  {
    field: 'id',
    label: 'ID',
    width: 50,
    form: {
      hidden: true
    },
    search: {
      hidden: true
    }
  },
  {
    field: 'username',
    label: t('userDemo.username')
  },
  {
    field: 'nickname',
    label: '昵称'
  },
  {
    field: 'role',
    label: t('userDemo.role'),
    search: {
      hidden: true
    },
    form: {
      component: 'Select',
      value: [],
      componentProps: {
        multiple: true,
        collapseTags: true,
        maxCollapseTags: 1
      },
      optionApi: async () => {
        const res = await getRoleListApi()
        return res.data?.list?.map((v) => ({
          label: v.roleName,
          value: v.id
        }))
      }
    }
  },
  {
    field: 'mobile',
    label: t('userDemo.mobile'),
    form: {
      component: 'Input'
    },
    search: {
      hidden: true
    }
  },
  {
    field: 'email',
    label: t('userDemo.email'),
    form: {
      component: 'Input'
    },
    search: {
      hidden: true
    }
  },
  {
    field: 'state',
    label: t('menu.status'),
    width: 70,
    slots: {
      default: (data: any) => {
        return (
          <>
            <ElTag type={data.row.state === 0 ? 'danger' : 'success'}>
              {data.row.state === 1 ? t('userDemo.enable') : t('userDemo.disable')}
            </ElTag>
          </>
        )
      }
    },
    search: {
      hidden: true
    },
    form: {
      component: 'Select',
      value: [],
      componentProps: {
        options: [
          {
            label: t('userDemo.disable'),
            value: 0
          },
          {
            label: t('userDemo.enable'),
            value: 1
          }
        ]
      }
    },
    detail: {
      slots: {
        default: (data) => {
          return renderTag(data.state)
        }
      }
    }
  },
  {
    field: 'created_at',
    label: t('userDemo.createTime'),
    form: {
      component: 'Input',
      hidden: true
    },
    search: {
      hidden: true
    }
  },
  {
    field: 'action',
    label: t('userDemo.action'),
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    },
    search: {
      hidden: true
    },
    table: {
      width: 240,
      slots: {
        default: (data: any) => {
          const row = data.row as UserItem
          return (
            <>
              <BaseButton type="primary" onClick={() => action(row, 'edit')}>
                {t('exampleDemo.edit')}
              </BaseButton>
              <BaseButton type="success" onClick={() => action(row, 'detail')}>
                {t('exampleDemo.detail')}
              </BaseButton>
              <BaseButton type="danger" onClick={() => delData(row)}>
                {t('exampleDemo.del')}
              </BaseButton>
            </>
          )
        }
      }
    }
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const searchParams = ref({})
const setSearchParams = (params: any) => {
  currentPage.value = 1
  searchParams.value = params
  getList()
}

const dialogVisible = ref(false)
const dialogTitle = ref('')

const currentRow = ref<UserItem>()
const actionType = ref('')

const AddAction = () => {
  dialogTitle.value = t('exampleDemo.add')
  currentRow.value = undefined
  dialogVisible.value = true
  actionType.value = ''
}

const delLoading = ref(false)
const ids = ref<string[]>([])

const delData = async (row?: UserItem) => {
  const elTableExpose = await getElTableExpose()
  ids.value = row ? [row.id] : elTableExpose?.getSelectionRows().map((v: UserItem) => v.id) || []
  delLoading.value = true
  await delList(unref(ids).length).finally(() => {
    delLoading.value = false
  })
}

const action = (row: UserItem, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
  actionType.value = type
  currentRow.value = { ...row }
  dialogVisible.value = true
}

const writeRef = ref<ComponentRef<typeof Write>>()

const saveLoading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  const formData = await write?.submit()
  if (formData) {
    saveLoading.value = true
    try {
      const res = await saveUserApi(formData)
      if (res) {
        currentPage.value = 1
        getList()
      }
    } catch (error) {
      console.log(error)
    } finally {
      saveLoading.value = false
      dialogVisible.value = false
    }
  }
}
</script>

<template>
  <div>
    <ContentWrap>
      <Search
        :schema="allSchemas.searchSchema"
        @reset="setSearchParams"
        @search="setSearchParams"
      />

      <div class="mb-10px">
        <BaseButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</BaseButton>
        <BaseButton :loading="delLoading" type="danger" @click="delData()">
          {{ t('exampleDemo.del') }}
        </BaseButton>
      </div>
      <Table
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :columns="allSchemas.tableColumns"
        :data="dataList"
        :loading="loading"
        @register="tableRegister"
        :pagination="{
          total
        }"
      />
    </ContentWrap>

    <Dialog v-model="dialogVisible" :title="dialogTitle">
      <Write
        v-if="actionType !== 'detail'"
        ref="writeRef"
        :form-schema="allSchemas.formSchema"
        :current-row="currentRow"
      />

      <Detail
        v-if="actionType === 'detail'"
        :detail-schema="allSchemas.detailSchema"
        :current-row="currentRow"
      />

      <template #footer>
        <BaseButton
          v-if="actionType !== 'detail'"
          type="primary"
          :loading="saveLoading"
          @click="save"
        >
          {{ t('exampleDemo.save') }}
        </BaseButton>
        <BaseButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</BaseButton>
      </template>
    </Dialog>
  </div>
</template>
