import {useState} from "@tarojs/taro";
import {useAsyncEffect} from "@util/use-reqeust";
import {cacheAsyncData} from "@util/index";
import { searchBudgets } from '@inc/service/broker'

const makeCategory = (items) => {
    return  {
        items,
        _findById (id) {
            return this.items.find((item) => item.id == id)
        },
        getName(id) {
            const item = this._findById(id);
            return item ? item.name : ''
        },
        map(callback) {
            return this.items.map((item, index) => callback(item, index))
        }
    }
};

export const usePrices = () => {
    const [items, setItems] = useState([
        {id: 1, name: '5万以下'},
        {id: 2, name: '5-10万'},
        {id: 3, name: '10-25万'},
        {id: 4, name: '25万以上'}
    ]);

    useAsyncEffect(async () => {
        setItems(await cacheAsyncData('AgentPrice', async () => {
            let rs = await searchBudgets();
            let arr = [];
            for (let key in rs) {
                arr.push({id: key, name: rs[key]})
            }
            return arr;
        }))
    });

    return makeCategory(items);
};

export const AgentRmds = makeCategory([
    {id: 1, name: '口碑好'},
    {id: 2, name: '大品牌'},
    {id: 4, name: '低投入'}
]);

export const AgentCategoryAll = {id: 0, name: '全部'};
export const isDefAgentCategory = (item) => parseInt(item.id) === AgentCategoryAll.id;
