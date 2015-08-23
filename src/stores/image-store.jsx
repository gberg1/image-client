var Reflux = require('reflux');
var Api = require('../utils/api');
var ImageActions = require('../actions/image-actions');
var _ = require('lodash');

var ImageStore = Reflux.createStore({
  listenables: [ImageActions],
  getImages: function(topicId) {
    Api.get('topics/' + topicId)
      .then(function(json) {
        this.images = _.reject(json.data, function(image) {
          return image.is_album;
        });
        this.triggerChange();
      }.bind(this));
  },
  triggerChange: function() {
    this.trigger('change', this.images);
  }
});

module.exports = ImageStore;

