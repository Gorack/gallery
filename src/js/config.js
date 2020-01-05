function GalleryConfig() {

}

GalleryConfig.prototype = {

	config: {
		lightboxAnimationDurationMS: 300,
		infinityLightbox: true,
		showTooltip: true,
		showIndex: true,
		closeOnClickBackdrop: true,
		closeOnEsc: true
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

		get lightboxTooltipClassName() {
			return this.prefix + 'lightbox-tooltip';
		},

		get lightboxIndexClassName() {
			return this.prefix + 'lightbox-index';
		},

		get lightboxCloseClassName() {
			return this.prefix + 'lightbox-close';
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

		get lightboxTooltipSelector() {
			return '.' + this.lightboxTooltipClassName;
		},

		get lightboxIndexSelector() {
			return '.' + this.lightboxIndexClassName;
		},

		get lightboxCloseSelector() {
			return '.' + this.lightboxCloseClassName;
		},

		// templates
		get lightboxTemplate() {
			// tabindex allow keyboard events on the element
			return '<div class="' + this.prefix + 'lightbox-wrapper" tabindex="0">' +
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
					'	<div class="' + this.lightboxCloseClassName + '">' +
					'		<a href="#"><i class="fa fa-close"></i></a>' +
					'	</div>' +
					'	<div class="' + this.lightboxIndexClassName + '"></div>' +
					'	<div class="' + this.lightboxTooltipClassName + '"></div>' +
					'</div>';
		},
	}

};

module.exports = (new GalleryConfig());
