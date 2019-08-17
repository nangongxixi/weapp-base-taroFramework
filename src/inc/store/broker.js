import { cacheAsyncData, makeStore } from '@util'
import { Store } from 'laco'
import {goto} from "@inc/router";
import {goWeb} from "@inc/use-user";
import {useEffect, useRef} from "@tarojs/taro";
import {brokerMyCheck} from '@inc/service/broker'
import {useUserStore} from "@inc/store/user";

export const BrokerStore = new Store({
  isBroker: false,
  isOpenRegWin: false,
  isBrokerLoaded: false,
}, 'BrokerStore');

const useBrokerStore = makeStore(BrokerStore);

const setBrokerStatues = (info) => {
  BrokerStore.set((state) => {
    return {...state, ...info};
  })
};

// eslint-disable-next-line no-unused-vars
let callback = {};

export const showRegWin = (onBrokerSuccess) => {
  callback.onBrokerSuccess = onBrokerSuccess;
  BrokerStore.set((state) => {
    return {...state, isOpenRegWin: true};
  })
};

export const hideRegWin = () => {
  BrokerStore.set((state) => {
    return {...state, isOpenRegWin: false};
  })
};

function getBrokerAsync (refresh) {
  return cacheAsyncData('broker', function () {
    return brokerMyCheck().then(function (info) {
      setBrokerStatues({
        isBroker: info,
        // isBroker: false, // debug
        isOpenRegWin: false,
        isBrokerLoaded: true,
      });
      return info
    })
  }, refresh)
}

/**
 * 经纪人 hook
 * @param autoPop
 */
export const useBroker = (autoPop = false) => {
  const store = useBrokerStore();
  const isFirstPop = useRef(false);
  const {isGuest} = useUserStore();

  useEffect(() => {
    if(!isGuest){
      getBrokerAsync();
    }
  }, [isGuest]);

  useEffect(() => {
    if(!autoPop || isFirstPop.current){
      return;
    }

    if(store.isBrokerLoaded && !store.isBroker && !store.isOpenRegWin){
      isFirstPop.current = true;
      showRegWin();
    }
  }, [autoPop, store]);

  const handleBrokerLink = (link, arg) => {
    return () => {
      if (store.isBroker) {
        link === 'goWeb' ? goWeb(arg = 'agent') : goto(link, arg)
        return
      }

      showRegWin(() => {
        console.log('333')
        link === 'goWeb' ? goWeb(arg = 'agent') : goto(link, arg)
      });
    }
  };

  return {
    ...store,
    isBroker: store.isBroker,
    isOpenRegWin: store.isOpenRegWin,
    handleBrokerLink,
    asyncInitBroker: getBrokerAsync
  };
};

export const onBrokerSuccess = () =>
    callback.onBrokerSuccess && callback.onBrokerSuccess();
