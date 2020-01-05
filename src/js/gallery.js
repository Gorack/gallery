const Functions = require('./functions');

function Gallery(containerElement, config) {
	this.containerElement = containerElement;

	this.config = config;

	this.init();
}

Gallery.prototype = {

	_activeItem: null,

	config: {},

	get activeItem() {
		return this._activeItem;
	},

	set activeItem(value) {
		this._activeItem = value;

		this._insertTooltipContent(this._activeItem._gallery.tooltip);
	},

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
			itemElement._gallery = {
				index: index,
				tooltip: self._getItemTitle(itemElement)
			};

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

		startItem = Functions.galleryItemToLightBoxItem(startItem, this.config);

		lightboxElement.querySelector('.' + self.config.prefix + 'lightbox-backdrop').addEventListener('click', function (e) {
			self.removeLightBoxElement();
		});

		lightboxElement.querySelector('.' + self.config.prefix + 'lightbox-navigation__back a').addEventListener('click', function (e) {
			e.preventDefault();

			self.lightboxNavigation('prev');
		});

		lightboxElement.querySelector('.' + self.config.prefix + 'lightbox-navigation__next a').addEventListener('click', function (e) {
			e.preventDefault();

			self.lightboxNavigation('next');
		});

		this._insertTooltipContent(
			this._getItemTitle(startItem),
			lightboxElement.querySelector(this.config.lightboxTooltipSelector)
		);

		startItem.classList.add(this.config.activeClassName);

		startItem.addEventListener('click', function (e) {
			self._lightboxItemClickEvent.call(this, self, e);
		});

		this.activeItem = startItem;

		var lightboxContainer = lightboxElement.querySelector(this.config.lightboxContainerSelector);
		var prevItem = this._findPrevLightboxItem();
		var nextItem = this._findNextLightboxItem();

		if (prevItem) {
			lightboxContainer.append(prevItem);
		}

		lightboxContainer.append(startItem);

		if (nextItem) {
			lightboxContainer.append(nextItem);
		}

		// ADD LIGHTBOX ELEMENT TO DOM
		document.body.append(lightboxElement);

		setTimeout(function () {
			lightboxElement.classList.add(self.config.activeClassName);
		}, 0);
	},

	/**
	 * Remove lightbox element
	 */
	removeLightBoxElement: function () {
		var self = this;

		document.querySelectorAll('.' + this.config.prefix + 'lightbox-wrapper').forEach(function (element) {
			element.classList.remove(self.config.activeClassName);

			setTimeout(function () {
				element.remove();
			}, self.config.lightboxAnimationDurationMS);
		});
	},

	lightboxNavigation: function (direction) {
		direction = direction || 'next';

		var lightboxContainer = document.querySelector(this.config.lightboxContainerSelector);
		var prevItem = document.querySelector(this.config.lightboxItemSelector + this.config.prevItemSelector);
		var nextItem = document.querySelector(this.config.lightboxItemSelector + this.config.nextItemSelector);
		var activeItem = document.querySelector(this.config.lightboxItemSelector + this.config.activeItemSelector);

		switch (direction) {
			case 'next':

				activeItem.classList.remove(this.config.activeClassName);
				activeItem.classList.add(this.config.prevItemClassName);

				nextItem.classList.remove(this.config.nextItemClassName);
				nextItem.classList.add(this.config.activeClassName);

				prevItem.remove();

				this.activeItem = nextItem;

				var newNextItem = this._findNextLightboxItem();

				if (newNextItem) {
					lightboxContainer.append(newNextItem);
				}

				break;

			case 'prev':

				activeItem.classList.remove(this.config.activeClassName);
				activeItem.classList.add(this.config.nextItemClassName);

				prevItem.classList.remove(this.config.prevItemClassName);
				prevItem.classList.add(this.config.activeClassName);

				nextItem.remove();

				this.activeItem = prevItem;

				var newPrevItem = this._findPrevLightboxItem();

				if (newPrevItem) {
					lightboxContainer.insertBefore(newPrevItem, lightboxContainer.firstChild);
				}

				break;
		}
	},

	/**
	 * Find prev lightbox item
	 *
	 * @return {null}
	 * @private
	 */
	_findPrevLightboxItem: function () {
		var startItemIndex = this.activeItem._gallery.index;
		var lastItemIndex = this.items.length - 1;
		var prevItemIndex = startItemIndex - 1;
		var prevItem = null;
		var self = this;

		if (prevItemIndex < 0 && this.config.infinityLightbox) {
			prevItemIndex = lastItemIndex;
		}

		if (prevItemIndex > -1) {
			prevItem = Functions.galleryItemToLightBoxItem(this.items[prevItemIndex], this.config);
			prevItem.classList.add(this.config.prevItemClassName);

			prevItem.addEventListener('click', function (e) {
				self._lightboxItemClickEvent.call(this, self, e);
			});
		}

		return prevItem;
	},

	/**
	 * Find next lightbox item
	 *
	 * @return {null}
	 * @private
	 */
	_findNextLightboxItem: function () {
		var startItemIndex = this.activeItem._gallery.index;
		var lastItemIndex = this.items.length - 1;
		var nextItemIndex = startItemIndex + 1;
		var nextItem = null;
		var self = this;

		if (nextItemIndex > lastItemIndex && this.config.infinityLightbox) {
			nextItemIndex = 0;
		}

		if (nextItemIndex <= lastItemIndex) {
			nextItem = Functions.galleryItemToLightBoxItem(this.items[nextItemIndex], this.config);
			nextItem.classList.add(this.config.nextItemClassName);

			nextItem.addEventListener('click', function (e) {
				self._lightboxItemClickEvent.call(this, self, e);
			});
		}

		return nextItem;
	},

	/**
	 * Lightbox item click event
	 *
	 * @param {Gallery} self
	 * @param {MouseEvent} event
	 * @private
	 */
	_lightboxItemClickEvent: function (self, event) {
		var navDirection = null;

		if (this.classList.contains(self.config.prevItemClassName)) {
			navDirection = 'prev';
		}

		if (this.classList.contains(self.config.nextItemClassName)) {
			navDirection = 'next';
		}

		if (navDirection) {
			self.lightboxNavigation(navDirection);
		}
	},

	/**
	 * Insert lightbox tooltip content
	 *
	 * @param html
	 * @param lightboxTooltipElement
	 * @private
	 */
	_insertTooltipContent: function (html, lightboxTooltipElement) {

		if (!this.config.showTooltip) {
			return;
		}

		if (!lightboxTooltipElement) {
			lightboxTooltipElement = document.querySelector(this.config.lightboxTooltipSelector);
		}

		if (lightboxTooltipElement && html) {
			lightboxTooltipElement.innerHTML = html;
		}
	},

	/**
	 * Get gallery item data-title value
	 *
	 * @param {HTMLElement} item
	 * @return {string}
	 * @private
	 */
	_getItemTitle: function (item) {
		return ('title' in item.dataset) ? item.dataset.title : null;
	}
};

module.exports = Gallery;
