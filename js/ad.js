<!--
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->

<!--動態效果卷至頂端-->
$(function(){
    $("#gotop").click(function(){
        jQuery("html,body").animate({
            scrollTop:0
        },500);
    });
    $(window).scroll(function() {
        if ( $(this).scrollTop() > 300){
            $('#gotop').fadeIn("fast");
        } else {
            $('#gotop').stop().fadeOut("fast");
        }
    });
});

$(function(){
		// 取得 #abgne-block-20120509 及 ul li 等相關元素
		// _index 用來設定預設顯示第幾個
		// speed 是用來控制輪播的速度用
		var $block = $('#abgne-block-20120509'), 
			$ul = $block.find('ul'), 
			$li = $ul.find('li'), 
			_index = 0, 
			timer, speed = 3000, _isHover = false;
		
		// 一一產生用來放置描述文字的區塊
		// 並產生控制器用的 ul 及 li
		// 其中還加入一個用來顯示目前筆數 / 總筆數的元素
		var $desc = $('<span class="desc"></span>'), 
			$prev = $('<li class="prev"><a href="#" class="prev" title="上一張"></a></li>'), 
			$pauseAndPlay = $('<li><a href="#" class="pause" title="自動播放"></a></li>'), 
			$next = $('<li><a href="#" class="next" title="下一張"></a></li>'), 
			$last = $('<li><span class="last">' + (_index + 1) + ' / ' + $li.length + '</span></li>'), 
			$controls = $('<ul class="controls"></ul>').append($prev, $pauseAndPlay, $next, $last);
		
		// 把描述區塊及控制器加到 $block 中
		$block.append($desc, $controls);
		
		// 控制顯示圖片、描述文字及目前筆數使用
		function create(){
			var $item = $li.hide().eq(_index).fadeIn();
			$desc.text($item.find('img').attr('alt'));
			$last.find('.last').text((_index + 1) + ' / ' + $li.length);
		}
		
		// 當點擊到 $controls 上的 li 時控制切換上下張及控制是否輪播
		$controls.on('click', 'li', function(){
			var $this = $(this), 
				$a = $this.find('a');
			
			// 如果點到的是上下張鈕
			if($a.hasClass('prev') || $a.hasClass('next')){
				// 計算要顯示那一張
				_index = ($a.hasClass('prev') ? _index - 1 + $li.length : _index + 1) % $li.length;
				create();
			}else{
				// 如果點到的是暫停或是播放鈕
				$a.toggleClass('pause play').attr('title', $a.hasClass('pause') ? '自動播放' : '暫停');
				$a.hasClass('pause') && !_isHover ? timer = setTimeout(auto, speed) : clearTimeout(timer);
			}

			return false;
		});
		
		$block.hover(function(){
			// 當滑鼠移入 $block 時停止計時器
			_isHover = true;
			clearTimeout(timer);
		}, function(){
			// 當滑鼠移出 $block 時啟動計時器
			// 如果現在 $pauseAndPlay a 的 class 中有 .pause 的話, 才啟動計時器
			_isHover = false;
			if($pauseAndPlay.find('a').hasClass('pause')) timer = setTimeout(auto, speed);
		});
		
		// 自動輪播使用
		function auto(){
			$next.click();
			timer = setTimeout(auto, speed);
		}
		
		// 啟動計時器
		timer = setTimeout(auto, speed);
		
		// 執行預設
		create();
	});
