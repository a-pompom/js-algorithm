import EventHandler from './eventHandler.js';
import Dom from '../util/domManipulator.js';

/**
*
* 他のハンドラからも参照されるような汎用的なイベントを管理する
*/
export default class BasicEventHandler extends EventHandler{
	
	// 削除・クリアを登録
	constructor(listContainer, dom) {
		super(listContainer, dom);
		
		let funcList = [this.deleteButtonClick, this.clearButtonClick];
		super.registerEvent(['deleteButton', 'clearButton'], 'click', funcList);
		
	}
	
	// 削除
	deleteButtonClick() {
		this.clear();
		this.deleteElement();
	}
	// クリア
	clearButtonClick() {
		this.clear();
	}
	
	 /**
	 * 再探索ができるようボタンクリックで毎回探索結果をクリア
	 */
	clear() {
		this.clearErrorMessage();
		this.clearStyleClass();
		
		this.listContainer.matched = false;
	}
	
	/**
	 * エラーメッセージを設定
	 * @param {String} message エラーメッセージ
	 */
	setErrorMessage(message) {
		Dom.setMessage('errorMessageText', message);
	}

	/**
	 * エラーメッセージをクリア
	 */
	clearErrorMessage() {
		Dom.clearMessage('errorMessageText');
	}

	/**
	 * 要素に割り当てられたスタイルを初期化
	 */
	clearStyleClass() {

		this.listContainer.itemList.forEach((element, index) => {
			Dom.removeStyleClass('item-' + index, 'targetItem');
			Dom.removeStyleClass('item-' + index, 'searchedItem');
		});
	}

	/**
	 * 探索要素を全削除する
	 * 探索要素の配列・探索要素のDOMを初期化する
	 */
	deleteElement() {
		this.listContainer.itemList.forEach((element, index) => {
			document.getElementById('item-' + index).remove();
		});
		this.listContainer.itemList = [];
	}
	
	
}