React Component Mixin
=====================

Organize your React components similar to how layout manager does.

### Currently available functions are ###

* initialize
* listenTo (Custom Callbacks)
* beforeRender
* afterRender

### How to use this ? ###
``` javascript
/** @jsx React.DOM */

define(
	[
		'underscore',
		'react',
		'reactbase.mixin'
	],
	function(
		_,
		React,
		ReactBase
	) {
		var HottestComponentOnEarth = React.createClass({
			mixins: [ReactBase],
			initialize: function() {
				// dump all your event bindings here (dont worry they will unbind on unmount)
				this.listenTo('sync', this.props.model);

				// by default beforeRender and afterRender are called on event trigger but you can override that by using callback
				this.listenTo('error', this.props.model, this.error);
			},
			beforeRender: function() {
				// add before render logic here
			},
			afterRender: function() {
				// add after render logic here
			},
			render: function() {
				// render works exactly the same way
			},
			error: function () {
				// your custom functions
			}
		});

		return HottestComponentOnEarth;
	}
);
```
