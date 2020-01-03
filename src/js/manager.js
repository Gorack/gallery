var Gallery = require('./gallery');

function GalleryManager(config) {
	this.config = config;

	this.init();
}

GalleryManager.prototype = {

	/**
	 * Gallery module configs
	 */
	config: {},

	/**
	 * Gallery instances
	 *
	 * @type {Gallery[]}
	 */
	instances: [],

	init: function () {
		var self = this;

		document.querySelectorAll(this.config.containerSelector).forEach(function (containerElement) {
			window.galleryInstances = window.galleryInstances || [];

			window.galleryInstances.push(new Gallery(containerElement, self.config));
		});

		this.instances = window.galleryInstances;
	}

};

module.exports = GalleryManager;
