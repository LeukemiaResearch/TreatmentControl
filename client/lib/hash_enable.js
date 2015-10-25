// var scrollSpeed = 700;

// //Session.set('hash', '#tree');

// Router.onRun(function() {
//   Meteor.setTimeout(function () {
//     var hash = $(window.location.hash);
//     var headerHeight = $("header").outerHeight();
//     var scrollTo = hash.length ? hash.offset().top - headerHeight : 0;
//     $("html, body").animate({ scrollTop: scrollTo }, scrollSpeed);
//   }, 0);
//   this.next();
// });

// Router._scrollToHash = function (hashValue) {
//   try {
//     var hash = $(hashValue);
//     var headerHeight = $("header").outerHeight();
//     var scrollTo = hash.length ? hash.offset().top - headerHeight : 0;
//     $("html, body").animate({ scrollTop: scrollTo }, scrollSpeed);
//   } catch (e) {
//     // in case the hashValue is bogus just bail out
//   }
// };