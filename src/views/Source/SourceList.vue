<template>
  <div>
    <PToolbar class="p-0 space-y-2">
      <template #left>
        <div class="flex space-x-2">
          <PButton label="新建" icon="pi pi-plus" class="p-mr-2" />
          <PButton
            label="批量操作"
            class="p-button-secondary"
            :disabled="!selectedItems || !selectedItems.length"
          />
        </div>
      </template>

      <template #right>
        <div class="flex space-x-2">
          <PInputText type="text" placeholder="搜索" />
          <PButton type="button" icon="pi pi-ellipsis-h" class="p-button-secondary" />
        </div>
      </template>
    </PToolbar>
    <PDataTable
      :autoLayout="true"
      :lazy="true"
      :loading="isLoading"
      :paginator="true"
      :row-class="() => 'intro-y'"
      :rows-per-page-options="[10, 20, 50]"
      :rows="metaData.size"
      :total-records="metaData.total"
      :value="sourceItems"
      @page="onPage($event)"
      @sort="onSort($event)"
      class="yoho-table"
      current-page-report-template="{currentPage}/{totalPages} 共 {totalRecords} 项"
      dataKey="id"
      paginator-position="bottom"
      paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      removable-sort
      v-model:selection="selectedItems"
    >
      <PColumn selectionMode="multiple" :exportable="false" bodyClass="w-1"></PColumn>
      <PColumn field="name" header="名称" filterField="name" filterMatchMode="contains">
        <template #body="slotProps">
          <span>{{
            `${slotProps.data.subName ? slotProps.data.subName + '@' : ''}${slotProps.data.name}`
          }}</span>
          <div class="flex flex-row mt-2 space-x-1 text-xs text-theme-gray-160">
            <span> {{ slotProps.data.id }}</span>
            <PButton class="p-button-text p-button-secondary p-button-icon-only c-icon-button">
              <CIconPark icon="copy" />
            </PButton>
            <PButton class="p-button-text p-button-secondary p-button-icon-only c-icon-button">
              <CIconPark icon="share" />
            </PButton>
          </div>
        </template>
      </PColumn>
      <PColumn field="rss" header="RSS" bodyClass="text-theme-gray-150 whitespace-nowrap">
        <template #body="slotProps">
          <div class="flex flex-row mt-1 space-x-1 text-xs text-theme-gray-160">
            <span>{{ slotProps.data.rss }}</span>
            <PButton class="p-button-text p-button-secondary p-button-icon-only c-icon-button">
              <CIconPark icon="copy" />
            </PButton>
            <PButton class="p-button-text p-button-secondary p-button-icon-only c-icon-button">
              <CIconPark icon="share" />
            </PButton>
          </div>
        </template>
      </PColumn>
      <PColumn :exportable="false" bodyClass="column-actions whitespace-nowrap">
        <template #body="slotProps">
          <PButton icon="pi pi-pencil" class="p-button-text p-button-rounded" @click="handleEdit(slotProps.data.id)" />
          <PButton icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger" />
        </template>
      </PColumn>
    </PDataTable>
    <PDialog v-model:visible="dialogEditVisible" :modal="true" >
      <DialogEdit :edit-id="editId" @close="handleCloseEdit" />
    </PDialog>
  </div>

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
      v-model="dialogEditVisible"
      destroy-on-close
      append-to-body
      :close-on-click-modal="false"
    >
      <DialogEdit :edit-id="editId" @close="handleCloseEdit" />
    </el-dialog> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { IQueryOptions, ISource, ITableOptions } from '@/types/interface'
import { useService } from '@/hooks'
import DialogEdit from './SourceEdit.vue'

export default defineComponent({
  name: 'SourceList',
  components: { DialogEdit },
  props: {},
  setup(props) {
    const isLoading = ref(true)
    const sourceItems = reactive<ISource[]>([])
    const selectedItems = ref([])
    const filters = ref({})

    const queryOptions = ref<IQueryOptions>({})
    const metaData = ref({
      total: 0,
      pageCount: 0,
      page: queryOptions.value.page || 0,
      size: queryOptions.value.size || 0,
    })
    const { serviceGetSourceList } = useService()
    const getSourcesList = async () => {
      isLoading.value = true
      const { error, data } = await serviceGetSourceList(queryOptions.value)
      if (!error) {
        const { data: sources, meta } = data.value
        sourceItems.splice(0, sourceItems.length, ...sources)
        metaData.value = meta
        isLoading.value = false
      }
    }
    watch(queryOptions.value, () => getSourcesList())

    const onPage = (e: ITableOptions) => {
      queryOptions.value.page = e.page
      queryOptions.value.size = e.rows
    }
    const onSort = (e: ITableOptions) => {
      queryOptions.value.sort = e.sortField || undefined
      queryOptions.value.order = e.sortOrder || undefined
    }

    onMounted(() => {
      getSourcesList()
    })

    const editId = ref('')
    const dialogEditVisible = ref(false)
    
    const handleEdit = (id: string) => {
      console.log('111')
      editId.value = id
      dialogEditVisible.value = true
    }

    const handleCloseEdit = () => (dialogEditVisible.value = false)
    return {
      isLoading,
      sourceItems,
      metaData,
      selectedItems,
      filters,
      onPage,
      onSort,

      dialogEditVisible,
      handleEdit,
      editId,
      handleCloseEdit,
    }
  },
})
</script>
