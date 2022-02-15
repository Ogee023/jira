import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useDebounce, useDocumentTitle } from "utils"
import styled from "@emotion/styled"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { Row } from "antd"
import { useProjectModal, useProjectsSearchParams } from "./util"
import { ButtonNoPadding, ErrorBox } from "components/lib"

// 基本类型和组件状态可以放到依赖里，非组件状态的对象绝不可以放到依赖里

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  const { open } = useProjectModal()

  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  return <Container>
    <Row justify="space-between" align="middle">
      <h1>项目列表</h1>
      <ButtonNoPadding
        onClick={open}
        type="link"
      >
        创建项目
      </ButtonNoPadding>
    </Row>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    <ErrorBox error={error} />
    <List loading={isLoading} users={users || []} dataSource={list || []} />
  </Container>
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
