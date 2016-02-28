define([], function() {
    // this code is bad, made for personal use
    var requirecss = {
        load: function(url) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        },

        loadAll: function() {
            for (var key in this.toLoad) {
                var obj = this.toLoad[key];
                this.load(obj)
            };
        },

        init: function() {
            this.loadAll();
            window["requirecss"] = requirecss;

            log("Require-CSS init.");
        },

        toLoad: {
            /*'bootswatch': 'lib/bootswatch-dist/css/bootstrap.css',
            'font-awesome': 'lib/components-font-awesome/css/font-awesome.min.css',
            'ionicons': 'lib/Ionicons/css/ionicons.min.css',
            'interface': 'app/css/interface.css'*/
        }
    };

    return requirecss.init();
});
