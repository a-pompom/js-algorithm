export default class Validator {

    constructor() {
    // 半角数値のみを入力として受け付ける
    this.isNumberReg = /^[1-9]+|0$/;
    }

    /**
     * 入力値が数値か判定
     * @param {String} value 入力値
     * @returns 数値→true 数値でない→false
     */
    validateNumericInput(value) {
        if (!this.isNumberReg.test(value)) {
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
    validateDupulicateInput(value, targetList) {
        if (targetList.includes(value)) {
            return false;
        }
        return true;
    }
    /**
     * 生成個数が生成範囲より十分に小さいか判定する
     * 生成個数が生成範囲に近い、もしくは超過している場合、ユニークな数を生成するために
     * 無限ループに陥ってしまうので、範囲チェックを行う
     * @param {Number} generateCount 生成個数
     * @param {Number} generateRange 生成範囲
     */
    validateGenerateCountLtRange(generateCount, generateRange) {
        if (generateCount * 1.5 > generateRange) {
            return false;
        }
        return true;
    }

}