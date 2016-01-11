define([], function() {
    var sidebar = {
        trigged: false,

        show: function() {
            if (this.trigged) {
                $(".sidebar").css('transform', 'translate3d(-100%, 0, 0)');
                $(".pushed").css({
                    'opacity': '1',
                    'transform': 'translate3d(0%, 0, 0)'
                });
                $(".pushed").attr("class", "pushed");
                $("#game-content").attr('onclick', '');
                this.trigged = false;
            } else {
                $(".sidebar").css('transform', 'translate3d(0%, 0, 0)');
                $(".pushed").css({
                    'opacity': '0.30',
                    'transform': 'translate3d(290px, 0, 0)'
                });
                $(".pushed").attr("class", "pushed active");
                $("#game-content").attr('onclick', 'sidebar.show();');
                this.trigged = true;
            }
        },

        init: function() {
            $("#navbar-sidebarmenu, #sidebar-close").on('click', function() {
                sidebar.show();
            });
            window["sidebar"] = sidebar;
            log("Sidebar init.");
        }
    }

    return sidebar.init();
});
