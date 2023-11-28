<?php
/*
++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++ Mọi thắc mắc xin liên hệ ++++++++
++++ FB : fb.me/Official.Account.VinhKOSD ++++
++++++++ EMAIL : vinhkosd@hotmail.com ++++++++
+++++++++++++++ Thank FOr USE ++++++++++++++++
+++++++++++++ USE AT OWN RISK  +++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++
*/
if(!defined('Gun4S.Net')) die();
date_default_timezone_set('Asia/Ho_Chi_Minh');//Dont Edit this line
//Khai báo link
define('link_resource','http://res157.gn.zing.vn/image/');//Config link resource
define('link_shop','http://gunnyncm.com/webshop/');//Config link webshop
define('link_game','http://gunviet.vn/');//Config link chơi game
$cash = 0;// Coin tặng khi đăng ký
$cashfree = 200000;//CoinFree tặng khi đăng ký

$title = 'GunnyPro';

$serverlist='Gà 2016|Gà Vàng';//Tên Server ngăn cách bằng dấu "|" , Sắp xếp theo thứ tự để tránh nhầm lẫn, Lưu ý để ít nhất 1 dấu "|", 
////////////////////////////lỗi do config sai chúng tôi không chịu trách nhiệm///////////////////////
//Một Server thì bạn Config là 'tên server' còn 2server thì bạn config là 'tên s1|tên s2';


//Khai báo config webshop
$cashbag = 20000;//Giá Coin xóa Password rương (Password 2 trong game)
$chagmoney = 500;//tỉ lệ đổi xu ra 1 coin
$chagxu = 30;//tỉ lệ đổi coin ra xu  1 coin = số này
$chagcoinfree = 1;//tỉ lệ đổi Coin Free thành 1 coin . VD bạn config là 2 thì 2 coinfree = 1 coin!
$cashgioi = 20000;//Coin đổi giới tính
$pt = 20;// % Coin tặng khi mời bạn chơi game
$expvipdaily = 5;//VIPEXP được tặng khi điểm danh
$vipexp = 100;//Số EXP VIP tối thiểu để sử dụng được các chức năng miễn phí
$cashfb = 0; //Coin chính tặng khi nhận code share fb
$cashfreefb = 10000;// Coin Free tặng khi nhận code share fb
$pointms1 = 2000;// gói pointms 1
$pointms2 = 5000;// gói pointms 2
$pointms3 = 10000;// gói pointms 3

$id_app_fb = '1495727634065908';//app id fb developers.facebook.com

# Khai bao thong tin ket noi
$config['dbhostdata'] = 'WIN-AGFGRSH53BH\SQLEXPRESS';			# Server name cua mssql

$config['dbuserdata'] = 'sa';							# User name cua mssql ( mac dinh la sa )

$config['dbpassdata'] = 'qaz123.';					# Pass cua mssql ( pass cua sa )

$config['dbdatatank'] = 'Project_Player34';				# Db chua du lieu ( mac dinh la db_tank )

$config['all'] = 'Project_Player34';

$config['dbdatamemb'] = 'Db_Membership';			# Db membership

$config['ws'] = 'DB_WebShop';							#Db web shop

$config['1']['datatank'] = 'Project_Player34';					#Config Db_S1
$config['2']['datatank'] = 'Db_Tank_s2';				#config s2
$config['dbdatatanks2'] = 'Db_Tank_s2';				#config s2
/*Muốn Thêm Config db server thì thêm dòng $config['id_server']['datatank'] = 'tên db';	*/


# Include class webshopv3
include_once 'include/global.php';

# Khoi tao class ket noi mssql
$data = new webshopv3($config);
//Không Được Sửa Phần Này, remod by vinh kosd
$svname = explode("|",$serverlist);
foreach($svname as $svsinglename){
	if($svsinglename)
	{
		$numsv++;
	}
}
//Không được sửa
?>