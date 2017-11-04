var ModalOpp=function (name,e) {
  this.name=name;
  this.e=e;
}
ModalOpp.prototype.makeText=function () {
  var bw = $(document.html).width();
  var bh = $(document.html).height();

  $(this.name).width(bw);
  $(this.name).height(bh);
  $(this.name).show();
//		$(".modal-data").html(str);
  $(document.body).css("overflow","hidden");
}
ModalOpp.prototype.closeModal=function () {
  $(this.name).hide();
  $(document.body).css("overflow","scroll");
}
export default ModalOpp;
