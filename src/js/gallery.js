const Functions = require('./functions');

function Gallery(containerElement, config) {
	this.containerElement = containerElement;

	this.config = config;

	this.init();
}

Gallery.prototype = {

	config: {},

	activeItem: null,

	/**
	 * @type {HTMLElement}
	 */
	containerElement: null,

	/**
	 * @type {NodeListOf<Element>}
	 */
	items: null,

	/**
	 * Gallery init
	 */
	init: function () {

		this.items = this.containerElement.querySelectorAll(this.config.itemSelector);

		this.addEventListeners();
	},

	/**
	 * Add event listeners
	 */
	addEventListeners: function () {
		var self = this;

		this.items.forEach(function (itemElement, index) {
			itemElement._galleryIndex = index;

			itemElement.addEventListener('click', function (e) {
				self.createLightBox(this);
			})
		});
	},

	/**
	 * Create light box
	 *
	 * @param {HTMLElement} startItem
	 */
	createLightBox: function (startItem) {
		this.removeLightBoxElement();

		var self = this;
		var lightboxElement = Functions.toHtml(this.config.lightboxTemplate);

		this.activeItem = startItem;

		lightboxElement.querySelector('.lightbox-backdrop').addEventListener('click', function (e) {
			self.removeLightBoxElement();
		});

		lightboxElement.querySelector('.lightbox-navigation__back a').addEventListener('click', function (e) {
			e.preventDefault();

			self.lightboxNavigation('prev');
		});

		lightboxElement.querySelector('.lightbox-navigation__next a').addEventListener('click', function (e) {
			e.preventDefault();

			self.lightboxNavigation('next');
		});

		lightboxElement.querySelector('.lightbox-container').append(startItem.cloneNode(true));

		lightboxElement.querySelector('.lightbox-container').firstChild.classList.add('active');

		document.body.append(lightboxElement);

		setTimeout(function () {
			lightboxElement.classList.add('active');
		}, 0);
	},

	/**
	 * Remove lightbox element
	 */
	removeLightBoxElement: function () {
		var self = this;

		document.querySelectorAll('.lightbox-wrapper').forEach(function (element) {
			element.classList.remove('active');

			setTimeout(function () {
				element.remove();
			}, self.config.lightboxAnimationDurationMS);
		});
	},

	lightboxNavigation: function (direction) {
		direction = direction || 'next';

		var activeItemIndex = this.activeItem._galleryIndex;
		var targetItemIndex = (direction === 'next') ? (activeItemIndex + 1) : (activeItemIndex - 1);
		var lightboxContainer = document.querySelector('.lightbox-container');
		var nextItem;

		if (targetItemIndex in this.items) {
			nextItem = this.items[targetItemIndex];
		} else {

			if (this.config.infinityLightbox) {
				nextItem = (direction !== 'next') ? this.items[this.items.length - 1] : this.items[0];
			} else {
				return;
			}
		}

		this.activeItem = nextItem;

		lightboxContainer.firstChild.classList.remove('active');

		setTimeout(function () {

			lightboxContainer.firstChild.remove();

			lightboxContainer.append(nextItem.cloneNode(true));

			setTimeout(function () {
				lightboxContainer.firstChild.classList.add('active');
			}, 1000/60);

		}, this.config.lightboxAnimationDurationMS);
	}
};

module.exports = Gallery;
