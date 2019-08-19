/**
 * 線形探索を行うクラス
 */
export default class LinearSearch {

    constructor(searchList, dom) {
        this.searchList = searchList;
        this.dom = dom;
    }

    search(target) {
        // リストを探索し、ヒットするまでは文字色をグレーにし、ヒットしたら該当文字色を赤にして
        // 以降の処理は全てスキップ
        let matched = false;

        this.searchList.forEach((element, index) => {
            // 該当要素が存在するか
            if (element === target) {
                this.dom.setClass('item-' + index, 'targetItem');

                matched = true;
            }

            // マッチするまでは線形探索を続ける
            if (!matched) {
                this.dom.setClass('item-' + index, 'searchedItem');
            }
            
        });

        return matched;
    }
    

}