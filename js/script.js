import ListContainer from './listContainer.js';

// イベントハンドラ
import BasicEventHandler from './handler/basicEventHandler.js';
import InputHandler from './handler/inputHandler.js';
import AlgorithmHandler from './handler/algorithmHandler.js';

let app = (() => {

	// 公開する処理を返却
	return {
		/**
		 * 初期処理としてボタンクリックイベントを設定
		 */
		init() {
			
			let listContainer = new ListContainer();
			
			// イベントハンドラ
			let defaultEvent = new BasicEventHandler(listContainer);
			let inputHandler = new InputHandler(listContainer, defaultEvent);
			let algorithmHandler = new AlgorithmHandler(listContainer, defaultEvent);
		}
	}
})();

app.init();