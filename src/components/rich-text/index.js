import { RichText } from '@tarojs/components'
import PropTypes from 'prop-types'

function Rich({content, float}) {
    const regex = new RegExp('<img', 'gi')
    let nodes = content && content.replace(regex, `<img style="max-width:100%; vertical-align:top; display:block; ${float ? 'float:left;' : ''}"`)

    return (
        <RichText style='font-size:14px; line-height:25px;' nodes={nodes} />
    )
}

Rich.propTypes = {
    content: PropTypes.string,
    float: PropTypes.bool
}

Rich.defaultProps = {
    content: '',
    float: false
}

Rich.options = {
    addGlobalClass: true
}

export default Rich
