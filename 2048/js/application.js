// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
	//在gamemanager.js里定义GameManager
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});
