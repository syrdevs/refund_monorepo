import { Col, Input } from 'antd'
import React from 'react'
import { ProtocolForList } from '../../Entities/Protocol'
import { CommonFormItemLayout, LabelColStyled, RowStyled } from '../shared'

const ProtocolInfo = (props: ProtocolForList) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <RowStyled>
      <LabelColStyled {...CommonFormItemLayout.labelCol}>Плановый период</LabelColStyled>
      <Col {...CommonFormItemLayout.wrapperCol}>
        <Input disabled={true} value={props.periodYear!.year} />
      </Col>
    </RowStyled>
    <RowStyled>
      <LabelColStyled {...CommonFormItemLayout.labelCol}>Регион</LabelColStyled>
      <Col {...CommonFormItemLayout.wrapperCol}>
        <Input disabled={true} value={props.region!.nameRu} />
      </Col>
    </RowStyled>
    <RowStyled>
      <LabelColStyled {...CommonFormItemLayout.labelCol}>Тип</LabelColStyled>
      <Col {...CommonFormItemLayout.wrapperCol}>
        <Input disabled={true} value={props.planProtocolType!.nameRu} />
      </Col>
    </RowStyled>
    <RowStyled>
      <LabelColStyled {...CommonFormItemLayout.labelCol}>Регистрационный номер</LabelColStyled>
      <Col {...CommonFormItemLayout.wrapperCol}>
        <Input disabled={true} value={props.number} />
      </Col>
    </RowStyled>
    <RowStyled>
      <LabelColStyled {...CommonFormItemLayout.labelCol}>Описание</LabelColStyled>
      <Col {...CommonFormItemLayout.wrapperCol}>
        <Input disabled={true} value={props.descr} />
      </Col>
    </RowStyled>
    <RowStyled>
      <LabelColStyled {...CommonFormItemLayout.labelCol}>Дата</LabelColStyled>
      <Col {...CommonFormItemLayout.wrapperCol}>
        <Input disabled={true} value={props.documentDate} />
      </Col>
    </RowStyled>
  </div>
)

export default ProtocolInfo
