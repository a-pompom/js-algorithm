let app = (() => {

    let itemList = [];
    // 半角数値のみを入力として受け付ける
    let isNumberReg = /^[1-9]+|0$/;

    let matched = false;

    // イベント
    function addButtonClick() {
        clearErrorMessage();
        addItem();
    }
    function searchButtonClick() {
        // styleをクリアする処理が必要
        clearErrorMessage();
        searchItem();
    }
    function generateButtonClick() {
        clearErrorMessage();
        generateItem();
    }
    // end イベント


    // メソッド
    /**
     * 入力値をリストへ追加
     * バリデーション処理が通ったもの(数値かつユニーク)を登録
     */
    function addItem() {
        // 入力値
        let addValue = document.getElementById('itemAddInput').value;
        
        //バリデーション
        if (!validateNumericInput(addValue)) {
            return;
        }
        if (!validateDupulicateInput(addValue)) {
            return;
        }

        itemList.push(parseInt(addValue));
        appendItemDOM();

        //連続で入力することを想定しているので、毎回入力部はクリア
        document.getElementById('itemAddInput').value = "";
    }

    /**
     * 探索要素を自動生成する
     * ・生成個数...何個要素を生成するか
     * ・生成範囲...1から生成範囲までの数値をランダムに生成
     */
    function generateItem() {
        // 生成個数
        let generateCount = document.getElementById('generateCount').value
        // 生成範囲
        let generateRange = document.getElementById('generateRange').value;

        // 数値か
        if (!validateNumericInput(generateCount) || !validateNumericInput(generateRange)) {
            return;
        }
        generateCount = ParseInt(generateCount);
        generateRange = ParseInt(generateRange);

        // 生成個数が生成範囲より十分に小さいか
        if (!validateGenerateCountLtRange()) {
            return;
        }

        // ランダムに探索要素を生成
        for (let i = 0; i < generateCount; i++) {
            let generatedValue = Math.floor(Math.random() * generateRange) + 1;

            while(itemList.includes(generatedValue)) {
                generatedValue = Math.floor(Math.random() * generateRange) + 1;
            }
            itemList.push(generatedValue);
            appendItemDOM();
        }
        
    }

    /**
     * リストのHTMLを追加された配列要素で更新
     */
    function appendItemDOM() {
        // リストDOM
        let itemListDOM = document.getElementById('itemList');

        // liに固有のidを付与したul要素へ追加
        let newItemDOM = document.createElement('li');
        newItemDOM.setAttribute('id', 'item-' + (itemList.length -1));

        let newItem = itemList[itemList.length -1];
        newItemDOM.textContent = newItem;

        itemListDOM.appendChild(newItemDOM);
    }

    /**
     * リストを線形探索する
     */
    function searchItem() {
        // 探索要素
        let target = document.getElementById('searchText').value;
        //バリデーション
        if (!validateNumericInput(target)) {
            return;
        }
        target = parseInt(target);

        // リストを探索し、ヒットするまでは文字色をグレーにし、ヒットしたら該当文字色を赤にして
        // 以降の処理は全てスキップ
        itemList.forEach((element, index) => {
            // 該当要素が存在するか
            if (element === target) {
                document.getElementById('item-' + index).setAttribute('class', 'targetItem');
                matched = true;
                return;
            }
            // マッチするまでは線形探索を続ける
            if (!matched) {
                document.getElementById('item-' + index).setAttribute('class', 'searchedItem');
            }
            
        });
    }

    // バリデーション処理
    /**
     * 入力値が数値か判定
     * @param {String} value 入力値
     * @returns 数値→true 数値でない→false
     */
    function validateNumericInput(value) {
        if (!isNumberReg.test(value)) {
            setErrorMessage('数値を入力してください');
            return false;
        }
        return true;
    }
    /**
     * 入力値が既にリストに登録済みか判定
     * @param {String} value 入力値
     * @returns リストに存在しない→true 既に存在→false
     */
    function validateDupulicateInput(value) {
        if (itemList.includes(value)) {
            setErrorMessage('その値は既に登録されています');
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
    function validateGenerateCountLtRange(generateCount, generateRange) {
        if (generateCount * 1.5 > generateRange) {
            setErrorMessage('生成個数が多すぎます');
            return false;
        }
        return true;
    }

    // エラーメッセージ処理
    /**
     * エラーメッセージを設定
     * @param {String} message 表示するエラーメッセージ
     */
    function setErrorMessage(message) {
        document.getElementById('errorMessageText').textContent = message;
    }
    /**
     * エラーメッセージをクリア
     */
    function clearErrorMessage() {
        document.getElementById('errorMessageText').textContent = "";
    }

    
    // 公開する処理を返却
    return {
        /**
         * 初期処理としてボタンクリックイベントを設定
         */
        init() {
            document.getElementById('addButton').addEventListener('click', addButtonClick);
            document.getElementById('searchButton').addEventListener('click', searchButtonClick);
            document.getElementById('generateButton').addEventListener('click', generateButtonClick);
        }

    }
})();

//ボタンクリックイベントを設定
app.init();