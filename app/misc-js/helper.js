define([], function() {
    function getRomanNumerals(n) {
        return helper.getRomanNumerals(n);
    };

    var helper = {
        list: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
                'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
                'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX'],

        getRomanNumerals: function(number) {
            return this.list[(number - 1)];
        },

        init: function() {
            window["helper"] = this;
            log("Helper init.");
        }
    };

    return helper.init();
});
