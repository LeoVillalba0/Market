var Sidebar = {
  trigged: false,
  show: function() {
    if (this.trigged) {
      $(".sidebar").css('transform', 'translate3d(-100%, 0, 0)');
      $(".navbar").css('transform', 'translate3d(0%, 0, 0)');
      $(".pushed").css({
        'opacity': '1',
        'overflow-x': 'visible'
      });
      $(".pushed").removeAttr('onclick');
      this.trigged = false;
    } else {
      $(".sidebar").css('transform', 'translate3d(0%, 0, 0)');
      $(".navbar").css('transform', 'translate3d(290px, 0, 0)');
      $(".pushed").css({
        'opacity': '0.75',
        'overflow-x': 'hidden'
      });
      this.trigged = true;
    }
  }
};

$("#navbar-sidebar, #sidebar-close").on('click', function() {
  Sidebar.show();
});
