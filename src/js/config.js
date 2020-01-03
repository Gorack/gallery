function GalleryConfig() {

}

GalleryConfig.prototype = {

	config: {
		lightboxAnimationDurationMS: 300,
		infinityLightbox: true,
	},

	privateConfig: {
		prefix: 'grck-',

		get activeClassName() {
			return this.prefix + 'active';
		},

		get nextItemClassName() {
			return this.prefix + 'next-gallery-item';
		},

		get prevItemClassName() {
			return this.prefix + 'prev-gallery-item';
		},

		get lightboxItemClassName() {
			return this.prefix + 'lightbox-item';
		},

		// selectors
		get itemSelector() {
			return '.' + this.prefix + 'gallery-item';
		},

		get activeItemSelector() {
			return '.' + this.activeClassName;
		},

		get nextItemSelector() {
			return '.' + this.nextItemClassName;
		},

		get prevItemSelector() {
			return '.' + this.prevItemClassName;
		},

		get containerSelector() {
			return '.' + this.prefix + 'gallery-container';
		},

		get lightboxContainerSelector() {
			return '.' + this.prefix + 'lightbox-container';
		},

		get lightboxItemSelector() {
			return '.' + this.lightboxItemClassName;
		},

		// templates
		get lightboxTemplate() {
			return '<div class="' + this.prefix + 'lightbox-wrapper">' +
				'	<div class="' + this.prefix + 'lightbox-backdrop"></div>' +
				'	<div class="' + this.prefix + 'lightbox-container"></div>' +
				'	<div class="' + this.prefix + 'lightbox-navigation">' +
				'		<div class="' + this.prefix + 'lightbox-navigation__back">' +
				'			<a href="#"><i class="fa fa-arrow-left"></i></a>' +
				'		</div>' +
				'		<div class="' + this.prefix + 'lightbox-navigation__next">' +
				'			<a href="#"><i class="fa fa-arrow-right"></i></a>' +
				'		</div>' +
				'	</div>' +
				'</div>';
		},
	}

};

module.exports = (new GalleryConfig());
