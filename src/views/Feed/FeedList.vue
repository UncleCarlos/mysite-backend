<template>
  <div>
    Feed
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
      currentPageReportTemplate="共 {totalRecords} 项 {first} - {last} "
    >
      <PColumn field="title" header="Feed"></PColumn>
      <PColumn field="date" header="时间"></PColumn>
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
import { useAxios, useNotify, useDayjs } from '@/hooks'
import { IFeed, IQueryOptions } from '@/types/interface'

export default defineComponent({
  name: 'FeedList',
  components: {},
  props: {},
  setup(props) {
    const isLoading = ref(true)
    const feedItems = reactive<IFeed[]>([])
    const { formatRelativeIn3Days } = useDayjs()
    const { notifyError } = useNotify()

    const queryOptions = ref<IQueryOptions>({})
    const metaData = ref({
      total: 0,
      pageCount: 0,
      page: queryOptions.value.page,
      size: queryOptions.value.size,
    })
    watch(
      () => queryOptions,
      () => fetchFeed(),
      { deep: true }
    )
    const fetchFeed = async () => {
      isLoading.value = true
      const { error, data, finished } = await useAxios('feeders', { params: queryOptions.value })
      if (!error.value) {
        isLoading.value = !finished.value
        data.value.data.forEach((e: IFeed) => {
          e.date = formatRelativeIn3Days(e.pubDate)
        })
        feedItems.splice(0, feedItems.length, ...data.value.data)
        metaData.value = data.value.meta
      } else {
        notifyError(error.value)
      }
    }
    const onPage = (e: any) => {
      console.log(e)
      queryOptions.value.page = undefined
      queryOptions.value.size = e.size
    }
    const handleCurrentChange = (page: number) => {
      queryOptions.value.page = page
    }
    onMounted(() => {
      fetchFeed()
    })
    return {
      isLoading,
      feedItems,
      metaData,
      onPage,
      handleCurrentChange,
    }
  },
})
</script>
