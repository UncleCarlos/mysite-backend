<template>
  <div>
    <el-card>
      <template #header>头啊</template>
      <el-table :data="feedItems" :v-loading="isLoading">
        <el-table-column prop="title" label="Feed">
          <template #default="scope">
            <div class="flex flex-row">
              <div class="mr-2">
                <img
                  class="inline-block object-cover object-center w-40 h-16 max-w-xs border rounded border-split max-h-16"
                  :src="scope.row.thumbnail"
                />
              </div>
              <div class="flex flex-col justify-between">
                <span>{{ scope.row.title }}</span>
                <span>{{ scope.row.date }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="源" width="100px">
          <template #default="scope">
            {{
              scope.row.source.subName
                ? `${scope.row.source.subName}@${scope.row.source.name}`
                : scope.row.source.name
            }}
            <el-link :href="scope.row.source.web" type="info" :underline="false" target="_blank">
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
        <!-- <el-table-column prop="id" label="ID"> </el-table-column> -->
      </el-table>
      <div class="mt-4">
        <el-pagination
          class="flex py-2 mx-auto"
          background
          layout="total,'->', sizes, prev, pager, next, jumper"
          :total="1000"
        />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { useAxios, useNotify, useDayjs } from '@/hooks'
import { IFeed } from '@/types/interface'

export default defineComponent({
  name: 'FeedList',
  components: {},
  props: {},
  setup(props) {
    const isLoading = ref(true)
    const feedItems = reactive<IFeed[]>([])
    const { formatRelativeIn3Days } = useDayjs()
    const { notifyError } = useNotify()

    const fetchFeed = async () => {
      isLoading.value = true
      const { error, data, finished } = await useAxios('feeders')
      // const dataItems = data.value.data
      // const dataMeta = data.value.meta
      if (!error.value) {
        isLoading.value = !finished.value
        data.value.data.forEach((e: IFeed) => {
          e.date = formatRelativeIn3Days(e.pubDate)
        })
        feedItems.splice(0, feedItems.length, ...data.value.data)
      } else {
        notifyError(error.value)
      }
    }

    onMounted(() => {
      fetchFeed()
    })
    return {
      isLoading,
      feedItems,
    }
  },
})
</script>
