<template>
  <div>
    <PCard>
      <template #title> 采集器 </template>
      <template #content>
        <div>
          <div class="grid grid-cols-2 text-sm">
            <span>下次执行</span>
            <span class="text-right">{{
              formatRelativeIn3Days(collectorStatus.meta.nextDate)
            }}</span>
          </div>
        </div>
      </template>
    </PCard>
  </div>
</template>

<script lang="ts">
import { useDayjs, useService } from '@/hooks'
import { ICollectorStats } from '@/types/interface'
import { defineComponent, onMounted, reactive, Ref, ref, toRefs } from 'vue'

export default defineComponent({
  name: 'CollectorList',
  components: {},
  props: {},
  setup(props) {
    // 采集器相关
    const { serviceGetCollectorStatus } = useService()
    const collectorIsLoading = ref(true)
    const collectorStatus: Ref<ICollectorStats> = ref({ sources: [], meta: {} })
    const { formatRelativeIn3Days } = useDayjs()
    const getCollectorStatus = async () => {
      collectorIsLoading.value = true
      const { error, data } = await serviceGetCollectorStatus()
      if (!error) {
        const { data: sources, meta } = data.value
        collectorStatus.value.sources = sources
        collectorStatus.value.meta = meta
        collectorIsLoading.value = false
      }
    }
    onMounted(() => {
      getCollectorStatus()
    })
    return {
      collectorStatus,
      formatRelativeIn3Days,
    }
  },
})
</script>
