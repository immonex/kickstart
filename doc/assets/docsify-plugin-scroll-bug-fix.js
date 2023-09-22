(function (win) {
	function create() {
		return function (hook, vm) {
			const threshold = 30;
			const delay = 50;
			let identical = 0;
			let lastDistanceToTop = 0;

			hook.doneEach(function () {
				const urlIdHash = win.location.hash.match(/\?id=(.*)$/);
				if (!urlIdHash) return;

				const urlId = urlIdHash[1]

				const element = win.document.getElementById(urlId);
				if (!element) return;

				(function poll() {
					var currentDistanceToTop = window.pageYOffset + element.getBoundingClientRect().top;

					if (lastDistanceToTop === currentDistanceToTop) identical++;

					lastDistanceToTop = currentDistanceToTop;

					if (identical > threshold) {
						element.scrollIntoView();
					} else {
						setTimeout(poll, delay);
					}
				})();
			});
		};
	}

	if (typeof win.$docsify === "object") {
		win.$docsify.plugins = [].concat(create(), $docsify.plugins);
	}
})(window);