
# Gallery

Javascript lightbox gallery plugin.

# Installation
Clone this repository.
Include CSS and Javascript files.

    
    <head>
	    <link rel="stylesheet" href="dist/css/main.css">
	</head>
    
	<body>
	    ...
	    
	    <script  src="dist/js/gallery.bundle.js"></script>
    </body>


## Call the plugin

    new GalleryInit(options);

# Options

### lightboxAnimationDurationMS: number (default: 300)
Lightbox animations duration.

### infinityLightbox: boolean (default: true)
Enable lightbox navigation loop.

### showTooltip: boolean (default: true)
Enable tooltips in lightbox.

 You can define data-title attribute on gallery-item element as tooltip html content.
 

    data-title="Tooltip <strong>html</strong> content"
### showIndex: boolean (default: true)
Enable gallery item index element in lightbox.
### closeOnClickBackdrop: boolean (default: true)
Close lightbox on click on lightbox backdrop.
### closeOnEsc: boolean (default: true)
Close lightbox on press Escape key,
