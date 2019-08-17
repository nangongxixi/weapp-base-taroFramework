import { NoData } from '@com/index'
import {ScrollView, View} from '@tarojs/components'
import {useRef, useState} from '@tarojs/taro'
import {log, useAsyncEffect} from '@util/index'
import PropTypes from 'prop-types'
import {AtActivityIndicator} from "taro-ui";

function JScrollView({onData, service, args, onScroll, children}) {
    log('render: JScrollView');
    const [ noData, setNoData ] = useState(false);

    // const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const finished = useRef(false);
    const page = useRef(1);
    const items = useRef([]);

    const fetchData = async () => {
        if (finished.current) {
            log('search: isFinished');
            return
        }

        log('search: scrollView fetchData start');

        setLoading(true);
        let data = await service({...args, page: page.current++});
        setLoading(false);

        log('search: scrollView data fetched')

        finished.current = data.length === 0;
        items.current = page.current === 2 ? data: [...items.current, ...data];
        setNoData(items.current.length === 0);

        onData(items.current);
    };

    // 特别注意, args需要使用hook setState()生成
    useAsyncEffect(() => {
        log('search: scrollView reset fetch');
        page.current = 1;
        finished.current = false;
        items.current = [];
        setNoData(false);
        fetchData()
    }, [args]);

    return (
        <ScrollView
          className='flex-auto'
          scrollY
          onScrollToLower={() => fetchData()}
          onScroll={onScroll}
        >
            {noData && <NoData />}

            {children}

            {isLoading &&
            <View className='text-center'><AtActivityIndicator content='加载中...' /></View>
            }

            {!noData && finished.current &&
            <View className='text-center' style='padding-bottom:15px;'>数据已加载完, 我是有底线的</View>
            }
        </ScrollView>
    )
}

JScrollView.propTypes = {
    service: PropTypes.func,
    args: PropTypes.object,
    onData: PropTypes.func,
    children: PropTypes.object,
    onScroll: PropTypes.func
};

JScrollView.defaultProps = {
    args: {},
    onScroll: () => {}
};

JScrollView.options = {
    addGlobalClass: true
};

export default JScrollView;
