var limitTextCount = {
	textCounter(field, maxlimit){
		if (field.value.length > maxlimit){
			field.value = field.value.substring(0, maxlimit);
		}else{
			document.upbook.remLen.value = maxlimit - field.value.length;
		}

	},
	wordsLeft(field, maxlimit){
		if (field.value.length > maxlimit){
			field.value = field.value.substring(0, maxlimit);
		}else{
			document.upbook.remLen.value = maxlimit - field.value.length;
		}
		var num = maxlimit - field.value.length
	}

}
export default limitTextCount;
