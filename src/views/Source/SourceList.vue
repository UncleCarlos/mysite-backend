<template>
  <div>Source
    <!-- <el-card shadow="never">
      <template #header>头啊</template>
      <el-table :data="items" :v-loading="isLoading">
        <el-table-column prop="name" label="名称">
          <template #default="scope">
            {{ scope.row.subName ? `${scope.row.subName}@${scope.row.name}` : scope.row.name }}
            <el-link :href="scope.row.web" type="info" :underline="false" target="_blank">
              <CIconPark icon="link-one" />
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="rss" label="RSS">
          <template #default="scope">
            {{ scope.row.rss }}
            <el-link :href="scope.row.rss" type="info" :underline="false" target="_blank">
              <CIconPark icon="link-one" />
            </el-link>
          </template>
        </el-table-column>
        <el-table-column width="70px">
          <template #default="scope">
            <el-button type="text" @click="handleEdit(scope.row.id)">
              <CIconPark icon="editor" size="1rem" />
            </el-button>
            <el-button type="text">
              <CIconPark icon="delete" size="1rem" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4">
        <el-pagination
          class="flex py-2 mx-auto"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000"
        />
      </div>
    </el-card>
    <el-dialog
      title="编辑"
      v-model="dialogEditVisiable"
      destroy-on-close
      append-to-body
      :close-on-click-modal="false"
    >
      <DialogEdit :edit-id="editId" @close="handleCloseEdit" />
    </el-dialog> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useAxios } from '@/hooks/useAxios'
import { ISource } from '@/types/interface'

import DialogEdit from './SourceEdit.vue'

export default defineComponent({
  name: 'SourceList',
  components: { DialogEdit },
  props: {},
  setup(props) {
    const isLoading = ref(true)
    const items = reactive<ISource[]>([])

    const fetchFeed = async () => {
      isLoading.value = true
      const { error, data, finished } = await useAxios('sources')
      // const dataItems = data.value.data
      // const dataMeta = data.value.meta
      if (!error.value) {
        isLoading.value = !finished.value
        items.splice(0, items.length, ...data.value.data)
      }
    }
    onMounted(() => {
      fetchFeed()
    })

    const editId = ref('')
    const dialogEditVisiable = ref(false)
    const handleEdit = (id: string) => {
      editId.value = id
      dialogEditVisiable.value = true
    }

    const handleCloseEdit = () => (dialogEditVisiable.value = false)
    return {
      isLoading,
      items,
      dialogEditVisiable,
      handleEdit,
      editId,
      handleCloseEdit,
    }
  },
})
</script>
