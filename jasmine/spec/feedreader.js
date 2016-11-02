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
                expect(allFeeds.length).not.toBe(0);
            });


            // Testing for URL
            it('have URL', function(){
                allFeeds.forEach(function(feed){
                    expect(feed.url).toBeDefined();
                    expect(feed.url.length).not.toBe(0);
                    expect(feed.url).toMatch(/^(http|https):\/\//);
                });
            });

             // Test each feed is not empty
             it('name is defined and not empty', function(){
                allFeeds.forEach(function(feed){
                    expect(feed.name).not.toBe(null);
                });
             });
        });


        /* TODO: Write a new test suite named "The menu" */
        describe('The menu', function(){

            var body = document.body;
            var menuIcon = document.querySelector(".menu-icon-link");

            //Test body element to have "menu-hidden" class
            it('body have "menu-hidden"', function(){
                expect(body.className).toContain("menu-hidden");
            });

            // Test is class menu-hidden on body when clicking
            it('menu changes visibility when the menu icon is clicked', function(){
                menuIcon.click();
                expect(body.className).not.toContain("menu-hidden");

                menuIcon.click();
                expect(body.className).toContain("menu-hidden");
            });
        });

        /* TODO: Write a new test suite named "Initial Entries" */
        describe('Initial Entries', function(){

            //async load functio
            beforeEach(function(done) {
              loadFeed(0, function() {
                done();
              });
            });

            //Test ensures when the loadFeed function is completed ther is at least one "entry" elemnt in the ".feed container"
            it('Has at least one "entry" element in the ".feed container"', function(done){
                var lengthOfEntreis = document.querySelector(".feed").getElementsByClassName("entry").length;
                expect(lengthOfEntreis).toBeGreaterThan(0);
                done();
            });


        /* TODO: Write a new test suite named "New Feed Selection"*/
        describe("New Feed Selection", function(){
            var firstFeed;
            var secondFeed;

            //asynd load function and geeting data to compare
            beforeEach(function(done) {
              loadFeed(0, function() {
                firstFeed = document.querySelector(".feed").innerHTML;
                loadFeed(1, function(){
                    done();
                });
              });
            });

            //compares content in ".feed" before load and after to check for changes
            it('content on feed is actually changing', function(){
                secondFeed = document.querySelector(".feed").innerHTML;
                expect(firstFeed).not.toEqual(secondFeed);
            });
        });
    });

}());
