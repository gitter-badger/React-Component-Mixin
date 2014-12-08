define(['underscore'], function (_) {
	return ReactBase = {
		eventListeners: [],
		componentWillMount: function () {
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
				this.initialize();
				_.each(this.eventListeners, function (listen) {
					if (listen.length > 1) {
						var events = listen[0];

						if (listen.length === 3) {
							listen[1].on(events, listen[2], that);
						} else {
							listen[1].on(events, that._renderComp, that);
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
				this.initialize();
				_.each(this.eventListeners, function (listen) {
					if (listen.length > 1) {
						var events = listen[0];

						if (listen.length === 3) {
							listen[1].off(events, listen[2], that);
						} else {
							listen[1].off(events, that._renderComp, that);
						}
					}
				});
			}
		},
		_renderComp: function () {
			if (this.beforeRender) {
				this.beforeRender();
			}

			var that = this;
			this.forceUpdate(function () {
				if (that.afterRender) {
					that.afterRender();
				}
			});
		}
	};

});

