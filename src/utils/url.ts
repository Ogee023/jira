import { useSearchParams } from "react-router-dom"

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParam] = useSearchParams()
  return [
    keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || '' }
    }, {} as Record<string, string>),
    setSearchParam
  ] as const
}