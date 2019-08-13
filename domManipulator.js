export default class DomManipulator {

	constructor() {
		
	}
	
	setMessage(targetElement, message) {
		document.getElementById(targetElement).textContent = message;
	}

	clearMessage(targetElement) {
		document.getElementById(targetElement).textContent = "";
	}

	removeStyleClass(targetElement, targetClass) {
		document.getElementById(targetElement).classList.remove(targetClass);
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

		let newItemDOM = document.createElement(option.element);
		
		if (option.attributeName !== "") {
			newItemDOM.setAttribute(option.attributeName, option.attributeValue);
		}
		newItemDOM.textContent = option.textContent;

		document.getElementById(option.appendTargetId).appendChild(newItemDOM);

	}
	
}