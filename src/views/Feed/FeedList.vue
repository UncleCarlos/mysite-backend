<template>
  <div>
    <PDataTable
      class="yoho-table"
      :lazy="true"
      :value="feedItems"
      :totalRecords="metaData.total"
      :loading="isLoading"
      @page="onPage($event)"
      @sort="onSort($event)"
      :paginator="true"
      :rows="metaData.size"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      currentPageReportTemplate="{currentPage}/{totalPages} 共 {totalRecords} 项"
      :autoLayout="true"
      v-model:selection="selectedItems"
      removable-sort
      :rowClass="() => 'intro-y'"
      dataKey="id"
    >
      <template #header>
        <PToolbar class="p-0">
          <template #left>
            <div class="flex space-x-2">
              <PInputText type="text" placeholder="搜索" />
              <PButton label="批量操作" :disabled="!selectedItems || !selectedItems.length" />
              <PButton type="button" icon="pi pi-ellipsis-h" class="p-button-secondary" />
            </div>
          </template>
          <template #right>
            <PPaginator
              :rows="metaData.size"
              :totalRecords="metaData.total"
              currentPageReportTemplate="{currentPage}/{totalPages} 共 {totalRecords} 项"
              template="CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink RowsPerPageDropdown"
              :rowsPerPageOptions="[10, 20, 50]"
              @page="onPage($event)"
              class="p-0"
            >
            </PPaginator>
          </template>
        </PToolbar>
      </template>
      <PColumn selectionMode="multiple" :exportable="false"></PColumn>
      <PColumn field="title" header="标题" filterField="title" filterMatchMode="contains">
        <template #body="slotProps">
          <span class="line-clamp-1">{{ slotProps.data.title }}</span>
          <div class="flex flex-row mt-2 space-x-1 text-xs text-theme-gray-160">
            <span> {{ slotProps.data.id }}</span>
            <PButton class="p-button-text p-button-secondary p-button-icon-only c-icon-button">
              <CIconPark icon="copy" />
            </PButton>
          </div>
        </template>
      </PColumn>
      <PColumn field="source" header="来源" bodyClass="text-theme-gray-150 whitespace-nowrap">
        <template #body="slotProps">
          {{
            slotProps.data.source.subName
              ? `${slotProps.data.source.subName}@${slotProps.data.source.name}`
              : slotProps.data.source.name
          }}
        </template>
      </PColumn>
      <PColumn field="pubDate" header="时间" bodyClass="text-theme-gray-150" sortable>
        <template #body="slotProps">
          <div class="text-xs">{{ formatRelativeIn3Days(slotProps.data.pubDate) }}</div>
        </template>
      </PColumn>
      <PColumn :exportable="false" bodyClass="column-actions whitespace-nowrap">
        <template #body="slotProps">
          <PButton icon="pi pi-pencil" class="p-button-text p-button-rounded" />
          <PButton icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger" />
        </template>
      </PColumn>
    </PDataTable>
    <!-- <el-card>
      <template #header>头啊</template>
      <el-table :data="feedItems" :v-loading="isLoading" row-key="id" :default-sort="metaData.sort">
        <el-table-column prop="title" label="Feed">
          <template #default="scope">
            <div class="flex flex-row">
              <div class="mr-2" style="height: 90px; width: 160px">
                <el-image
                  class="w-full h-full border rounded border-split"
                  :src="scope.row.thumbnail"
                  fit="cover"
                />
              </div>
              <div class="flex flex-col justify-around">
                <span class="text-sm">{{ scope.row.title }}</span>
                <span>
                  {{
                    scope.row.source.subName
                      ? `${scope.row.source.subName}@${scope.row.source.name}`
                      : scope.row.source.name
                  }}
                  <el-link
                    :href="scope.row.source.web"
                    type="info"
                    :underline="false"
                    target="_blank"
                  >
                    <CIconPark icon="link-one" />
                  </el-link>
                  {{ scope.row.author }}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="时间" width="200px"></el-table-column>
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
          background
          layout="total,'->' , sizes, prev, pager, next, jumper"
          :total="metaData.total"
          :pager-count="5"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useService, useDayjs } from '@/hooks'
import { IFeed, ITableOptions, IQueryOptions } from '@/types/interface'

export default defineComponent({
  name: 'FeedList',
  components: {},
  props: {},
  setup(props) {
    const isLoading = ref(true)
    const feedItems = reactive<IFeed[]>([])
    const { formatRelativeIn3Days } = useDayjs()
    const selectedItems = ref([])
    const filters = ref({})
    const queryOptions = ref<IQueryOptions>({})
    const metaData = ref({
      total: 0,
      pageCount: 0,
      page: queryOptions.value.page || 0,
      size: queryOptions.value.size || 0,
    })

    const { serviceGetFeedList } = useService()
    const getFeedList = async () => {
      isLoading.value = true
      const { error, data } = await serviceGetFeedList(queryOptions.value)
      if (!error) {
        const { data: items, meta } = data.value
        feedItems.splice(0, feedItems.length, ...items)
        metaData.value = meta
        isLoading.value = false
      }
    }
    watch(queryOptions.value, () => getFeedList())

    const onPage = (e: ITableOptions) => {
      queryOptions.value.page = e.page
      queryOptions.value.size = e.rows
    }
    const onSort = (e: ITableOptions) => {
      queryOptions.value.sort = e.sortField || undefined
      queryOptions.value.order = e.sortOrder || undefined
    }

    onMounted(() => {
      getFeedList()
    })

    return {
      isLoading,
      feedItems,
      selectedItems,
      filters,
      metaData,
      onPage,
      onSort,
      formatRelativeIn3Days,
    }
  },
})
</script>
