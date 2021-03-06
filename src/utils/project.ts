import { QueryKey, useMutation, useQuery } from "react-query"
import { Project } from "types/project"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options"

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  return useQuery<Project[]>(['projects', cleanObject(param)], () => client('projects', { data: param }))
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) => client(`projects/${params.id}`, {
      method: 'PATCH',
      data: params
    }),
    useEditConfig(queryKey)
  )
}

export const useAddProject = (queryKey: QueryKey) => {
  const clinet = useHttp()

  return useMutation(
    (params: Partial<Project>) => clinet(`projects`, {
      data: params,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const clinet = useHttp()

  return useMutation(
    ({ id }: { id: number }) => clinet(`projects/${id}`, {
      method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  )
}
