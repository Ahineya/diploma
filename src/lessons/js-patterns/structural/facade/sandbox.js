const module = (function() {

    const _private = {
        i: 5,
        get: function() {
            sandbox.log( "current value:" + this.i);
        },
        set: function( val ) {
            this.i = val;
        },
        run: function() {
            sandbox.log( "running" );
        },
        jump: function(){
            sandbox.log( "jumping" );
        }
    };

    return {
        facade: function( args ) {
            _private.set(args.val);
            _private.get();
            if ( args.run ) {
                _private.run();
            }
        }
    };
}());

module.facade( {run: true, val: 10} );
