function onClear() {
	//注销时清楚session中的数据
	$.get("main/doCancel.do", function(data) {
				if(data&&data.success){
					parent.location.href = "login.html";
				}
			});
}