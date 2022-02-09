import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]), // 不希望为0
    setParam
  ] as const
}