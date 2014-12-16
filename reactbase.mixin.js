define(['underscore'], function (_) {
	return ReactBase = {
		eventListeners: [],
		componentWillMount: function () {
			if (this.initialize) {
				this.initialize();
			}

			if (this.beforeRender) {
				this.beforeRender();
			}
		},
		listenTo: function (events, model, callback) {
			if (_.isFunction(callback)) {
				this.eventListeners.push([events, model, callback]);
			} else {
				this.eventListeners.push([events, model]);
			}
		},
		componentDidMount: function () {
			var that = this;

			if (this.initialize) {
				_.each(this.eventListeners, function (listen) {
					if (listen.length > 1) {
						var events = listen[0],
							model = listen[1],
							handler = listen[2];

						if (listen.length === 3) {
							model && model.on(events, handler, that);
						} else {
							model && model.on(events, that._renderComp, that);
						}
					}
				});
			}

			if (this.afterRender) {
				this.afterRender();
			}
		},
		componentWillUnmount: function () {
			var that = this;

			if (this.initialize) {
				_.each(this.eventListeners, function (listen) {
					if (listen.length > 1) {
						var events = listen[0],
							model = listen[1],
							handler = listen[2];

						if (listen.length === 3) {
							model && model.off(events, handler, that);
						} else {
							model && model.off(events, that._renderComp, that);
						}
					}
				});
			}
		},
		_renderComp: function () {
			var that = this;

			if (this.beforeRender) {
				this.beforeRender();
			}

			if (this.isMounted()) {
				this.forceUpdate(function () {
					if (that.afterRender) {
						that.afterRender();
					}
				});
			}
		}
	};

});
