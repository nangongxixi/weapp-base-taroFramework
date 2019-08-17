import Taro, {useEffect} from "@tarojs/taro";

export function useDocumentTitle(title) {
    useEffect(() => {
        Taro.setNavigationBarTitle({
            'title': title
        });
    }, [title]);
}
