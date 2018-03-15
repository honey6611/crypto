$(function(){
    $(".btnDeleteCrypto").each(function(){
        $(this).click(function(){
            if (confirm('Are you sure you want to delete item?')) {
                $("#cryptoid").val($(this).attr("data-id"));
                $("#hiddenform").submit();
            }
        })
    })
    updateCurrentPrice();
    setInterval(function(){updateCurrentPrice()}
           ,50000)
         
})

function updateCurrentPrice(){
    $('.marketvalue').each(function(){
        var curid= $(this).attr("data-cryptoid");
        var total= $(this).attr("data-totalval"); 
        var gainid=$(this).attr("data-gainid");
        var _this = $(this);
        $("#"+gainid).html('<img src="../../images/ajax-loader.gif">');
        $(this).html('<img src="../../images/ajax-loader.gif">')
        var gain = 0;
        setTimeout(function(){
            $.getJSON("https://api.coinmarketcap.com/v1/ticker/"+curid+"/?convert=usd", function(json) {
                console.log(json[0].price_usd);
                _this.html(json[0].price_usd);
                var gain = (parseFloat(total)- parseFloat(json[0].price_usd)).toFixed(4);
                $("#"+gainid).html(gain);
              }) 
        },2000)
    }) 
}
