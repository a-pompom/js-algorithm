import Dom from '../util/domManipulator.js';

/**
 * 線形探索を行うクラス
 */
export default class LinearSearch {

	constructor(listContainer) {
		this.listContainer = listContainer;
	}

	/**
	 * 線形探索を行う
	 * 探索が終了し、探索対象が探索範囲に存在した場合は、matchedをtrueとする
	 */
	search() {
		// リストを探索し、ヒットするまでは文字色をグレーにし、ヒットしたら該当文字色を赤にして
		// 以降の処理は全てスキップ
		this.listContainer.itemList.forEach((element, index) => {
			// 該当要素が存在するか
			if (element === this.listContainer.target) {
				Dom.setClass('item-' + index, 'targetItem');

				this.listContainer.matched = true;
			}

			// マッチするまでは線形探索を続ける
			if (!this.listContainer.matched) {
				Dom.setClass('item-' + index, 'searchedItem');
			}
			
		});
	}
	

}