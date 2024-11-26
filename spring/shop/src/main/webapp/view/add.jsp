<%--
  Created by IntelliJ IDEA.
  User: sion
  Date: 2024. 11. 26.
  Time: 오전 9:29
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<html>
<%@ include file="./head.jsp" %>

<body>
<div class="container mx-auto">
    <h1 class="text-2xl text-green-800 mb-5">Add Cust</h1>

    <form action="${pageContext.request.contextPath}add" method="POST">
        <label for="name">Name:
            <input type="text" id="name" name="name" class="border rounded-md">
        </label>
        <label for="tel">Tel:
            <input type="tel" id="tel" name="tel" class="border rounded-md">
        </label>
        <input type="submit" value="Add">
    </form>
</div>
</body>
</html>
