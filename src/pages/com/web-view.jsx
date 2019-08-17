import {BaseView} from '@com/index'
import {WebView} from '@tarojs/components'

export default function SuccessPage() {
    const {path} = this.$router.params;
    const jz = path === 'jz';
    return (
        <BaseView>
            <WebView
              src={jz ? 'http://m.jc001.cn/' : decodeURIComponent(path)}
              style={jz ? '' : 'top:45px'}
            />
        </BaseView>
    )
}
