import {rCom} from '@inc/router/url'
import {goto} from '@inc/router'
import {vailPhone} from '@util/tool'
import {showMsg} from '@util/message'
import {brandJoin} from '@inc/service/mine'

// eslint-disable-next-line import/prefer-default-export
export async function goJoin(e, onFocus, type) {
    let c = 0;
    const form = e.detail.value;
    const field = ['name', 'phone', 'brand_name'];
    const tip = ['姓名', '正确手机号', '品牌名称'];
    form.type = type || 1;
    field.every((key, index) => {
        const val = form[key];
        if (key === 'phone' ? !vailPhone(val) : !val) {
            showMsg(`请填写${tip[index]}！`);
            c += 1;
            onFocus(key);
            return false;
        }
        return true;
    });
    if (!c) {
        try {
            await brandJoin(form);
            goto(rCom.success);
        } catch (err) {
            showMsg(err.message);
        }
    }
}
