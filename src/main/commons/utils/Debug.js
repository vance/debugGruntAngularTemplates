(function(_timing) {
    'use strict';

    window.now = (window.performance && window.performance.now ? function() {
        return window.performance.now();
    } : function() {
        return new Date();
    });

    window.Debug = {

        logging: true,
        mPulseTimer: {},
        mPulseTags: {
            //for those start with 'pages.load.', Debug.time() is called in RouteMediator
            // 'pages.load.userLogin':                     'Shop Buy User Login',
            // 'pages.load.salesRepDashboard':             'Shop Buy Sales Rep Dashboard', //deprecate
            // 'pages.load.salesRepLandingPage':           'Shop Buy Sales Rep Landing',
            // 'pages.load.salesRepRetailerAllOrders':     'Shop Buy Sales Rep Retailer All Orders',
            // 'pages.load.retailerAllOrders':             'Shop Buy Retailer All Orders',
            // 'pages.load.unsubmittedOrders':             'Shop Buy Unsubmitted Orders',  //deprecate
            // 'pages.load.retailerDashboard':             'Shop Buy Retailer Dashboard',
            // 'pages.load.assortmentDetail':              'Shop Buy Assortment Detail',
            // 'pages.load.assortmentAddMoreProducts':     'Shop Buy Assortment Add More Products',
            // 'pages.load.orderReview':                   'Shop Buy Order Review',
            // 'pages.load.reviewTotals':                  'Shop Buy Review Totals',
            // 'pages.load.orderConfirmation':             'Shop Buy Order Confirmation', 
            // 'pages.load.timeout':                       'Shop Buy Timeout',
            // 'pages.load.no-assortments':                'Shop Buy No Assortment',
            // 'events.createNewOrder':                    'Shop Buy Create New Order',
            // 'events.addCRD':                            'Shop Buy Add CRD',
            // 'events.moveCRD':                           'Shop Buy Move CRD',
            // 'events.deleteCRD':                         'Shop Buy Delete CRD',
            // 'events.download.quantity':                 'Shop Buy Download Quantity Excel File', 
            // 'events.upload.quantity':                   'Shop Buy Upload Quantity Excel File' 
        },

        /**
         *  Use Debug.log instead of console.log, so we can turn off app-wide logging easily
         *  Credit: http://patik.com/blog/complete-cross-browser-console-log/
         */
        log: function() {
            if (!this.logging) {
                return;
            }

            // Tell IE9 to use its built-in console
            if (Function.prototype.bind &&
                (typeof console === 'object' || typeof console === 'function') &&
                (typeof console.log === 'object')) {

                ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd']
                    .forEach(function(method) {
                        console[method] = this.call(console[method], console);
                    }, Function.prototype.bind);

            }
            // Modern browsers
            if (typeof console !== 'undefined' && typeof console.log === 'function') {

                // Opera 11
                if (window.opera) {
                    var i = 0;
                    while (i < arguments.length) {
                        console.log('Item ' + (i + 1) + ': ' + arguments[i]);
                        i++;
                    }
                } else {
                    var app_console = _.bind(console.log, console);
                    app_console.apply(console, arguments);
                }
            }
        },

        error: function() {
            if (!this.logging) {
                return;
            }

            // Tell IE9 to use its built-in console
            if (Function.prototype.bind &&
                (typeof console === 'object' || typeof console === 'function') &&
                (typeof console.log === 'object')) {

                ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd']
                    .forEach(function(method) {
                        console[method] = this.call(console[method], console);
                    }, Function.prototype.bind);

            }
            // Modern browsers
            if (typeof console !== 'undefined' && typeof console.log === 'function') {

                // Opera 11
                if (window.opera) {
                    var i = 0;
                    while (i < arguments.length) {
                        console.log('Item ' + (i + 1) + ': ' + arguments[i]);
                        i++;
                    }
                } else {
                    var app_console = _.bind(console.error, console);
                    app_console.apply(console, arguments);
                }
            }
        },

        tracking: {},

        track: function(log, id) {
            if (!this.tracking.hasOwnProperty(id)) {
                return;
            }

            var arr = [];
            for (var i = 0; i < arguments.length; i++) {
                arr.push(this.pp(arguments[i]));
            }
            this.log.apply(this, arr);
        },

        tracingEnabled: true,

        tracing: [],

        trace: function(source, action, data) {
            if (this.tracingEnabled) {
                this.tracing.push({
                    source: source || '',
                    action: action || '',
                    data: data || ''
                });
            }
        },

        /**
         * Basic timing operations.
         *
         * We can start to instrument different parts of the app.
         * and create graphs with performance related points.
         */
        timingEnabled: false,

        timing: [],

        /**
         * Used to measure the time spent executing an operation.
         */
        time: function(id) {
            if (this.timingEnabled) {
                var item = _.where(_timing, {
                    id: id
                })[0];

                if (!item) {
                    _timing.push({
                        id: id,
                        timeStamp: now()
                    });
                } else {
                    item.timeStamp = now();
                }
            }
            // if ((typeof BOOMR !== 'undefined') && (this.mPulseTags[id])) {
            //     //Debug.log('RUM_Start', id, this.mPulseTags[id], Math.round(now())/1000);
            //     // this.mPulseTimer[id] = BOOMR.requestStart(this.mPulseTags[id]);
            // }
        },

        /**
         * Marks the end of a measurement.
         */
        timeEnd: function(id) {
            if (this.timingEnabled) {
                var item = _.where(_timing, {
                    id: id
                })[0];

                if (item) {
                    var timeDiff = Math.round(now() - item.timeStamp);
                    var str = '[timing] ' + id + ' ' + timeDiff + 'ms';

                    var timing = {
                        id: id,
                        timestamp: item.timeStamp,
                        lastTimeDiff: timeDiff,
                        highest: timeDiff
                    };

                    var existing = _.clone(_.findWhere(this.timing, {
                        id: id
                    }));

                    if (existing) {
                        timing.highest = existing.highest > timing.highest ? existing.highest : timing.highest;
                        existing = timing;
                    } else {
                        this.timing.push(timing);
                    }

                    this.log(str);
                }
            }
            if (this.mPulseTimer[id]) {
                //Debug.log("RUM_End", id, this.mPulseTags[id], Math.round(now())/1000);
                this.mPulseTimer[id].loaded();
                delete this.mPulseTimer[id];
            }
        },

        pp: function(json) {
            return JSON.stringify(json, undefined, 2);
        },

        // printSizerun: function(criteria) {
        //     var sizeruns = require('models/DataStoreModel').attributes.sizeruns;
        //     if (!criteria) {
        //         return this.log(JSON.stringify(sizeruns.toJSON(), undefined, 2));
        //     }

        //     var run = sizeruns.where({
        //         'productEngine': 'EQMT'
        //     })[0];
        //     this.log(JSON.stringify(run.toJSON(), undefined, 2));
        // },

        // printProduct: function(criteria) {
        //     var products = [];
        //     var workspaces = require('models/DataStoreModel').attributes.workspaces;
        //     workspaces.each(function(space) {
        //         var assortments = space.attributes.assortments;
        //         assortments.each(function(assort) {
        //             var p;
        //             if (criteria) {
        //                 p = assort.attributes.products.where(criteria);
        //             } else {
        //                 p = assort.attributes.products.toArray();
        //             }

        //             for (var i in p) {
        //                 products.push(p[i].toJSON());
        //             }
        //         });
        //     });

        //     this.log(JSON.stringify(products, undefined, 2));
        // },

        // printCrdProduct: function(criteria) {
        //     var products = [];
        //     var workspace = require('models/DataStoreModel').attributes.selectedWorkspace;

        //     var assortments = workspace.attributes.assortments.toArray();

        //     var filterByCriteria = function(elem) {
        //         var i = elem.get('productInfo'),
        //             t = true;
        //         for (var a in criteria) {
        //             if (i[a] !== criteria[a]) {
        //                 t = false;
        //             }
        //         }
        //         return t;
        //     };

        //     for (var a in assortments) {
        //         var crds = assortments[a].attributes.customerRequestDates.toArray();
        //         for (var c in crds) {
        //             var p;
        //             if (criteria) {
        //                 p = crds[c].attributes.crdProducts;
        //                 p = p.filter(filterByCriteria);
        //             } else {
        //                 p = crds[c].attributes.crdProducts.toArray();
        //             }
        //             prod = crds[c].attributes.crdProducts;
        //             for (var i in p) {
        //                 var aCrdProduct = p[i].toJSON();
        //                 aCrdProduct.crd = aCrdProduct.crd.attributes.crd;
        //                 products.push(aCrdProduct);
        //             }
        //         }
        //     }
        //     this.log(JSON.stringify(products, undefined, 2));
        // },

        //
        //
        // SERVICE CALL
        //
        //

        printServiceCallRequest: function(args) {
            this.log('\nSERVICES MANAGER - Sending request ', args.request.method, args.request.url);
            if (args.request.payload) {
                this.log(args.request.payload);
            }
        },

        printServiceCallResponse: function(args) {
            this.log('\nSERVICES MANAGER - Received',
                args.response.statusCode + ' ' + args.response.statusText,
                'for request',
                this.prettyPrintSize(args.response.headers['Content-Length']),
                args.request.method,
                args.request.url);

            if (args.response.parsedBody) {
                this.log(args.response.parsedBody);
            }
        },

        prettyPrintSize: function(size) {
            var suffix = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'],
                tier = 0;

            while (size >= 1024) {
                size = size / 1024;
                tier++;
            }

            return Math.round(size * 10) / 10 + ' ' + suffix[tier];
        },

        parseResponseHeaders: function(headerStr) {
            var headers = {};
            if (!headerStr) {
                return headers;
            }
            var headerPairs = headerStr.split('\u000d\u000a');
            for (var i = 0; i < headerPairs.length; i++) {
                var headerPair = headerPairs[i];
                // Can't use split() here because it does the wrong thing
                // if the header value has the string ': ' in it.
                var index = headerPair.indexOf('\u003a\u0020');
                if (index > 0) {
                    var key = headerPair.substring(0, index);
                    var val = headerPair.substring(index + 2);
                    headers[key] = val;
                }
            }

            return headers;
        },

        //
        //
        // DEBUGGER
        //
        //

        showDebugger: function() {
            app.$globalScope.$broadcast('showDebugger');
        }

    };

}([]));