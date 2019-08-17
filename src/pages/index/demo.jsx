import {Text, View} from '@tarojs/components'
import {BaseView} from "@com/index";
import {go} from "@inc/router";
import {rIndex} from "@inc/router/url";
import CounterStore from "@com/demo/CounterStore";

export default function DemoPage() {
    return (
        <BaseView>
            <View>Hi, demo,
                <Text onClick={go(rIndex.index, {page: 1})}>
                    Back index page
                </Text>
            </View>
            <CounterStore />
        </BaseView>
    )
}
