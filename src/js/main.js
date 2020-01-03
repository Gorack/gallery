var galleryConfig = require('src/js/config');
var GalleryManager = require('src/js/manager');
require('src/scss/main.js.scss');

function GalleryInit(config) {

	config = config || {};

	config = Object.assign(galleryConfig, config);

	this.galleryManager = new GalleryManager(config);
}

new GalleryInit();
