let app = (() => {

    let itemList = [];
    let isNumberReg = /^[1-9]+|0$/;

    function addButtonClick() {
        clearErrorMessage();
        addItem();
    }
    function searchButtonClick() {
        console.log('searchButton clicked');
        searchItem();
    }

    function addItem() {
        let addValue = document.getElementById('itemAddInput').value;
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
        newItemDOM.setAttribute('id', 'item-' + (itemList.length -1));
        let newItem = itemList[itemList.length -1];
        newItemDOM.textContent = newItem;

        itemListDOM.appendChild(newItemDOM);
    }

    function setErrorMessage(message) {
        document.getElementById('errorMessageText').textContent = message;
    }
    function clearErrorMessage() {
        document.getElementById('errorMessageText').textContent = "";
    }

    function searchItem() {
        console.log('searchItem called');
        let target = document.getElementById('searchText').value;

        itemList.forEach((element, index) => {
            if (element === target) {
                document.getElementById('item-' + index).setAttribute('class', 'targetItem');
                return;
            }
            document.getElementById('item-' + index).setAttribute('class', 'searchedItem');
        });
    }

    return {

        init() {
            document.getElementById('addButton').addEventListener('click', addButtonClick);
            document.getElementById('searchButton').addEventListener('click', searchButtonClick);
        }

    }
})();

app.init();