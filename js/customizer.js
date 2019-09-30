/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

( function( $ ) {

	// Site title and description.
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title a' ).text( to );
		} );
	} );
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	} );

	// Header text color.
	wp.customize( 'header_textcolor', function( value ) {
		value.bind( function( to ) {
			if ( 'blank' === to ) {
				$( '.site-title, .site-description' ).css( {
					'clip': 'rect(1px, 1px, 1px, 1px)',
					'position': 'absolute'
				} );
			} else {
				$( '.site-title, .site-description' ).css( {
					'clip': 'auto',
					'position': 'relative'
				} );
				$( '.site-title a, .site-description' ).css( {
					'color': to
				} );
			}
		} );
	} );


	/* This section of the code registers a new block, sets an icon and a category, and indicates what type of fields it'll include. */
	 
	wp.blocks.registerBlockType('brad/border-box', {
	  title: 'Simple Box',
	  icon: 'smiley',
	  category: 'common',
	  attributes: {
	    content: {type: 'string'},
	    color: {type: 'string'}
	  },
	 
	/* This configures how the content and color fields will work, and sets up the necessary elements */
	 
	  edit: function(props) {
	    function updateContent(event) {
	      props.setAttributes({content: event.target.value})
	    }
	    function updateColor(value) {
	      props.setAttributes({color: value.hex})
	    }
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "h3",
	        null,
	        "Simple Box"
	      ),
	      React.createElement("input", { type: "text", value: props.attributes.content, onChange: updateContent }),
	      React.createElement(wp.components.ColorPicker, { color: props.attributes.color, onChangeComplete: updateColor })
	    );
	  },
	  save: function(props) {
	    return wp.element.createElement(
	      "h3",
	      { style: { border: "3px solid " + props.attributes.color } },
	      props.attributes.content
	    );
	  }
	})
	
} )( jQuery );
