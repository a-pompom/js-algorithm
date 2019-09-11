import EventHandler from './eventHandler.js';
import Validator from '../util/validator.js';
import Dom from '../util/domManipulator.js';

/**
*
* ユーザからの入力を制御するためのハンドラを扱うクラス
*/
export default class InputHandler extends EventHandler {
	
	// 要素追加・要素自動生成
	constructor(listContainer, defaultEvent) {
		
		super(listContainer, defaultEvent);
		
		let funcList = [this.addButtonClick, this.generateButtonClick];
		super.registerEvent(['addButton', 'generateButton'], 'click', funcList);
		
		let generateFuncList = [this.autoGenerateFocus];
		
		super.registerEvent(['autoGenerator'], 'mouseup', generateFuncList);
		
		
	}
	
	addButtonClick() {
		this.defaultEvent.clear();
		
		this.addItem();
	}
	
	generateButtonClick() {
		this.defaultEvent.clear();
		this.defaultEvent.deleteElement();
		
		this.generateItem();
	}
	
	autoGenerateFocus() {
		this.autoGenerate();
	}
	
	/**
	 * 入力値をリストへ追加
	 * バリデーション処理が通ったもの(数値かつユニーク)を登録
	 */
	addItem() {
		// 入力値
		let addValue = document.getElementById('itemAddInput').value;
		
		//バリデーション
		if (!Validator.validateNumericInput(addValue)) {
			this.setErrorMessage('数値を入力してください');
			return;
		}
		addValue = parseInt(addValue);

		if (!Validator
			.validateDupulicateInput(addValue, this.listContainer.itemList)) {
				this.setErrorMessage('その値は既に登録されています');
				return;
		}

		this.listContainer.itemList.push(parseInt(addValue));
		this.appendItem();

		//連続で入力することを想定しているので、毎回入力部はクリア
		document.getElementById('itemAddInput').value = "";
	}
	
	/**
	 * 探索要素を自動生成する
	 * ・生成個数...何個要素を生成するか
	 * ・生成範囲...1から生成範囲までの数値をランダムに生成
	 */
	generateItem() {
		// 生成個数
		let generateCount = parseInt(document.getElementById('autoGenerateValue').textContent);
		
		let seedItemList = [];
		for (let i = 1; i < generateCount + 1; i++) {
			seedItemList.push(i);
		}
		
		// シャッフル
		for (let x = seedItemList.length - 1; x > 0; x--) {
		const j = Math.floor(Math.random() * (x + 1));
		[seedItemList[x], seedItemList[j]] = [seedItemList[j], seedItemList[x]];
		}
		
		seedItemList.forEach((element) => {
			this.listContainer.itemList.push(element);
			Dom.appendItem(this.listContainer.itemList);
		});
		
		console.log(this.listContainer);
   
	}
	
	autoGenerate() {
		let power = document.getElementById('autoGenerator').value; 
				
		document.getElementById('autoGenerateValue').textContent = Math.pow(10, power);
	}
	
	
	
	
}