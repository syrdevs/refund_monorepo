import { COLORS, ReduxActionType } from '@vitacore/shared-ui'
import { Alert, Button, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { login } from '../../Redux/Actions/userStateActions'
import { State } from '../../Redux/StateModels'
const FormItem = Form.Item

const LoginLayout = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 4px solid ${COLORS.MAIN_GREEN};
`

const LoginFormContainer = styled.div`
  max-width: 40%;
  background-color: white;
  border: 1px solid ${COLORS.GRAY};
  padding: 20px;
`

const FormAlert = styled(Alert)`
  && {
    margin-bottom: 10px;
    margin-top: 4px;
  }
`

type OwnProps = {
  redirectTo?: string
}

type StateProps = {
  loginErrorMessage: string
}

type DispatchProps = {
  tryLogin: (values: { userName: string; password: string }, redirectTo?: string) => any
}

type Props = OwnProps & StateProps & DispatchProps
class LoginForm extends React.Component<FormComponentProps & Props> {
  public handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.tryLogin(values, this.props.redirectTo)
      }
    })
  }

  public render() {
    const {
      loginErrorMessage,
      form: { getFieldDecorator },
    } = this.props

    return (
      <LoginLayout>
        <LoginFormContainer>
          <Form onSubmit={this.handleSubmit}>
            <FormItem style={{ marginBottom: '6px' }}>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Введите логин!' }],
              })(
                <Input
                  autoFocus={true}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Логин"
                />
              )}
            </FormItem>
            <FormItem style={{ marginBottom: '6px' }}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Введите пароль!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Пароль"
                />
              )}
            </FormItem>
            {loginErrorMessage && <FormAlert message={loginErrorMessage} type="error" />}
            <Button type="primary" htmlType="submit" block>
              Войти
            </Button>
          </Form>
        </LoginFormContainer>
      </LoginLayout>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    loginErrorMessage: state.userState.loginErrorMessage,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    tryLogin: (values: { userName: string; password: string }, redirectTo?: string) => {
      dispatch(login(values.userName, values.password, redirectTo))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(LoginForm))
