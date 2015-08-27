/**
 * Created by wangshuai on 2015/8/25.
 */

function showIdCard(obj,userId){
  if($(obj).children(".businessCard").length>=1){
	  $(obj).children(".businessCard").show();
	  return false;
  }else{
	  $(obj).children(".businessCard").remove();
  }
  $.ajax({
    url:"businessCard.json",
    dataType: "json",
    data:{uid:userId},
    success:function(data){
      data = eval(data);
      var card = "";
//      card += "<div class='businessCard' id='businessCard"+ userId +"'>";
      card += "<div class='businessCard'>";
      card += "<a href='authorHome.htm?theId="+ userId +"' target='_blank'><img src='http://moerfile.jiemian.com/staticFile"+ data.head +"'></a>";
      card += "<div class='bcard-user'><h3><a href='authorHome.htm?theId="+ userId +"' target='_blank'>"+ data.name +"</a>";
      if(data.user_level == 2){
        card += "<i class='cardv2'></i></h3>";
      }else if(data.user_level == 3){
        card += "<i class='cardv3'></i></h3>";
      }else{
        card += "</h3>";
      }
      if(data.persion_describe.length > 29){
        data.persion_describe = data.persion_describe.substring(0,28)+"...";
      }
      card += "<p>"+data.persion_describe+"</p></div>";
      card += "<div class='business-message'><a href='authorHome.htm?theId="+ userId +"&returnAuPage=authorComment' target='_blank'>问答<strong>"+ data.wd +"</strong></a>";
      if(data.user_level == 2){
        card += "<a href='authorHome.htm?theId="+ userId +"&returnAuPage=authorArticle' target='_blank'>文章<strong>"+ data.articleCount +"</strong></a>";
      }else{
        card += "<a href='authorHome.htm?theId="+ userId +"&returnAuPage=authorArticle' target='_blank'>关注<strong>"+ data.follow +"</strong></a>";
      }
      if(Number(data.fans) > 100000){
        data.fans = Math.ceil(Number(data.fans)/10000) + "万";
      }
      card += "<a href='authorHome.htm?theId="+ userId +"' target='_blank'>粉丝<strong>"+ data.fans +"</strong></a></div>";
      if(data.attention == 1){
        card += "<button type='button' class='bAttention bAttention-y' uid='"+ userId +"'><i></i>已关注</button>";
      }else{
        card += "<button type='button' class='bAttention bAttention-n' uid='"+ userId +"'><i></i>加关注</button>";
      }
      card += "<button type='button' class='bPrivateletter' uid='"+ userId +"' uname='"+ data.name +"'>私信</button></div>";
//      console.log(card);
      $(obj).append(card);
    }
  })
}

function cardAttention(obj,userId){
	if($(obj).hasClass("bAttention-y")){
		var url="frontattention.json?"+"attentionUser="+userId+"&isAdd=false";
		$.get(url,function(data){
			data = parseObj(data);
	      	if(data.success == true){
      			$(obj).html("<i></i>加关注");
      			$(obj).removeClass("bAttention-y");
      			$(obj).addClass("bAttention-n");
	      	}
		});
	}else{
		var url="frontattention.json?"+"attentionUser="+userId+"&isAdd=true";
		$.get(url,function(data){
			data = parseObj(data);
	      	if(data.success == true){
      			$(obj).html("<i></i>已关注");
      			$(obj).removeClass("bAttention-n");
      			$(obj).addClass("bAttention-y");
	      	}
		});
	}
}

$(document).on("click",".bAttention",function(){
//	if($("#cardMyId").value() == 0){
//		passport.sdk.login('moer',window.location.href,'');
//		return false;
//	}
	var t = $(this);
	var uid = t.attr("uid");
	cardAttention(t,uid);
});

$(document).on("click",".bPrivateletter",function(){
//	if($("#cardMyId").value() == 0){
//		passport.sdk.login('moer',window.location.href,'');
//		return false;
//	}
	var uname = $(this).attr("uname");
	var uid =  $(this).attr("uid");
	MOER.sendLetter(uname,uid,'1');
});

$(document).on("mouseover",".wdrightCard",function(){
	var t = $(this);
	var uid = t.attr("uid");
	showIdCard(t,uid);
})
$(document).on("mouseleave",".wdrightCard",function(){
	$(this).children(".businessCard").hide();
});


