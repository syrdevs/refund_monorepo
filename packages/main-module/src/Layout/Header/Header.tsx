import { SIZES, WEIGHTS } from '@vitacore/shared-ui'
import { Icon as AntIcon } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../Images/logo.png'
// import BaseComponent from 'src/Infrastructure/BaseComponent'
import { User } from '../../Models'
import { State } from '../../Redux/StateModels'
import { getUserLanguage } from '../../utils'
import LanguageSelector from './LanguageSelector'

const HeaderContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 70px;
  background-color: white;
`

const LogoContainer = styled.div`
  display: flex;
  width: 220px;
  align-items: center;
  justify-content: center;

  & > a.logo-link {
    display: block;

    img {
      height: 46px;
    }
  }
`

const TopBarContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;

  & > a.register-link {
    color: #b4b4b4;
  }

  & > a.login-link {
    padding: 3px 24px;
    background-color: #a4b671;
    color: white;
    margin-left: 10px;
    text-decoration: none;
    display: flex;
    align-items: center;

    & > .icon {
      margin-right: 4px;
    }
  }
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 6px;
`

const UserName = styled.div`
  color: black;
  font-size: ${SIZES.s12}px;
  font-weight: ${WEIGHTS.MEDIUM};
`

const UserOrganization = styled.div`
  color: #a2a2a2;
  font-size: ${SIZES.s12}px;
`

type PropsType = {
  isUserAuthenticated: boolean
  userData: Partial<User>
}

class Header extends React.Component<PropsType> {
  public render() {
    const userInfoElement = this.props.isUserAuthenticated ? (
      <UserContainer>
        <UserInfoContainer>
          <UserName>{this.props.userData.userName}</UserName>
          <UserOrganization>ФНАО «ФСМС» по Акмолинской области</UserOrganization>
        </UserInfoContainer>
        <Link to={'/logout'}>
          <AntIcon type="logout" />
        </Link>
      </UserContainer>
    ) : (
      <React.Fragment>
        <Link className="register-link" to={'/register'}>
          Регистрация
        </Link>
        <Link className="login-link" to={'/login'}>
          Вход
        </Link>
      </React.Fragment>
    )

    return (
      <HeaderContainer>
        <LogoContainer>
          <Link className="logo-link" to={'/'}>
            <img src={logo} />
          </Link>
        </LogoContainer>
        <TopBarContainer>
          <LanguageSelector defaultLanguage={getUserLanguage()} />
          {userInfoElement}
        </TopBarContainer>
      </HeaderContainer>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    isUserAuthenticated: state.userState.isAuthenticated && !state.userState.loginInProgress,
    userData: {
      userName: state.userState.user.userName,
    },
  }
}

export default connect(
  mapStateToProps,
  null
)(Header)
