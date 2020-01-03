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
	},

	/**
	 * Convert gallery item element to lightbox item
	 *
	 * @param {HTMLElement} item
	 * @param {Object} config
	 * @return {HTMLElement}
	 */
	galleryItemToLightBoxItem: function (item, config) {
		var data = item._gallery;
		var element = item.cloneNode(true);

		element.classList.remove(config.itemSelector.replace('.', ''));

		element.classList.add(config.prefix + 'lightbox-item');

		element._gallery = data;

		return element;
	}
};
