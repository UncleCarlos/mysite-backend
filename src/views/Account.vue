<template>
  <div>
    User
    <Card></Card>
    <Card>
      <template #header>头啊</template>
      什么乱七八糟
      <template #footer>脚啊</template>
    </Card>
    <el-card class="box-card">
      <template #header>
        <div class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
      </template>
      123
    </el-card>
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useAxios } from '/@/hooks/useAxios'

export default defineComponent({
  name: 'User',
  components: {},
  props: {},
  setup(props) {
    const accountItems = reactive([])
    const fetchAccounts = async () => {
      const result = await useAxios('/backend/user')
    }
    const tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ])
    onMounted(async () => {
      fetchAccounts()
    })
    const data = reactive({
      tableData,
    })

    return {
      ...toRefs(data),
      fetchAccounts,
    }
  },
})
</script>
