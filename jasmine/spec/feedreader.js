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


        /* As instructed from Udacity, this the first test to understand
         * how Jasmine works.
         * This test check allFeeds variable (located in app.js), if the array
         * is empty or undefined.
         */ 

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops each of the feed in the allFeeds object and 
         * make sure that its URL are defined and not empty
         */

        //Udacity Reviewer suggested with using forEach loop, as opposed to forLoop
        it('URL are defined', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });

        /* Similar to previous test, this checks the feed name in the allFeeds object
         * are defined and not empty
         */
        it('Name are defined', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The Menu',function(){

        /* This test checks to see if the menu element is hidden by default
         * Using jQuery, it is possible to see if the class is set to "menu-hidden"
         * by default
         */ 

        it('is hidden by default', function(){
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });

          /* This test ensures that if the menu changes, the visibility toggles from hidden to
           * visible and vice versa. Using jQuery and trigger(), we can emulate 
           * as if the user click the specific element to see the class toggle 
           */

        it('should toggle class when clicked', function(){
            $('.menu-icon-link').trigger('click'); //trigger() automatically triggers the selected element
            expect($('body').hasClass("menu-hidden")).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });  
    });



    /*Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function(){

         /* This test makes sure the asynchronous process with loadFeed function
            loading is done first to make sure there is at least a one .entry element
            in the .feed container. 
            done() and beforeEach is utlized for this test.
          */

        beforeEach(function(done) {
            // setTimeout(function() {
            //     $('.feed').empty(); 
            //     loadFeed(0, done);
            // }, 4000); 
                    /*By default jasmine will wait 
                      for 5 seconds for an asynchronous spec to 
                      finish before causing a timeout failure
                      */
            //Note to Udacity: I wasnt sure if I had to implement a setTimeout method
            //to emulate a asynchronous procedure. If not, then I will remove it :)

            $('.feed').empty(); //suggested by Udacity reviewr to remove children from .feed
            loadFeed(0, done);
        });


        it('should contain a feed element asynchronous', function(){
            expect($('.feed').length).not.toBe(0);
        });  
    });

    /* Write a new test suite named "New Feed Selection"*/

    describe('New Feed Selection', function(){

         /* This test to make sure that new feed's content is changed when loadFeed
            function is called using different index. 

          * oldContent variable will collect the newsfeed txt from the beforeEach
          * newContent variable will collect the newsfeed txt from the it-function

          * The actual test ( expect() ) is implemented in the afterEach 
          */

        var newContent;
        var oldContent;

         beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(3, done) // <--call loadFeed index 3 to change content
         });
 

         it('new feed content is changed', function(done){
            oldContent = $('.feed').text();
            loadFeed(2, done) // <--call loadFeed index 2 to change content
         });


         afterEach(function(done){
            newContent = $('.feed').text();
            // console.log("OLD CONTENT");
            // console.log("********************");
            // console.log(oldContent);

            // console.log("NEW CONTENT");
            // console.log("********************");
            // console.log(newContent);
            expect(oldContent).not.toBe(newContent);
            loadFeed(0, done); //return to default index
         });
    });
}());

