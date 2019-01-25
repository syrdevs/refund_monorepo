import * as React from "react";
import styled from "styled-components";
import { COLORS, SIZES, WEIGHTS } from "@vitacore/shared-ui";
import Breadcrumbs from '../components/BreadCumber'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: white;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  font-size: ${SIZES.s18}px;
  color: ${COLORS.MAIN_BLUE};
  font-weight: ${WEIGHTS.MEDIUM};
  text-transform: uppercase;
`;

const BreadcrumbsContainer = styled.div`
  padding: 4px 15px;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0;
`;

const MainContent = styled.div`
  padding: 10px;
 width:100%;
 overflow-x:hidden;
`;

class ContentLayout extends React.Component {
  render() {

    const { breadcrumbRoutes, contentName } = this.props;

    return (<Container>
      <ContentHeader>{contentName}</ContentHeader>
      {breadcrumbRoutes && (
        <BreadcrumbsContainer>
          <Breadcrumbs routes={breadcrumbRoutes}/>
        </BreadcrumbsContainer>
      )}
      <MainContent>{this.props.children}</MainContent>
    </Container>);
  }

}

export default ContentLayout;