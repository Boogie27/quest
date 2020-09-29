$(document).ready(function(){

//============================================
//      INITIALIZATION FUNCTION
// ===========================================
function initalization(){
    $(".light-skin").hide();
    $("#leftSideBar").hide(100);
}
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
    $("#leftSideBar").show(100);
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

//============================================
//      DISCRIPTION OPEN 
// ===========================================
var descriptionOpen = $(".answer-decription a");
    $(descriptionOpen).click(function(e){
        e.preventDefault();
        $(this).parent().find(".decription-close").show();
        $(this).hide();
});

//============================================
//      SWIPPER FUNCTION
// ===========================================

class Swipper{
    
    constructor (swipper){
        var action = this;
        this.change = 0;
        this.inview = 0;
        this.counter = 0;
        this.isDown = false;
        this.frameWidth = 0;
        this.isMoving = false;
        this.scrolling = false;
        this.containerFrame = 0;
        this.initialPosition = 0;
        this.childFrameWidth = 0;
        this.buttonInactive = false;
        this.transformMatrixValue = 0;

        this.swipperContainer = swipper;
        this.frame = $(this.swipperContainer).find(".swipper-frame");
        this.prev = $(this.swipperContainer).find(".direction .prev");
        this.next = $(this.swipperContainer).find(".direction .next");
        
        this.getFrameValues();

        // next button 
        this.next.on("click", function(){
            action.nextBtn()
        });

        // prev button 
        this.prev.on("click", function(){
            action.prevBtn()
        });

        // window scroll function
        $(window).on("scroll", function(){
            action.windowScroll()
        });

         // touch start function
        this.frame.on("touchstart",function(){ 
            action.touchStart();
        })

        // touch move function
        this.frame.on("touchmove", function(){ 
            action.touchMove();   
        })

        // touch end function
        this.frame.on("touchend", function(){ 
            action.touchEnd();   
        });
    }

    // get all the values of the swipper container and swipper frame
    getFrameValues(){

        // this.frameWidth = $(this.frame).width();
        this.frameWidth = $(this.frame).children().width() * $(this.frame).children().length;
        var itemPadding = parseInt($($(this.frame).children()).css("padding-right")) * $(this.frame).children().length;

        this.frameWidth = itemPadding + this.frameWidth;
        this.containerFrame = $(this.swipperContainer).width();
        this.childFrameWidth = $($(this.frame).children()[0]).width() + parseInt($($(this.frame).children()[0]).css("padding-right"));
    }

    // amount of frames to move
    frameMove(counter){
        this.buttonInactive = false;
        var values = -this.childFrameWidth * counter;
        this.inview = this.frameWidth + values;

        // get the last element into view correctly
        if((this.containerFrame + (this.childFrameWidth / 2)) > this.inview){
            values = this.containerFrame - this.frameWidth;
            this.buttonInactive = true;
        }

        $(this.frame).css({
            transition: "all 0.2s ease",
            transform: "translate("+(values)+"px)"
        }); 
    }

     // next button function 
    nextBtn(){
        if(!this.buttonInactive){
            this.counter++;
            this.frameMove(this.counter);
        }
    }

     // prev button function
    prevBtn(){
        if(this.counter == 0)return;
        this.counter--;
        this.frameMove(this.counter);
    }

    // window scroll function
    windowScroll(){
        this.scrolling = true;
    }

    //touch start function
    touchStart(){
        this.isDown = true;
        this.scrolling = false;
        this.initialPosition = event.touches[0].clientX;
        var transformationMatrix = $(this.frame).css("transform");
        if(transformationMatrix != "none"){
            this.transformMatrixValue = parseInt(transformationMatrix.split(",")[4].trim())
        }
    }

     //touch move function
     touchMove(){
        if(this.isDown && !this.scrolling){
            var isMoving = event.touches[0].clientX;
            this.change = isMoving - this.initialPosition;
            this.inview = this.change + this.transformMatrixValue;

            this.mobileFrameMove(this.change + this.transformMatrixValue)
            console.log(this.frameWidth)
        }
    }

     //touch end function
     touchEnd(){
        this.isDown = false;
        this.scrolling = false;
        if((this.frameWidth - this.inview) <= this.frameWidth){
            this.mobileFrameMove(0);
        }

        if((this.frameWidth + this.inview) <= this.containerFrame){
            this.mobileFrameMove(this.containerFrame - this.frameWidth)
        }
    }

    // mobile frame move function
    mobileFrameMove(values){
        $(this.frame).css({
            "transform": "translateX("+(values)+"px)"
        });
    }
}



    var swipperContainer = $(".swipper-container");
    $.each($(swipperContainer), function(index, current){
        var swipper = new Swipper(current);
    });






    // end of document
});