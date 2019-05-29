$(document).ready(function () {
    var items = "<option value='0'>Select</option>";
    $("#citylist").html(items);
});

$("#countrylist").change(function () {
    var countryId = $("#countrylist").val();
    var url = "/Home/GetCityList";

    $.getJSON(url, { CountryId: countryId }, function (data) {
        var item = "";
        $("#citylist").empty();
        $.each(data, function (i, city) {
            item += '<option value="' + city.value + '">' + city.text + '</option>'
        });
        $("#citylist").html(item);
    });
});