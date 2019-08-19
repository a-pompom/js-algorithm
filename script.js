import Validator from './validator.js';
import DomManipulator from './domManipulator.js';

let app = (() => {
    
    let itemList = [];

    let validator;

    let dom;

    let matched = false;

    // イベント
    // ループの中で動的に呼び出せるようコンテキストオブジェクトの中に格納
    let buttonContext = {
        // 追加
        addButtonClick() {
            clear();
            addItem();
        },
        // 探索
        searchButtonClick() {
            clear();
            searchItem();
        },
        // 生成
        generateButtonClick() {
            clear();
            generateItem();
        },
        // 削除
        deleteButtonClick() {
            clear();
            deleteElement();
        },
        // クリア
        clearButtonClick() {
            clear();
        }
    };
    
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
        if (!validator.validateNumericInput(addValue)) {
            setErrorMessage('数値を入力してください');
            return;
        }
        addValue = parseInt(addValue);

        if (!validator.validateDupulicateInput(addValue, itemList)) {
            setErrorMessage('その値は既に登録されています');
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
        if (!validator.validateNumericInput(generateCount) || !validator.validateNumericInput(generateRange)) {
            setErrorMessage('数値を入力してください');
            return;
        }
        generateCount = parseInt(generateCount);
        generateRange = parseInt(generateRange);

        // 生成個数が生成範囲より十分に小さいか
        if (!validator.validateGenerateCountLtRange()) {
            setErrorMessage('生成個数が多すぎます');
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
        let itemListDOMId = 'itemList';

        // 探索要素のulにliを追加し、個々の要素に識別要素としてidを設定
        let option = {
            textContent: itemList[itemList.length -1],
            element: 'li',
            attributeName: 'id',
            attributeValue: 'item-' + (itemList.length -1),
            appendTargetId: itemListDOMId
        };

        dom.appendNewElement(option);
    }

    /**
     * リストを線形探索する
     */
    function searchItem() {
        // 探索要素
        let target = document.getElementById('searchText').value;
        //バリデーション
        if (!validator.validateNumericInput(target)) {
            return;
        }
        target = parseInt(target);

        // リストを探索し、ヒットするまでは文字色をグレーにし、ヒットしたら該当文字色を赤にして
        // 以降の処理は全てスキップ
        itemList.forEach((element, index) => {
            // 該当要素が存在するか
            if (element === target) {
                dom.setClass('item-' + index, 'targetItem');
                matched = true;
                return;
            }
            // マッチするまでは線形探索を続ける
            if (!matched) {
                dom.setClass('item-' + index, 'searchedItem');
            }
            
        });
    }

    // バリデーション処理
    
    // エラーメッセージ処理
    /**
     * エラーメッセージを設定
     * @param {String} message 表示するエラーメッセージ
     */
    function setErrorMessage(message) {
        dom.setMessage('errorMessageText', message);
    }
    /**
     * エラーメッセージをクリア
     */
    function clearErrorMessage() {
        dom.clearMessage('errorMessageText');
    }

    /**
     * 要素に割り当てられたスタイルを初期化
     */
    function clearStyleClass() {

        itemList.forEach((element, index) => {
            dom.removeStyleClass('item-' + index, 'targetItem');
            dom.removeStyleClass('item-' + index, 'searchedItem');
        });
    }

    /**
     * 再探索ができるようボタンクリックで毎回探索結果をクリア
     */
    function clear() {
        clearErrorMessage();
        clearStyleClass();
        matched = false;
    }

    function deleteElement() {
        itemList.forEach((element, index) => {
            document.getElementById('item-' + index).remove();
        });
        itemList = [];
    }

    // 公開する処理を返却
    return {
        /**
         * 初期処理としてボタンクリックイベントを設定
         */
        init() {
            // 各ボタンクリック時のイベント設定
            let eventList = ['add', 'search', 'generate', 'delete', 'clear'];
            let eventType = 'click';

            eventList.forEach((element) => {
                let funcName = element + 'ButtonClick';
                
                // 各イベントの関数はボタンコンテキストのオブジェクトのプロパティとして格納されているので、
                // 文字列形式で呼び出すことができる
                document.getElementById(element + 'Button').addEventListener(eventType, buttonContext[funcName]);
            });

            validator = new Validator();
            dom = new DomManipulator();
        }

    }
})();

//ボタンクリックイベントを設定
app.init();