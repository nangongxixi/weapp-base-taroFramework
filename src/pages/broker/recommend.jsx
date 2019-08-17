import {BaseView} from '@com/index'
import {useDocumentTitle} from "@inc/use-dom";

import Recommend from './widget/Recommend';

export default function RecommendPage() {
    const {id} = this.$router.params;
    useDocumentTitle('推荐客户');

    return (
        <BaseView>
            <Recommend shopId={id} />
        </BaseView>
    )
}

RecommendPage.options = {
    addGlobalClass: true
};
