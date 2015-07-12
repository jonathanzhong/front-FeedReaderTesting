/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
'use strict';
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
        * allFeeds variable has been defined and that it is not
        * empty. Experiment with this before you get started on
        * the rest of this project. What happens when you change
        * allFeeds in app.js to be an empty array and refresh the
        * page?
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe("");
        });


        /* Write a test that loops through each feed
        * in the allFeeds object and ensures it has a URL defined
        * and that the URL is not empty.
        */
        it('Urls are defined', function() {
            for(var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
            }
        });


        /* Write a test that loops through each feed
        * in the allFeeds object and ensures it has a name defined
        * and that the name is not empty.
        */
        it('Names are defined', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe("");
            }
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* Write a test that ensures the menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */
        /* Since the hidden property is set by "menu-hidden" in CCS, we need to make sure there is a class
        * name "menu-hidden" in the body attribute.
        */
        it('element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeDefined();
        });


        /* Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        /* Using jQuery method to simulate the phyical click to the menu icon, after the click
        * the body should not have "menu-hidden" attribute.
        */
        it('element changes visibility when icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
        })
    });


    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test wil require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        /* initiate a loadfeed   */
        beforeEach(function(done) {
            /* clear the possible feeds before initiate*/
            $('.feed').find('.entry').html();
            loadFeed(0, function() {
                done();
            });
        });
        

        it('has at least one element', function(done) {
            var tempElement = $('.feed').find('.entry');
            expect(tempElement.length).not.toBe(0);
            done();
        });
    });


    /* Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        var tempElement = $('.feed');
        var content0 = [],
        content1 = [];
        beforeEach(function(done) {
            /* clear feed */
            tempElement.empty();
            loadFeed(0, function() {
                var tempElement0 = tempElement.find('h2');
                content0.push(tempElement0[0]);
                /* Nest loadfeed function inside to avoid race conditions. */
                loadFeed(1, function() {
                    /* Do the selection again and save new feed to variable. */
                    var tempElement1 = tempElement.find('h2');
                    content1.push(tempElement1[0]);
                        done();
                });
            })
        });


        it('content changes', function(done){
            expect(content0).not.toBe(content1);
            done();
        });
    });
}());