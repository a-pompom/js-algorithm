/**
* 挿入ソートを実現するためのクラス
* 以下のアルゴリズムでソートを行う
* ・forループのループインデックスを挿入対象として取得...Xとおく
* ・一つ前の要素をKとおくと、「K < X」を満たさない場合、昇順となるよう要素を入れ替え
* ・X、Kのインデックスを1つ前へずらし、「K > X」を満たすか、「K = 0」となるまで
*    探索を続行する
* ・全ての要素に対して挿入が完了すると、ソート完了となる
*
* 挿入ソートはソート済みであった場合、計算量はO(n)となり、ソート済みでない場合、平均・最悪計算量は
* O(n^2)となる
*
*/
export default class InsertionSort {
	
	constructor(listContainer) {
		this.step = {
			loop: 0,
			compare: 0,
			swap: 0
		};
		this.listContainer = listContainer;
	}
	
	/**
	 * 挿入ソートを実際に行う
	 * @returns {Array} ソート済みの探索配列
	 */
	sort() {
		let sortList = this.listContainer.itemList;
		let pointer = 0;
		if (sortList.length === 0) {
			return [];
		}

		for (let i = 0; i < sortList.length; i++) {
			this.step.loop++;
			
			let pointer = i;
			while (pointer > 0 && sortList[pointer - 1] > sortList[pointer]) {
				
				this.step.compare++;

				// 入れ替え
				[sortList[pointer -1], sortList[pointer]] = [sortList[pointer], sortList[pointer-1]];
				this.step.swap ++;
				
				pointer--;
			}	
		}
		
		return sortList;
		
	}
	
	getStep() {
		return this.step;
	}
	
}