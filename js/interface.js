$(document).ready(function () {
  $('.tabs-control-link').on('click', function(e) {
    e.preventDefault();

    var item = $(this).closest('.tabs-controls-item');
    var contentItem = $('.tabs-item');
    var itemPosition = item.index();

    contentItem.eq(itemPosition).add(item).addClass('active').siblings().removeClass('active');
    // item.addClass('active').siblings().removeClass('active');
  })
});
