import Dom from '../util/domManipulator.js';
import Validator from '../util/validator.js'
import EventHandler from './eventHandler.js';

import LinearSearch from '../algorithm/linearSearch.js';
import SelectionSort from '../algorithm/selectionSort.js';
import BubbleSort from '../algorithm/bubbleSort.js';

/**
*
* 探索・ソートを操作するためのハンドラ
* 探索・ソートアルゴリズムを動的に変更可能とし、かつ、
* 各アルゴリズムを呼び出し可能とする
*/
export default class AlgorithmHandler extends EventHandler{
	
	constructor(listContainer, defaultEvent) {
		
		super(listContainer, defaultEvent);
		
		// 呼び出し可能なアルゴリズム
		this.SearchAlgorithmList = {LinearSearch};
		this.SortAlgorithmList = {SelectionSort, BubbleSort};
		
		// ソート・探索イベント発火時に実行されるアルゴリズム
		this.currentSearch = null;
		this.currentSort = null;
		
		// デフォルトのアルゴリズムを設定
		this.overrideSortAlgorithm('BubbleSort');
		this.overrideSearchAlgorithm('LinearSearch');
		
		let funcList = [this.searchButtonClick, this.sortButtonClick];
		super.registerEvent(['searchButton', 'sortButton'], 'click', funcList);
	}
	
	// ソート・探索イベント発火時に実行されるアルゴリズムを動的に変更
	overrideSortAlgorithm(sortAlgorithm) {
		this.currentSort = sortAlgorithm;
	}
	overrideSearchAlgorithm(searchAlgorithm) {
		this.currentSearch = searchAlgorithm;
	}
	
	// 探索
	searchButtonClick() {
		this.defaultEvent.clear();
		this.searchItem();
	}
	// ソート
	sortButtonClick() {
		this.defaultEvent.clear();
		
		this.sortItem();
	}
	
	 /**
	 * リストを探索する
	 */
	searchItem() {
		// 探索要素
		let target = document.getElementById('searchText').value;
		// バリデーション
		if (!Validator.validateNumericInput(target)) {
			this.defaultEvent.setErrorMessage('数値を入力してください。')
			return;
		}
		this.listContainer.target = parseInt(target);
		
		// 探索アルゴリズムを決定
		const SearchAlgorithm = new this.SearchAlgorithmList[this.currentSearch](this.listContainer);

		// 探索
		SearchAlgorithm.search();
	}
	
	sortItem() {
		// ソートアルゴリズムを決定
		const SortAlgorithm = new this.SortAlgorithmList[this.currentSort](this.listContainer);
		
		let sortedItemList = SortAlgorithm.sort();
		
		// ソート後には並べ替えのため再描画が必要となるので、既存要素は削除
		this.defaultEvent.deleteElement();
		
		// ソート結果で再描画
		sortedItemList.forEach((element) => {
			this.listContainer.itemList.push(element);
			Dom.appendItem(this.listContainer.itemList);
		});
		
		Dom.setMessage('resultStepCount', SortAlgorithm.getStep());
		
	}
	
}