<template>
  <div>
    <el-form
      :model="formItem"
      label-suffix=":"
      label-position="right"
      label-width="80px"
      class="mr-6"
    >
      <el-form-item label="ID">{{ formItem.id }}</el-form-item>
      <el-form-item label="名称"><el-input v-model="formItem.name" /></el-form-item>
      <el-form-item label="子名称"><el-input v-model="formItem.subName" /></el-form-item>
      <el-form-item label="网址"><el-input v-model="formItem.web" /></el-form-item>
      <el-form-item label="RSS"><el-input v-model="formItem.rss" /></el-form-item>
      <el-form-item
        ><el-button type="primary">保存</el-button
        ><el-button @click="handleClose">取消</el-button></el-form-item
      >
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useAxios } from '@/hooks/useAxios'

export default defineComponent({
  name: 'SourceEdit',
  components: {},
  props: {
    editId: {
      type: String,
      default: '',
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const isLoading = ref(true)
    const editId = computed(() => props.editId)
    const formItem = ref({})

    const fetchItem = async (id: string) => {
      isLoading.value = true
      const { error, data, finished } = await useAxios(`sources/${id}`)
      if (!error.value) {
        isLoading.value = !finished.value
        formItem.value = data.value.data
      }
    }
    onMounted(() => fetchItem(editId.value))

    const handleClose = () => {
      emit('close')
    }
    return {
      isLoading,
      editId,
      formItem,
      handleClose,
    }
  },
})
</script>
