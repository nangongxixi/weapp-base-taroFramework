import {getUserSync} from "@inc/store/user";
import router from "@inc/router";
import {log} from "@util/index";

export function pageShare(page, genShareInfoCallback, path, args = {}) {
    page.onShareAppMessage = () => {
        const shareInfo = genShareInfoCallback();
        appendShareUid(args);
        shareInfo.path = router.genUrl(path, args);
        log('debug:share', shareInfo);
        return shareInfo;
    };
}

const appendShareUid = (args) => {
    const userInfo = getUserSync();
    args.shareUid = userInfo ? userInfo.info.uid : 0
};

export function shareMessage(title, img, path, args = {}) {
    appendShareUid(args);
    const share = {
        title: title,
        imageUrl: img,
        path: router.genUrl(path, args)
    };
    log('debug:share', share);
    return share;
}
