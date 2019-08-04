let app = (() => {

    let itemList = [];
    let isNumberReg = /^[1-9]*|0$/;

    function addButtonClick() {
        clearErrorMessage();
        addItem();
    }

    function addItem() {
        let addValue = parseInt(document.getElementById('itemAddInput').value);
        let re = isNumberReg;
        if (!isNumberReg.test(addValue)) {
            setErrorMessage('数値を入力してください');
            return;
        }
        if (isDupulicate(addValue)) {
            setErrorMessage('その値は既に登録されています');
            return;
        }

        
        itemList.push(addValue);
        appendItemDOM();

        document.getElementById('itemAddInput').value = "";
    }

    function isDupulicate(addValue) {
        return itemList.includes(addValue);
    }

    function appendItemDOM() {
        let itemListDOM = document.getElementById('itemList');

        let newItemDOM = document.createElement('li');
        let newItem = itemList[itemList.length -1];
        newItemDOM.textContent = newItem;

        itemListDOM.appendChild(newItemDOM);
        console.log('add item');
        console.log(itemList);
    }

    function setErrorMessage(message) {
        document.getElementById('errorMessageText').textContent = message;
    }
    function clearErrorMessage() {
        document.getElementById('errorMessageText').textContent = "";
    }

    return {

        init() {
            document.getElementById('addButton').addEventListener('click', addButtonClick);
            document.getElementById('searchButton').addEventListener('click', (event) =>{
                console.log('searchutton Clicked');
            });
        }

    }
})();

app.init();