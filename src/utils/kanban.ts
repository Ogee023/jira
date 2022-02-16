import { QueryKey, useMutation, useQuery } from "react-query"
import { Kanban } from "types/kanban"
import { useHttp } from "./http"
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options"

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
