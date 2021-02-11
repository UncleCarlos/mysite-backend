<template>
  <div>
    <el-card>
      <template #header>头啊</template>
      <el-table :data="accountItems" :v-loading="isLoading">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="isActive" label="状态">
          <template #default="scope">
            <el-tag size="medium" :type="scope.row.isActive ? 'success' : 'danger'">
              {{ scope.row.isActive ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import qs from 'qs'
import { defineComponent, onMounted, reactive, ref, Ref, toRaw, toRefs, watchEffect } from 'vue'
import { useAxios } from '@/hooks/useAxios'
import { IAccount } from '@/interface'

export default defineComponent({
  name: 'User',
  components: {},
  props: {},
  setup(props) {
    const accountItems: IAccount[] = reactive([])
    const fetchAccounts = async () => {
      const { error, data } = await useAxios('backend/user')
      // const { error, data } = await res
      const items = data.value.data
      // console.log(qs.parse(toRaw(data.value)))
      // accountItems.splice(0, accountItems.length, stringify(data))
      if (!error.value) accountItems.splice(0, accountItems.length, ...items)
      console.log(accountItems)
    }
    const isLoading = ref(true)
    onMounted(async () => {
      fetchAccounts()
    })

    return {
      accountItems,
      fetchAccounts,
      isLoading
    }
  },
})
</script>
