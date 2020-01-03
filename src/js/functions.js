module.exports = {
	/**
	 * Convert string to html element
	 *
	 * @param string
	 * @returns {HTMLElement}
	 */
	toHtml: function (string) {
		var tmp = document.createElement('div');
		var element;

		tmp.innerHTML = string;

		element = tmp.firstChild;

		tmp.remove();

		return element;
	}
};
