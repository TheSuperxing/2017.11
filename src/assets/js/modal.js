var Modal = {
	makeText(modal){
		var bw = $(document.html).width();
		var bh = $(document.html).height();
		modal.width(bw);
		modal.height(bh);
		modal.fadeIn();
		$(document.body).css("overflow-y","hidden");
//		$(document.body).bind('mousewheel',function(){
//			return false;
//		})

	},
	closeModal(modal){
		modal.fadeOut();
		$(document.body).css("overflow-y","scroll");
		$(document.body).bind('mousewheel',function(){
			return true;
		})
		
	},
	choseThis(e){
		$(e.target).addClass("selected").siblings().removeClass('selected');
	}
}





export default Modal;
