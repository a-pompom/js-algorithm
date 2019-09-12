/**
* リストの状態を保持するためのクラス
* ・itemList...探索範囲のリスト ソートも行われる
* ・matched...探索対象が探索範囲に存在したか
* ・searchTarget...探索対象
*/
export default class ListContainer {
	
	constructor() {
		// 探索要素
		this.itemList = [];
		// 探索要素が見つかったか
		this.matched = false;
		// 探索対象
		this.searchTarget = -1;
	}
	
	// getter.setter
	get itemList() {
		return this._itemList;
	}
	set itemList(value) {
		this._itemList = value;
	}
	
	get matched() {
		return this._matched;
	}
	set matched(value) {
		this._matched = value;
	}
	
	get searchTarget() {
		return this._searchTarget;
	}
	set searchTarget(value) {
		this._searchTarget = value;
	}
	
}