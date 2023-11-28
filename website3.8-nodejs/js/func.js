$(function(){
	$(".typewriter").typed({
		strings: ["<font style=\"color: #fff\">Đang cập nhật....</font>"],
		// optionally use an HTML element to grab strings from (must wrap each string in a <p>)
		stringsElement: null,
		// typing speed
		typeSpeed: 30,
		// time before typing starts
		startDelay: 1500,
		// backspacing speed
		backSpeed: 20,
		// time before backspacing
		backDelay: 1000,
		// loop
		loop: true,
		// false = infinite
		loopCount: false,
		// show cursor
		showCursor: false,
		// character for cursor
		cursorChar: "|",
		// attribute to type (null == text)
		attr: null,
		// either html or text
		contentType: 'html',
		// call when done callback function
		callback: function() {},
		// starting callback function before each string
		preStringTyped: function() {},
		//callback for every typed string
		onStringTyped: function() {},
		// callback for reset
		resetCallback: function() {}
	});
});

$( document ).ready(function() {
	alertify
	.alert
	("<H2><i>Thông Báo</i></H2>","<left><img src='https://gamek.mediacdn.vn/DlBlzccccccccccccE5CT3hqq3xN9o/Image/2013/06/QuocAnh/Gunny-va-hinh-tuong-chu-Ga-Vang-dang-yeu-c5f15.jpg'><br><br><a Color:#fff href='https://www.mediafire.com/file/2qar8a87wwj8g1n/Laucher-Online.rar/file' target='_blank' ;>✬ TẢI LAUCHER CHƠI GAME SIÊU NHẸ CHỈ 5MB</a><br><br><a href='http://gunviet.vn/choi-game/' target='_blank' style=color:red;  ><i><b>✬ Chơi Game Ngay</b></i></a><br><br><a href='http://Facebook.Com/Gunny5s' target='_blank'>✬ Theo Dõi FanPage Nhận Code Tham Gia Game</a><br><br><a href='https://www.facebook.com/groups/239995088288465' target='_blank'; >✬ Nhấp vào đây để tham gia groups facebook!</a><br><br>✬ Top Server và Top Win sẽ cập nhật mỗi tuần<br><br><a style=background:orange;>✬ Zalo Hỗ Trợ : 0334773368</a><br><br>✬ Trân trọng!</left>", 
	
	
	function(){
		alertify.success('Chúc các bạn chơi game vui vẻ!');
	});
});
