function GalleryConfig() {

}

GalleryConfig.prototype = {

	config: {

		lightboxAnimationDurationMS: 300,
		infinityLightbox: true,

		// selectors
		itemSelector: '.gallery-item',
		containerSelector: '.gallery-container',

		// templates
		lightboxTemplate:
			'<div class="lightbox-wrapper">' +
			'	<div class="lightbox-backdrop"></div>' +
			'	<div class="lightbox-navigation">' +
			'		<div class="lightbox-navigation__back">' +
			'			<a href="#"><i class="fa fa-arrow-left"></i></a>' +
			'		</div>' +
			'		<div class="lightbox-navigation__next">' +
			'			<a href="#"><i class="fa fa-arrow-right"></i></a>' +
			'		</div>' +
			'	</div>' +
			'	<div class="lightbox-container"></div>' +
			'</div>'
	},
};

module.exports = (new GalleryConfig());
