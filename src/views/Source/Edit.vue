<template>
  <div>
    <el-form :model="formItem" label-suffix=":">
      <el-form-item label="ID">{{ formItem.id }}</el-form-item>
      <el-form-item label="名称"><el-input v-model="formItem.name"></el-input></el-form-item>
      <el-form-item label="网址"><el-input v-model="formItem.web"></el-input></el-form-item>
      <el-form-item label="RSS"><el-input v-model="formItem.rss"></el-input></el-form-item>
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
  setup(props) {
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
    return {
      isLoading,
      editId,
      formItem,
    }
  },
})
</script>
