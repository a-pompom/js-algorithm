/**
 * DOM操作を簡易化するためのクラス
 * 以下の機能を持つ
 * ・メッセージ・スタイルの操作
 * ・HTML要素の生成
 */
export default class DomManipulator {

	constructor() {
		
	}
	
	// 対象のDOM要素にテキストとしてメッセージを設定
	setMessage(targetElement, message) {
		document.getElementById(targetElement).textContent = message;
	}
	// 対象のDOM要素に設定されたテキストを消去
	clearMessage(targetElement) {
		document.getElementById(targetElement).textContent = "";
	}
	// 対象のDOM要素に付与されたクラスを消去
	removeStyleClass(targetElement, targetClass) {
		document.getElementById(targetElement).classList.remove(targetClass);
	}
	// 対象のDOM要素のクラスを上書きする
	setClass(targetElement, targetClass) {
		document.getElementById(targetElement).setAttribute('class', targetClass);
	}
	// 対象のDOM要素へクラスを追加する
	addClass(targetElement, targetClass) {
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
	appendNewElement(option) {
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
	
}