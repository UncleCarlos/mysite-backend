<template>
  <div>
    <Card>
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
                <span>{{ $dayjs(scope.row.pubDate).locale('zh-cn').fromNow() }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="源" width="100px">
          <template #default="scope">
            <a :href="scope.row.source.web" target="_blank">{{ scope.row.source.name }}</a>
          </template>
        </el-table-column>
        <el-table-column width="100px">
          <template #default="scope">
            <button>编辑</button>
            <button>删除</button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="id" label="ID"> </el-table-column> -->
      </el-table>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useAxios } from '@/hooks/useAxios'
import { IFeed } from '@/types/interface'

export default defineComponent({
  name: 'FeedList',
  components: {},
  props: {},
  setup(props) {
    const isLoading = ref(true)
    const feedItems = reactive<IFeed[]>([])
    const fetchFeed = async () => {
      isLoading.value = true
      const { error, data, finished } = await useAxios('feeders')
      // const dataItems = data.value.data
      // const dataMeta = data.value.meta
      if (!error.value) {
        isLoading.value = !finished.value
        feedItems.splice(0, feedItems.length, ...data.value.data)
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
