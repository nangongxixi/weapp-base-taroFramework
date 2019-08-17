import {BaseView, JoinAdd} from "@com/index";
import {View} from "@tarojs/components";
import {rIndex} from "@inc/router/url";
import {useDocumentTitle, useStatAddIndex, pageShare} from "@inc/index";
import router from "@inc/router";

import Banner from "./widget/Banner";
import Menu from "./widget/Menu";
import Boradcast from "./widget/Boradcast";
import RmdAgent from "./widget/RmdAgent";
import FlowPath from "./widget/FlowPath";
import RmdBrand from "./widget/RmdBrand";
import Card from "./widget/Card";
import JoinMsgRmd from "./widget/JoinMsgRmd";
import JoinNewsRmd from "./widget/JoinNewsRmd";
import JoinShop from "./widget/JoinShop";

export default function IndexPage() {
    useDocumentTitle('九正招商宝');
    useStatAddIndex();

    pageShare(this, () => ({
        title: '九正招商，中国建材家居企业品质招商平台！',
    }), rIndex.index);

    return (
        <BaseView navBar>
          <View>
            <Banner search />
            <Menu showAll={false} max={7} />
            <Boradcast />

            <RmdAgent />
            <FlowPath />

            <View style='margin: 20px 0;'>
              <Boradcast type='shop' />
            </View>
            <RmdBrand />
            <Card />
            <JoinMsgRmd />
            <JoinNewsRmd />
            <JoinShop />
            <JoinAdd />
          </View>
        </BaseView>
    )
}

