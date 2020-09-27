$(document).ready(function(){

//============================================
//      INITIALIZATION FUNCTION
// ===========================================
function initalization(){
    $(".light-skin").hide();
    $("#leftSideBar").hide(100);
}
initalization()
//==========================================
//      SEARCH BOX OPEN AND CLOSE
// =========================================
var searchBoxOpenBtn = $("#searchBoxOpenBtn");
    $(searchBoxOpenBtn).click(function(){
    $("#desktopSearchBar .search-bar").slideToggle(150);
});

//============================================
//      MOBILE SIDE NAVIGATION  OPEN
// ===========================================
var leftSideNavBtn = $("#leftSideNavBtn");
    $(leftSideNavBtn).click(function(){
    $(".light-skin").toggle();
    $("#leftSideBar").show(150);
});

//============================================
//      MOBILE SIDE NAVIGATION  OPEN AND CLOSE
// ===========================================
var leftSideNavCancleBtn = $("#leftSideNavCancleBtn");
    $(leftSideNavCancleBtn).click(function(){
        initalization();
});

//============================================
//      MOBILE LIGHT SKIN CLOSE
// ===========================================
var lightSkin = $(".light-skin");
    $(lightSkin).click(function(){
        initalization();
});




    // end of document
});