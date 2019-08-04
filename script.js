let app = (() => {

    let itemList = [];
    let isNumberReg = /^[1-9]\d*|0$/g;

    function addItem() {
        let addValue = document.getElementById('itemAddInput').value;
        console.log(typeof addValue)
        if (!isNumberReg.test(addValue)) {
            setErrorMessage('数値を入力してください');
            return;
        }

        console.log(addValue);
        itemList.push(addValue);
        appendItemDOM();
    }

    function appendItemDOM() {
        let itemListDOM = document.getElementById('itemList');

        let newItemDOM = document.createElement('li');
        let newItem = itemList[itemList.length -1];
        newItemDOM.textContent = newItem;

        itemListDOM.appendChild(newItemDOM);
        
    }

    function setErrorMessage(message) {
        let errorDOM = document.createElement('p');
        errorDOM.textContent = message;

        document.getElementById('resultText').appendChild(errorDOM);
    }

    return {

        init() {
            document.getElementById('addButton').addEventListener('click', addItem);
            document.getElementById('searchButton').addEventListener('click', (event) =>{
                console.log('searchutton Clicked');
            });
        }

    }
})();

app.init();