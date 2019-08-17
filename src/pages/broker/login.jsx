import { BaseView } from '@com/index'
import { View, Image } from '@tarojs/components'
import { friend } from '@img/images'
import { rBroker } from '@inc/router/url'
import { useBroker } from '@inc/store/broker'
import BrokerReg from '@com/auth/BrokerReg'
import { commissionRule } from '@inc/service/broker'
import {useDocumentTitle} from "@inc/use-dom";
import {useApi} from "@util/use-reqeust";


export default function BrokerLevelPage () {
  const {handleBrokerLink} = useBroker();
  const info = useApi(commissionRule);

  useDocumentTitle('九正招商');

  return (
    <BaseView>
      <View>
        <Image class='w100' src={info.invite_img || friend} mode='widthFix' />
        <View
          class='red-btn'
          style='position: fixed; left: 40px; right: 40px; bottom: 20px;'
          onClick={handleBrokerLink(rBroker.index)}
        >
          微信一键注册
        </View>
        <BrokerReg />
      </View>
    </BaseView>
  )
}
