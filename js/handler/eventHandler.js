/**
* 各イベントハンドラの基底クラス
* リストコンテナと基本イベントを設定し、サブクラスから渡されたイベントを登録する
*
*/
export default class EventHandler {
	
	constructor(listContainer, defaultEvent) {
		
		this.listContainer = listContainer;
		
		this.defaultEvent = defaultEvent;
		
	}
	
	/**
	 * イベントをdocumentオブジェクトに登録する
	 * @param {Array} eventList イベントトリガーのリスト
	 * @param {String} eventType イベントの種類
	 * @param {Array} funcList  イベントトリガー時に実行される処理を格納したリスト
	 */
	registerEvent(eventList, eventType, funcList) {
		
		eventList.forEach((trigger, index) => {
			// addEventListenerはメソッドなので、bindでthisを束縛しておく	
			document.getElementById(trigger)
				.addEventListener(eventType, funcList[index].bind(this));
		});

	}
}