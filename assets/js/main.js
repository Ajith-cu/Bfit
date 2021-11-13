$("nav ul li a").on("click", function () {
  var scrollAnchor = $(this).attr("data-scroll"),
    scrollPoint =
      $('section[data-anchor="' + scrollAnchor + '"]').offset().top - 20;

  $("body,html").animate(
    {
      scrollTop: scrollPoint,
    },
    500
  );

  return false;
});

$(window)
  .scroll(function () {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 100) {
      $("nav").addClass("fixed");
      $(".wrapper section").each(function (i) {
        if ($(this).position().top <= windscroll + 55) {
          $("nav ul li.active").removeClass("active");
          $("nav ul li").eq(i).addClass("active");
        }
      });
    } else {
      $("nav").removeClass("fixed");
      $("nav ul li.active").removeClass("active");
      $("nav ul li:first").addClass("active");
    }
  })
  .scroll();

$(".mobile-menu").click(function () {
  $(this).toggleClass("active");
  $(this).parent().find("ul").toggleClass("active");
});

$("form").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var emailAddress = $("#emailAddress").val();
  var phoneNumber = $("#phoneNumber").val();
  var mailBody = $("#mailBody").val();
  var formattedBody = `Name:${firstName} ${lastName} <br/> Email Address : ${emailAddress} <br/> Phone : ${phoneNumber} <br/><br/><br/> ${mailBody}`;
  fetch("https://dev.bfitds.com/api/default/contact-us", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: emailAddress,
      to: "a@b.com",
      subject: "Enquiry from bfit website",
      body: formattedBody,
    }),
  })
    .then((res) => {
      $("#firstName").val("");
      $("#lastName").val("");
      $("#emailAddress").val("");
      $("#phoneNumber").val("");
      $("#mailBody").val("");
      res.json().then((data) => $("#mailResponse").text(data.message));
      $("#mailResponse").show();
    })
    .catch((err) => {
      console.log(err.response ? err.response.data : "Unable to send!");
    });
});
