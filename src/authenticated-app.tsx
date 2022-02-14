import styled from "@emotion/styled"
import { ButtonNoPadding, Row } from "components/lib"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd"
import { Route, Routes} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import { ProjectScreen } from "screens/project"
import { resetRouter } from "utils"
import { ProjectModal } from "screens/project-list/project-modal"
import { ProjectPopover } from "components/project-popover"
import { useDispatch } from "react-redux"
import { projectListActions } from "screens/project-list/project-list.slice"

export const AuthenticatedApp = () => {
  const dispatch = useDispatch()
  
  return <Container>
    <PageHeader />
    <Main>
      <Router>
        <Routes>
          <Route path='projects' element={<ProjectListScreen projectButton= {
            <ButtonNoPadding 
              onClick={() => dispatch(projectListActions.openProjectModal())}
              type="link"
            >
              创建项目
            </ButtonNoPadding> 
            } />} />
          <Route path='projects/:projectId/*' element={<ProjectScreen />} />
          <Route index element={<ProjectListScreen projectButton={
            <ButtonNoPadding
              onClick={() => dispatch(projectListActions.openProjectModal())}
              type="link"
            >
              创建项目
            </ButtonNoPadding>
          } />} />
        </Routes>
      </Router>
      
    </Main>
    <ProjectModal />
  </Container>
}

const PageHeader = () => {
  return <Header between={true}>
    <HeaderLeft gap={true}>
      <ButtonNoPadding type="link" onClick={resetRouter}>
        <SoftwareLogo width='18rem' color="rgb(38, 132, 255)" />
      </ButtonNoPadding>
      <ProjectPopover />
      <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
      <User />
    </HeaderRight>
  </Header>
}

const User = () => {
  const { logout, user } = useAuth()

  return <Dropdown overlay={<Menu>
    <Menu.Item key="logout">
      <Button type="link" onClick={logout}>登出</Button>
    </Menu.Item>
  </Menu>}>
    <Button type="link" onClick={e => e.preventDefault()}>
      Hi，{user?.name}
    </Button>
  </Dropdown>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
// grid-area用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)`
`

const HeaderRight = styled.div``

const Main = styled.main`
`
