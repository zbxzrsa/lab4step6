import type { EventState, Data } from '@/types'
import { defineStore } from 'pinia'
export const useEventStore = defineStore('event', {
  state: (): EventState => ({
    data: null
  }),
  actions: {
    setEvent(data: Data): void {
      this.data = data
    }
  }
})