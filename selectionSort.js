/**
* 選択ソートを実現するためのクラス
* 選択ソートでは、以下のアルゴリズムでソートを行う。
* ・最小値の初期値として十分に大きな数を設定
* ・最小値のindexの初期値としてインデックスとしては起こり得ない「-1」を設定
* ・最小値をセットするためのpointerとして配列先頭要素を設定
*
* ・pointerから探索要素の配列のlength-1までループを行い、
*   制御用変数に格納された最小値よりもelementが小さい場合、最小値及びindexを更新
*
* ・ループを終了したら、pointer番目の要素と最小値の要素を入れ替え
*
* ・pointerが探索要素の終端に到達するまで再帰的に上記動作を実行
*
* ・探索が終了すると、昇順にソートされた探索要素配列が出来上がる
*/
export default class SelectionSort {
	
	constructor() {
		this.sortList = [];
		this.pointer = 0; // 選択ソートのポインタとして利用
	}
	
	init() {
		this.pointer = 0;
	}
	
	/**
	 * 選択ソートを実際に行う
	 * @returns {Array} ソート済みの探索配列
	 */
	selectionSort(sortList) {
		
		if (sortList.length === 0) {
			return [];
		}
		
		this.sortList = sortList;
		
		for (let i = 0; i < this.sortList.length; i++) {
			// 他の要素と重複しないよう範囲外の値を初期値として設定
			let min = 99999;
			let minIndex = -1;

			// 最小値の更新
			for (let j = this.pointer; j < this.sortList.length; j++) {
				if (min > this.sortList[j]) {
					min = this.sortList[j];
					minIndex = j;
				}
			}

			// 入れ替え
			[this.sortList[this.pointer], this.sortList[minIndex]] = [this.sortList[minIndex], this.sortList[this.pointer]];
			
			this.pointer ++;

		}
		
		return this.sortList;
		
	}
	
}