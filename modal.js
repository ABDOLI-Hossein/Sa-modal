
(function ($){
    $.fn.saModal = function (userOptions){
        var options = $.extend({
            wrapperBgColor: "#000", // color of modal bg
            wrapperOpacity: 0.8,    // opacity of modal bg
            width: 500,             // width of modal in pixel
            entrance: "top",        // fade,top,bottom,right,left,topleft
            speed: 1000,              // in ms
            top: 200,               // distance from top
            showEvent: "click",     // all jquery valid events
            showCloseButton: true,
            onStart: "" ,           // set custom call before popin is inited..
            onFinish: ""
        },userOptions);

        var enterModal = function (modal,enterMode){
            var wh = $(window).height();
            var ww = $(window).width();
            var topPosition = options.top + "px";

            switch (enterMode){
                case "fade":
                    modal.css({top: topPosition})
                    modal.fadeIn(options.speed)
                    break;
                case "top":
                    modal.css({top: -1 * wh,display:"block" })
                    modal.animate({top:topPosition},options.speed)
                    break;
                case "bottom":
                    modal.css({top: 2 * wh,display:"block" })
                    modal.animate({top:topPosition},options.speed)
                    break;
               
            }
        }



        var modalButtons = $("a[data-modal],button[data-modal],span[data-modal]");



        var wrapper = $("<div>").addClass("saModalWrapper").css({
            backgroundColor: options.wrapperBgColor,
            opacity: options.wrapperOpacity,
        });
        modalButtons.each(function (){
            var mBtn = $(this);
            var mBox = $("#"+mBtn.attr("data-modal")).css({width: options.width + "px"});
            mBtn.on(options.showEvent,function (e){
                e.preventDefault();
                mBox.before(wrapper)

                if (typeof options.onStart === "function"){
                    options.onStart();
                }

                wrapper.fadeIn(options.speed);
                var enterMode = mBox.is("[data-entrance]") ? mBox.attr("data-entrance"):options.entrance;
                enterModal(mBox,enterMode)

                mBox.fadeIn(options.speed);

                wrapper.click(function (){
                    wrapper.fadeOut(options.speed);
                    mBox.fadeOut(options.speed,function (){
                        if (typeof options.onStart === "function"){
                            options.onFinish();
                        }
                    });
                })
                if(options.showCloseButton === true){
                    mBox.append($("<div class='closebtn'>").append("<img src='close.png'>"))
                    $(".closebtn").css({display:"flex"})
                }else {
                    $(".closebtn").css({display:"none"})
                }
                $(".closebtn").click(function (){
                    mBox.fadeOut(options.speed)
                    wrapper.fadeOut(options.speed)
                })




            })
        })




    }
})(jQuery);