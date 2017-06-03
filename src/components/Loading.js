import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types'

function Loading(props){
  const {loading, showLoader} = props
  if(loading) {
    if(showLoader){
      return <CircularProgress  size={80} thickness={10}/>
    } else {
      return null
    }
  } else {
    return props.children
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
  showLoader: PropTypes.bool
}

Loading.defaultProps = {
  showLoader: true
}

export default Loading;
