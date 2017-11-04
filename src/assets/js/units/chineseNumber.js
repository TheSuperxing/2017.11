function ChineseNumber(num) {
  this.num=num;
  this.baseNumber=['零','一','二','三','四','五','六','七','八','九','十','百','千'];
  this.chineseNumber="";
}
ChineseNumber.prototype.setChineseNumber=function (){
  if(parseInt(this.num/1000)%10!=0){
    this.chineseNumber+=this.baseNumber[parseInt(this.num/1000)%10]
    this.chineseNumber+=this.baseNumber[12]
  }
  if(parseInt(this.num/100)%10!=0){
    this.chineseNumber+=this.baseNumber[parseInt(this.num/100)%10]
    this.chineseNumber+=this.baseNumber[11]
  }
  if(parseInt(this.num/10)%10!=0){

    if(parseInt(this.num/10)%10==1){
      this.chineseNumber+=this.baseNumber[10]
      console.time("1")
    }else {
      this.chineseNumber+=this.baseNumber[parseInt(this.num/10)%10]
      this.chineseNumber+=this.baseNumber[10]
      console.time("2")
    }

  }
  if(parseInt(this.num)%10!=0){
    this.chineseNumber+=this.baseNumber[this.num%10]
  }
}
ChineseNumber.prototype.getChineseNumber=function (){
  this.setChineseNumber();
  return this.chineseNumber;
}

export default ChineseNumber;
