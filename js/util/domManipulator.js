/**
 * DOM操作を簡易化するためのクラス
 * 状態は保持しないので、staticクラスとして扱う
 * 以下の機能を持つ
 * ・メッセージ・スタイルの操作
 * ・HTML要素の生成
 */
export default class DomManipulator {
	
	// 対象のDOM要素にテキストとしてメッセージを設定
	static setMessage(targetElement, message) {
		document.getElementById(targetElement).textContent = message;
	}
	// 対象のDOM要素に設定されたテキストを消去
	static clearMessage(targetElement) {
		document.getElementById(targetElement).textContent = "";
	}
	// 対象のDOM要素に付与されたクラスを消去
	static removeStyleClass(targetElement, targetClass) {
		document.getElementById(targetElement).classList.remove(targetClass);
	}
	// 対象のDOM要素のクラスを上書きする
	static setClass(targetElement, targetClass) {
		document.getElementById(targetElement).setAttribute('class', targetClass);
	}
	// 対象のDOM要素へクラスを追加する
	static addClass(targetElement, targetClass) {
		document.getElementById(targetElement).classList.add(targetClass);
	}

	/**
	 * 指定したDOM要素に新たに生成したHTML要素を挿入する
	 * @param {Object} option
	 * {
	 * 	textContent: 追加要素のテキスト
	 *  element: 追加要素のHTMLタグ
	 *  attributeName: 追加要素の属性名
	 *  attributeValue: 追加要素の属性値
	 *  appendTargetId: 追加した要素を格納するDOM要素
	 * } 
	 */
	static appendNewElement(option) {
		// 生成要素
		let newItemDOM = document.createElement(option.element);
		
		// 属性値
		if (option.attributeName !== "") {
			newItemDOM.setAttribute(option.attributeName, option.attributeValue);
		}
		newItemDOM.textContent = option.textContent;

		// DOMは基本的に既存のHTML要素に属するので、子要素として親要素配下へセット
		document.getElementById(option.appendTargetId).appendChild(newItemDOM);

	}
	
	/**
	 * リストのHTMLを追加された配列要素で更新
	 */
	static appendItem(itemList) {
		// リストDOM
		let itemListDOMId = 'itemList';
		let tailIndex = itemList.length -1;
		
		// 探索要素のulにliを追加し、個々の要素に識別要素としてidを設定
		let option = {
			textContent: itemList[tailIndex],
			element: 'li',
			attributeName: 'id',
			attributeValue: 'item-' + (tailIndex),

			appendTargetId: itemListDOMId // 挿入対象
		};
		
		this.appendNewElement(option);
	}
	
	
	
}