<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<link href="reserous/css/top.css" rel="stylesheet">
</head>
<body>
	<font class="logo">某某科技</font>
	<label><%=session.getAttribute("userName")%>医生，欢迎你，点击<font
		class="zx" onclick="onClear()">注销</font></label>
</body>
<script type="text/javascript" src="BootStrap/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="reserous/js/top.js"></script>
</html>