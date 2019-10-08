/**
* head...並べ替え範囲の先頭要素の添え字
* tail...並べ替え範囲の末尾要素の添え字
* largeIndex...基準値より大きい要素を探すための変数
* smallIndex...基準値より小さい要素を探すための変数
*
*/
export default class QuickSort {
	
	constructor(listContainer) {
		this.step = {
			loop: 0,
			compare: 0,
			swap: 0
		};
		this.listContainer = listContainer;
		
		this.head = 0;
		this.tail = this.listContainer.itemList.length -1;
	}

	sort() {
		
		return this.quickSort(this.listContainer.itemList);
	}

	quickSort(sortList) {
		// JSの再帰呼び出しは挙動が不安定になっているので、再帰なしでクイックソートを実装してみるか
		let smallIndex = this.head + 1;
		let largeIndex = this.tail;

		while (smallIndex < largeIndex) {
			
			// ピボットの右側(大きい値)に置くべき値が見つかるまで探索
			while (sortList[this.head] > sortList[smallIndex] && smallIndex < this.tail) {
				smallIndex ++;
			}
			// ピボットの左側(小さい値)に置くべき値が見つかるまで探索
			while (sortList[this.head] <= sortList[largeIndex] && largeIndex > this.head) {
				largeIndex --;
			}
			
			// ピボットの左右を交換
			if (smallIndex < largeIndex) {
				[sortList[smallIndex], sortList[largeIndex]] = [sortList[largeIndex], sortList[smallIndex]];
			}
			
		}
		
		// ピボットを真ん中(largeIndexは交換により、ピボットより小さい値が入っている。
		// よって、largeIndexが交換対象)の要素と交換
		if (sortList[this.head] > sortList[largeIndex]) {
			[sortList[this.head], sortList[largeIndex]] = [sortList[largeIndex], sortList[this.head]];
		}
		return sortList;
	}
	
	getStep() {
		return this.step;
	}
	
}