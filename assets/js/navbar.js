export default class Navbar {
    constructor() {

        $(window).scroll(function() {    
            var scroll = $(window).scrollTop();
        
             //>=, not <=
            if (scroll >= 40) {
                //clearHeader, not clearheader - caps H
                $(".wrapper-navbar").addClass("shadowed");
            }
            if (scroll < 40) {
                //clearHeader, not clearheader - caps H
                $(".wrapper-navbar").removeClass("shadowed");
            }
        }); //missing );
    }
}
