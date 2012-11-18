$(function() {

    $("#saveUserData").click(function() {
        clearCookie();
        setCookie("firstName",$("#firstName").val(),1);
        setCookie("lastName",$("#lastName").val(),1);
        setCookie("organizationName",$("#organizationName").val(),1);
        setCookie("userEmail",$("#userEmail").val(),1);
        setCookie("userRole",$("#userRole").val(),1);
        setCookie("userGrade",$("#userGrade").val(),1);
        setCookie("userExperience",$("#userExperience").val(),1);
        checkCookie();
    });

});
