var galleryConfig = require('./config');
var GalleryManager = require('./manager');
require('../scss/main.js.scss');

function GalleryInit(config) {

	config = config || {};

	config = Object.assign(galleryConfig.config, config);

	config = Object.assign(config, galleryConfig.privateConfig);

	this.galleryManager = new GalleryManager(config);
}

(function () {
	new GalleryInit();
})();
