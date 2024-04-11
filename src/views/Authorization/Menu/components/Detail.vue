<script setup lang="tsx">
import { PropType, ref } from 'vue'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { Icon } from '@/components/Icon'
import { ElTag } from 'element-plus'

defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => undefined
  }
})

const renderTag = (enable?: boolean) => {
  return <ElTag type={!enable ? 'danger' : 'success'}>{enable ? '启用' : '禁用'}</ElTag>
}

const detailSchema = ref<DescriptionsSchema[]>([
  {
    field: 'menu_type',
    label: '菜单类型',
    span: 24,
    slots: {
      default: (data) => {
        const type = data.type
        return <>{type === 2 ? '菜单' : '目录'}</>
      }
    }
  },
  {
    field: 'meta.title',
    label: '菜单名称'
  },
  {
    field: 'component',
    label: '组件',
    slots: {
      default: (data) => {
        const component = data.component
        return <>{component === '#' ? '顶级目录' : component === '##' ? '子目录' : component}</>
      }
    }
  },
  {
    field: 'name',
    label: '组件名称'
  },
  {
    field: 'meta.icon',
    label: '图标',
    slots: {
      default: (data) => {
        const icon = data.icon
        if (icon) {
          return (
            <>
              <Icon icon={icon} />
            </>
          )
        } else {
          return null
        }
      }
    }
  },
  {
    field: 'path',
    label: '路径'
  },
  // {
  //   field: 'permissionList',
  //   label: '按钮权限',
  //   span: 24,
  //   slots: {
  //     default: (data: any) => (
  //       <>
  //         {data?.permissionList?.map((v) => {
  //           return (
  //             <ElTag class="mr-1" key={v.value}>
  //               {v.label}
  //             </ElTag>
  //           )
  //         })}
  //       </>
  //     )
  //   }
  // },
  {
    field: 'state',
    label: '菜单状态',
    slots: {
      default: (data) => {
        return renderTag(data.state)
      }
    }
  },
  {
    field: 'meta.hidden',
    label: '是否隐藏',
    slots: {
      default: (data) => {
        return renderTag(data.meta.hidden)
      }
    }
  },
  {
    field: 'meta.always_show',
    label: '是否一直显示',
    slots: {
      default: (data) => {
        return renderTag(data.meta.always_show)
      }
    }
  },
  {
    field: 'meta.no_cache',
    label: '是否清除缓存',
    slots: {
      default: (data) => {
        return renderTag(data.meta.no_cache)
      }
    }
  },
  {
    field: 'meta.breadcrumb',
    label: '是否显示面包屑',
    slots: {
      default: (data) => {
        return renderTag(data.meta.breadcrumb)
      }
    }
  },
  {
    field: 'meta.affix',
    label: '是否固定标签页',
    slots: {
      default: (data) => {
        return renderTag(data.meta.affix)
      }
    }
  },
  {
    field: 'meta.no_tags_view',
    label: '是否隐藏标签页',
    slots: {
      default: (data) => {
        return renderTag(data.meta.no_tags_view)
      }
    }
  }
])
</script>

<template>
  <Descriptions :schema="detailSchema" :data="currentRow || {}" />
</template>
