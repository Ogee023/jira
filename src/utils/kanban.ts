import { QueryKey, useMutation, useQuery } from "react-query"
import { Kanban } from "types/kanban"
import { useHttp } from "./http"
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "./use-optimistic-options"

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()

  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: param }))
}

export const useAddKanban = (queryKey: QueryKey) => {
  const clinet = useHttp()

  return useMutation(
    (params: Partial<Kanban>) => clinet(`kanbans`, {
      data: params,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}


export const useDeleteKanban = (queryKey: QueryKey) => {
  const clinet = useHttp()

  return useMutation(
    ({ id }: { id: number }) => clinet(`kanbans/${id}`, {
      method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
}

export interface SortProps {
  // 要重新排序的item
  fromId: number;
  // 目标item
  referenceId: number;
  // 目标item的前还是后
  type: 'before' | 'after';
  fromKanbanId?: number;
  toKanbanId?: number
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: SortProps) => {
      return client('kanbans/reorder', {
        data: params,
        method: 'POST'
      })
    },
    useReorderKanbanConfig(queryKey)
  )
}
