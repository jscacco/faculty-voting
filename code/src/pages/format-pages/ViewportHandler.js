import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Breakpoints      from '../../components/theme/Breakpoints';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const getViewport = (windowWidth) => {

  if (windowWidth <= Breakpoints.smallMobile) { return 'smallMobile'}
  else if (windowWidth <= Breakpoints.mobile) { return 'mobile' }
  else if (windowWidth <= Breakpoints.tablet) { return 'tablet'}
  else if (windowWidth <= Breakpoints.smallDesktop) { return 'smallDesktop' }
  else if (windowWidth <= Breakpoints.desktop) { return 'desktop' }
  else if (windowWidth <= Breakpoints.largeDesktop) { return 'largeDesktop' }
  else if (windowWidth <= Breakpoints.hdDesktop) { return 'hdDesktop' }
  else { return 'uhdDesktop' }

}

class ViewportHandler extends React.Component {

  constructor(props) {
    super(props);

    const initView = getViewport(window.innerWidth);
    this.state = { viewport: initView };

    this.handleResize = this.handleResize.bind(this);
  }

  async handleResize(e) {

    const viewport = getViewport(window.innerWidth);

    if (this.state.viewport === viewport) { return; }

    await this.setState({
      ...this.state,
      viewport: viewport
    })
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize)
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize)
  }

  render () {

    console.log(this.state)
    return (
      <>
        {React.cloneElement(this.props.children, { viewport: this.state.viewport })}
      </>
    )
  }
}

ViewportHandler.propTypes = propTypes;
ViewportHandler.defaultProps = defaultProps;

export default ViewportHandler;
