import {Picker} from '@tarojs/components'
import {useRef, useState} from '@tarojs/taro'
import {useAsyncEffect} from '@util/index'
import {comRegion} from '@inc/service/user'
import PropTypes from 'prop-types'

function AreaDiy({areaId, text, onChange}) {
    const noArea = [{id: 0, name: '不限'}];
    const areas = useRef([]);
    const [area, setArea] = useState([]);
    const [areaText, setAreaText] = useState(text);
    useAsyncEffect(() => {
        getArea(areaId)
    });
    const getArea = async (pid, c = 0) => {
        const res = await comRegion({pid: pid});
        const len = res.length;
        areas.current[c] = res;
        let end = areas.current.slice(0, len ? c + 1 : c);
        const endLen = end.length;
        if (endLen === 1) {
            end.push(noArea);
        }
        setArea(end)
    };
    const getColumn = e => {
        const res = e.detail;
        const c = res.column;
        if (c === 0) {
            const pid = areas.current[c][res.value || 0].id;
            getArea(pid, c + 1)
        }
    };
    const getIds = e => {
        const a = areas.current;
        const v = e.detail.value;
        let o = {};
        if (typeof v === 'number') {
            o = a[0][v]
        } else {
            let r = area.length - 1;
            (!a[r] || !a[r].length
            ) && (r = r - 1
            );
            o = a[r][v[r]]
        }
        setAreaText(o.name);
        onChange(o.id)
    };
    return (
        <Picker
          mode='multiSelector'
          range={area}
          rangeKey='name'
          onChange={getIds}
          onColumnChange={getColumn}
        >
            {areaText || '请选择区域'}
        </Picker>
    )
}

AreaDiy.propTypes = {
    areaId: PropTypes.number,
    text: PropTypes.string,
    onChange: PropTypes.func
};

AreaDiy.defaultProps = {
    areaId: 0,
    onChange: () => {
    }
};

AreaDiy.options = {
    addGlobalClass: true
};

export default AreaDiy
