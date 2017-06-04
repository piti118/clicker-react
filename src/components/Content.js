import React from 'react'
import PropTypes from 'prop-types'
import HomeButton from './HomeButton'


function Content({ children, withHome }) {
  return (
    <div className="full-screen vertical-center">
      <div className="horizontal-center card">
        <div className="card-title">
          {withHome && <HomeButton />}
        </div>
        <div className="card-content">
          {children}
        </div>
      </div>
    </div>)
}

Content.propTypes = {
  withHome: PropTypes.bool,
}

Content.defaultProps = {
  withHome: true,
}

export default Content
