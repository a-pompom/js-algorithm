/**
*
* バブルソート。
* リストの末尾から探索を開始し、前方の要素と比較。
* 前方の要素 > 末尾の要素の場合、2つの順序を入れ替える。
* これをリストの先頭に到達するまで繰り返すと、先頭にリストの最小値が格納される。
* 再び末尾から上記操作を繰り返す。このとき、先頭に最小値が格納されることで、
* 先頭が「ソート済み」となるので、探索範囲は、「末尾 ~ 先頭 + 1」番目までとなる。
* ソートを繰り返し、探索範囲が末尾まで到達したらソートを完了とする。
*/
export default class BubbleSort {
	
	constructor(listContainer) {
		this.listContainer = listContainer;
		this.step = {
			loop: 0,
			compare: 0,
			swap: 0
		};
	}
	
	sort() {
		let sortList = this.listContainer.itemList;
		let pointer = 0;
		
		if (sortList.length === 0) {
			return [];
		}
		
		for (let i= sortList.length - 1; i > 0; i --) {
			
			for (let j = sortList.length - 1; j > pointer; j--) {
				// ソート判定
				let current = j
				let prev = j - 1;
				
				this.step.compare ++;
				if (sortList[prev] > sortList[current]) {
					
					[sortList[current], sortList[prev]] = [sortList[prev], sortList[current]];
					this.step.swap ++;
				}
				
				this.step.loop ++;
				
			}
			
			pointer ++;
			
		}
		
		return sortList;
	}
	
	getStep() {
		return this.step;
	}
}