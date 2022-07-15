$.featherlight.prototype.afterContent = function() {
            //console.log(this);
            this.$legend = $('<div class="legend"/>').insertAfter(this.$content);
            this.$legend.text(this.$currentTarget.attr('caption'));
        };

$('div.gallery').featherlightGallery({
        afterContent: function() {
            //console.log(this);
            this.$legend = this.$legend || $('<div class="legend"/>').insertAfter(this.$content);
            this.$legend.text(this.$currentTarget.attr('caption'));
        }
});
