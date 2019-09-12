/**
 * バリデーション処理を行う為のクラス
 * 他でも再利用できるよう条件に合致するか否かのbool値のみを返す処理とする
 */
export default class Validator {

	/**
	 * 入力値が数値か判定
	 * @param {String} value 入力値
	 * @returns 数値→true 数値でない→false
	 */
	static validateNumericInput(value) {
		let isNumberReg = /^[1-9]+|0$/;
		if (!isNumberReg.test(value)) {
			return false;
		}
		return true;
	}
	/**
	 * 入力値が既にリストに登録済みか判定
	 * @param {String} value 入力値
	 * @param {Array} targetList 探索対象のリスト
	 * @returns リストに存在しない→true 既に存在→false
	 */
	static validateDupulicateInput(value, targetList) {
		if (targetList.includes(value)) {
			return false;
		}
		return true;
	}
}