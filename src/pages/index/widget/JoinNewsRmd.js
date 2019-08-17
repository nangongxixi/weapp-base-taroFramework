import {View} from "@tarojs/components";
import {useAsyncEffect, cacheAsyncData} from "@util/index";
import {useState} from "@tarojs/taro";
import {rIndex} from "@inc/router/url";
import Lists from "@com/news/Lists";
import Title from "@com/Title";
import {newsSearch} from "@inc/service";

function JoinNewsRmd() {
    //const [v, setV] = useState(0);
    const [ items, setItems ] = useState([]);

    useAsyncEffect(async () => {
        setItems(await cacheAsyncData('indexJoinNews', () => newsSearch({
            nums: 4, at: 'index'
        })));
    });

    return (
        <View className='box1'>
            <Title name='加盟宝典' autoMb path={rIndex.book} />
            <Lists items={items} />
        </View>
    )
}

JoinNewsRmd.options = {
    addGlobalClass: true
};

export default JoinNewsRmd
