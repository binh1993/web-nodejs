<?php


# class ket noi csdl
class webshopv3 {
	# khai bao thong tin ket noi
	private $dbhostdata;
	private $dbuserdata;
	private $dbpassdata;
	private $dbdatatank;
	private $dbdatatanks2;
	private $dbdatatanks3;
	private $dbdatatanks4;
	private $dbdatatanks5;
	private $dbdatatanks6;
	private $dbdatamemb;
	private $ws;
	private $all;
	private $queryResult;
	private $conn;
	private $conn_s2;
	private $conn_s3;
	private $conn_s4;
	private $conn_s5;
	private $conn_s6;
	private $conn_memb;
	private $conn_ws;
	private $conn_all;
	
	public function __construct($config) {
		$this->dbhostdata = $config['dbhostdata'];
		$this->dbuserdata = $config['dbuserdata'];
		$this->dbpassdata = $config['dbpassdata'];
		$this->dbdatatank = $config['dbdatatank'];
		$this->dbdatamemb = $config['dbdatamemb'];
		$this->dbdatatanks2 = $config['dbdatatanks2'];
		$this->dbdatatanks3 = $config['dbdatatanks3'];
		$this->dbdatatanks4 = $config['dbdatatanks4'];
		$this->dbdatatanks5 = $config['dbdatatanks5'];
		$this->dbdatatanks6 = $config['dbdatatanks6'];
		$this->ws = $config['ws'];
		$this->all = $config['all'];
		$this->sqlsrv_mem();
		$this->sqlsrv_ws();
		$this->sqlsrv_all();
		$this->sqlsrv_s2();
		$this->sqlsrv_s3();
		$this->sqlsrv_s4();
		$this->sqlsrv_s5();
		$this->sqlsrv_s6();
		$this->sqlsrv();
    }
	# Ham ket noi sqlsrv
	function sqlsrv() {
		# Ket noi den database mssql
        $this->conn = sqlsrv_connect($this->dbhostdata, array("Database"=>$this->dbdatatank,"UID"=>$this->dbuserdata,"PWD"=>$this->dbpassdata,"CharacterSet" => "UTF-8"));
		return $this->conn;
	}
	function sqlsrv_s2() {
		# Ket noi den database mssql
        $this->conn_s2 = sqlsrv_connect($this->dbhostdata, array("Database"=>$this->dbdatatanks2,"UID"=>$this->dbuserdata,"PWD"=>$this->dbpassdata,"CharacterSet" => "UTF-8"));
		return $this->conn_s2;
	}
	function sqlsrv_s3() {
		# Ket noi den database mssql
        $this->conn_s3 = sqlsrv_connect($this->dbhostdata, array("Database"=>$this->dbdatatanks3,"UID"=>$this->dbuserdata,"PWD"=>$this->dbpassdata,"CharacterSet" => "UTF-8"));
		return $this->conn_s3;
	}
	function sqlsrv_s4() {
		# Ket noi den database mssql
        $this->conn_s4 = sqlsrv_connect($this->dbhostdata, array("Database"=>$this->dbdatatanks4,"UID"=>$this->dbuserdata,"PWD"=>$this->dbpassdata,"CharacterSet" => "UTF-8"));
		return $this->conn_s4;
	}
	function sqlsrv_s5() {
		# Ket noi den database mssql
        $this->conn_s5 = sqlsrv_connect($this->dbhostdata, array("Database"=>$this->dbdatatanks5,"UID"=>$this->dbuserdata,"PWD"=>$this->dbpassdata,"CharacterSet" => "UTF-8"));
		return $this->conn_s5;
	}
	function sqlsrv_s6() {
		# Ket noi den database mssql
        $this->conn_s6 = sqlsrv_connect($this->dbhostdata, array("Database"=>$this->dbdatatanks6,"UID"=>$this->dbuserdata,"PWD"=>$this->dbpassdata,"CharacterSet" => "UTF-8"));
		return $this->conn_s6;
	}
	function sqlsrv_mem() {
		#Ket noi den database db_membership
		$this->conn_memb = sqlsrv_connect($this->dbhostdata, array("Database"=>$this->dbdatamemb,"UID"=>$this->dbuserdata,"PWD"=>$this->dbpassdata,"CharacterSet" => "UTF-8"));
		return $this->conn_memb;
	}
	function sqlsrv_ws() {
		#Ket noi den database db_membership
		$this->conn_ws = sqlsrv_connect($this->dbhostdata, array("Database"=>$this->ws,"UID"=>$this->dbuserdata,"PWD"=>$this->dbpassdata,"CharacterSet" => "UTF-8"));
		return $this->conn_ws;
	}
	function sqlsrv_all() {
		#Ket noi den database db_membership
		$this->conn_all = sqlsrv_connect($this->dbhostdata, array("Database"=>$this->all,"UID"=>$this->dbuserdata,"PWD"=>$this->dbpassdata,"CharacterSet" => "UTF-8"));
		return $this->conn_all;
	}
	# Ham thuc thi query
	public function query($query,$type = '') {
		if($type == 'mem') {
			$this->queryResult = sqlsrv_query($this->conn_memb,$query,array(),array("Scrollable"=>SQLSRV_CURSOR_KEYSET));
			return $this->queryResult;
		} else if($type == '1') {
			$this->queryResult = sqlsrv_query($this->conn,$query,array(),array("Scrollable"=>SQLSRV_CURSOR_KEYSET));
			return $this->queryResult;
		} else if($type == '2') {
			$this->queryResult = sqlsrv_query($this->conn_s2,$query,array(),array("Scrollable"=>SQLSRV_CURSOR_KEYSET));
			return $this->queryResult;
		} else if($type == '3') {
			$this->queryResult = sqlsrv_query($this->conn_s3,$query,array(),array("Scrollable"=>SQLSRV_CURSOR_KEYSET));
			return $this->queryResult;
		} else if($type == '4') {
			$this->queryResult = sqlsrv_query($this->conn_s4,$query,array(),array("Scrollable"=>SQLSRV_CURSOR_KEYSET));
			return $this->queryResult;
		} else if($type == '5') {
			$this->queryResult = sqlsrv_query($this->conn_s5,$query,array(),array("Scrollable"=>SQLSRV_CURSOR_KEYSET));
			return $this->queryResult;
		} else if($type == '6') {
			$this->queryResult = sqlsrv_query($this->conn_s6,$query,array(),array("Scrollable"=>SQLSRV_CURSOR_KEYSET));
			return $this->queryResult;
		}else if($type == 'all') {
			$this->queryResult = sqlsrv_query($this->conn_all,$query,array(),array("Scrollable"=>SQLSRV_CURSOR_KEYSET));
			return $this->queryResult;
		} else {
			$this->queryResult = sqlsrv_query($this->conn_ws,$query,array(),array("Scrollable"=>SQLSRV_CURSOR_KEYSET));
			return $this->queryResult;
		}
	}
	# Ham dem so dong tra ve
	public function query_num($query = NULL) {
		if($query == NULL){
            if (is_resource($this->queryResult))
                return sqlsrv_num_rows($this->queryResult);
        }
        return sqlsrv_num_rows($query);
	}
	# Ham dua du lieu vao mang
	public function query_array($query = NULL) {
        if($query == NULL) {
            if (is_resource($this->queryResult))
               return sqlsrv_fetch_array($this->queryResult,SQLSRV_FETCH_ASSOC);
        }
		return sqlsrv_fetch_array($query,SQLSRV_FETCH_ASSOC);
    }
    public function update_top() {
    	$top = $this->query("SELECT TOP 10 NickName,FightPower FROM Sys_Users_Detail WHERE IsExist = 'True' ORDER by FightPower DESC");
		$Dem = 1;
		echo  '
		<table height="15" cellpadding="0" cellspacing="0" width="98%">
            <tr>
			
            <th width="43%" height="29"><font size="2" color="FF0000">T�n nh�n v?t</th>
            <th width="57%"><font size="2" color="FF0000">L?c chi?n</th>
            </tr>
		</table>
        ';

 		while($result = $this->query_array($top)) {
     		echo  '
			<table height="15" cellpadding="0" cellspacing="0" width="98%">
            <th width="43%" height="25">'.$result['NickName'].'</th>
            <th width="57%">'.number_format($result['FightPower']).'</th></table>
			';
	 	++$Dem;}
    }
} # Ket thuc class webshopv3

# Ham load cash user
function loadcash($Username) {
	global $data;
	$q=$data->query("SELECT Cash FROM Ws_User WHERE Username = '$Username'");
	if($data->query_num($q) == 0) {
		return 'Null';
	} else {
		$obj = $data->query_array($q);
		return $obj['Cash'];
	}
}
function updatevip($Username) {
	global $data;
	$ws = loadws($Username);
			$exp = $ws['VipExp'];
	$vipws = $data->query("select top 1 * from Ws_Config_Vip where VipExp <= '$exp' ORDER by VipLv DESC");
	$in  = $data->query_array($vipws);
			$vipupdate = $in['VipLv'];
			$data->query("Update ws_user set VipLv = '$vipupdate' where UserName = '$Username'");
}
function get_user_key($Username) {
	global $data;
	$q=$data->query("SELECT [key] FROM Ws_User WHERE Username = '$Username'");
	if($data->query_num($q) == 0) {
		return 'Null';
	} else {
		$obj = $data->query_array($q);
		return $obj['key'];
	}
}
function loadIsExist($Username) {
	global $data;
	$q=$data->query("SELECT IsExist FROM Ws_User WHERE Username = '$Username'");
		$obj = $data->query_array($q);
		return $obj['IsExist'];

}
function loadcashfree($Username) {
	global $data;
	$q=$data->query("SELECT CashFree FROM Ws_User WHERE Username = '$Username'");
	if($data->query_num($q) == 0) {
		return 'Null';
	} else {
		$obj = $data->query_array($q);
		return $obj['CashFree'];
	}
}
function loadxugame($username,$sv) {
	global $data;
	$q=$data->query("select Money from Sys_Users_Detail WHERE username = '$username'",''.$sv.'');
	if($data->query_num($q) == 0) {
		return 'Null';
	} else {
		$obj = $data->query_array($q);
		return $obj['Money'];
	}
}


function loadphone($username) {
	global $data;
	$q = $data->query("SELECT Phone FROM Ws_user WHERE UserName = '$username'");
	if($data->query_num($q) <> 0) {
		$info = $data->query_array($q);
		return $info['Phone'];
	}
}
function loadws($username) {
	global $data;
	$q = $data->query("SELECT * FROM Ws_user WHERE UserName = '$username'");
	if($data->query_num($q) <> 0) {
		$info = $data->query_array($q);
		return $info;
	}
}
function loadvipexpuser($username) {
	global $data;
	$q = $data->query("SELECT VipExp FROM Ws_user WHERE UserName = '$username'");
	if($data->query_num($q) <> 0) {
		$info = $data->query_array($q);
		return $info['VipExp'];
	}
}
function loadvipuser($username) {
	global $data;
	$q = $data->query("SELECT VipLv FROM Ws_user WHERE UserName = '$username'");
	if($data->query_num($q) <> 0) {
		$info = $data->query_array($q);
		return $info['VipLv'];
	}
}
function loadvip($viplv) {
	global $data;
	$q = $data->query("select * from Ws_Config_Vip where VipLv = '$viplv'");
	if($data->query_num($q) <> 0) {
		$info = $data->query_array($q);
		return $info;
	}
}
function loadrevip($viplv) {
	global $data;
	$q = $data->query("select * from Ws_Config_Vip where VipLv = '$viplv'");
	if($data->query_num($q) <> 0) {
		$info = $data->query_array($q);
		return $info['VipReduction'];
	}
}
function loademail($username) {
	global $data;
	$q = $data->query("SELECT Email FROM Ws_user WHERE Username = '$username'");
	if($data->query_num($q) <> 0) {
		$info = $data->query_array($q);
		return $info['Email'];
	}
}

# Load gia vat pham
function loadprice($id) {
	global $data;
	$q = $data->query("SELECT Price FROM Shop_item WHERE id = '$id'");
	if($data->query_num($q) <> 0) {
		$info = $data->query_array($q);
		return $info['Price'];
	}
}
function loadgoods($itemid,$sv) {
	global $data;
	$q = $data->query("SELECT * FROM Sys_Users_Goods WHERE ItemId = '$itemid'",''.$sv.'');
	if($data->query_num($q) <> 0) {
		$info = $data->query_array($q);
		return $info;
	}
}
# Ham load thong tin vat pham
function infoItem($id) {
	global $data;
	$q = $data->query("SELECT * FROM Shop_Goods WHERE TemplateID = '$id'",'1');
	if($data->query_num($q) <> 0) {
		$info = $data->query_array($q);
		return $info;
	}
}
function infoItemws($id) {
	global $data;
	$q = $data->query("SELECT * FROM Shop_item WHERE Id = '$id'");
	if($data->query_num($q) <> 0) {
		$info = $data->query_array($q);
		return $info;
	}
}

#get ip
function getIP()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))  //check ip from share internet
    {
      $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   
    //to check ip is pass from proxy
    {
      $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
      $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
# Ham chuyen trang
function chuyentrang($link) {
	echo '<script type="text/javascript">window.location="'.$link.'";</script>';
}
# Ham thong bao
function thongbao($text) {
	echo '<script type="text/javascript">alert("'.$text.'");</script>';
}
# Ham load hinh anh vat pham
function loadimage($image,$loaivp,$sex) {
	# Xem gioi tinh
	switch($sex) {
		case 1:
		$ml = 'm';
		break;
		case 2:
		$ml = 'f';
		break;
		default:
		$ml = 'f';
		break;
	}
	switch($loaivp) {
		case 1:
		$link = 'equip/'.$ml.'/head/'.$image.'/icon_1.png';
		break;
		case 2:
		$link = 'equip/'.$ml.'/glass/'.$image.'/icon_1.png';
		break;
		case 3:
		$link = 'equip/'.$ml.'/hair/'.$image.'/icon_1.png';
		break;
		case 4:
		$link = 'equip/'.$ml.'/eff/'.$image.'/icon_1.png';
		break;
		case 5:
		$link = 'equip/'.$ml.'/cloth/'.$image.'/icon_1.png';
		break;
		case 6:
		$link = 'equip/'.$ml.'/face/'.$image.'/icon_1.png';
		break;
		case 7:
		$link = 'arm/'.$image.'/00.png';
		break;
		case 8:
		$link = 'equip/armlet/'.$image.'/icon.png';
		break;
		case 9:
		$link = 'equip/ring/'.$image.'/icon.png';
		break;
		case 13:
		$link = 'equip/'.$ml.'/suits/'.$image.'/icon_1.png';
		break;
		case 15:
		$link = 'equip/wing/'.$image.'/icon.png';
		break;
		case 14:
		$link = 'equip/necklace/'.$image.'/icon.png';
		break;
		case 16:
		$link = 'specialprop/chatBall/'.$image.'/icon.png';
		break;
		case 17;
		$link = 'equip/offhand/'.$image.'/icon.png';
		break;
		case 50;
		$link = 'petequip/arm/'.$image.'/icon.png';
		break;
		case 51;
		$link = 'petequip/hat/'.$image.'/icon.png';
		break;
	    case 52;
		$link = 'petequip/cloth/'.$image.'/icon.png';
		break;
		case 18;
		$link = 'cardbox/'.$image.'/icon.png';
		break;
		case 19;
		$link = 'equip/recover/'.$image.'/icon.png';
		break;
		case 27;
		$link = 'arm/'.$image.'/00.png';
		break;
		case 11:
		case 20;
		case 35;
		case 34;
		case 40;
		case 80;
		case 61;
		case 62;
		case 53;
		case 19;
		$link = 'unfrightprop/'.$image.'/icon.png';
		break;
		default:
		$link = NULL;
		break;
	}
	return $link;
} # Ket thuc ham loadimgae
function loadimagepet($image,$lv) {
	switch($lv){
		case 1;
		case 2;
		case 3;
		case 4;
		case 5;
		case 6;
		case 7;
		case 8;
		case 9;
		case 10;
		case 11;
		case 12;
		case 13;
		case 14;
		case 15;
		case 16;
		case 17;
		case 18;
		case 19;
		case 20;
		case 21;
		case 22;
		case 23;
		case 24;
		case 25;
		case 26;
		case 27;
		case 28;
		case 29;
		$icon = 1;
		break;
		case 30;
		case 31;
		case 32;
		case 33;
		case 34;
		case 35;
		case 36;
		case 37;
		case 38;
		case 39;
		case 40;
		case 41;
		case 42;
		case 43;
		case 44;
		case 45;
		case 46;
		case 47;
		case 48;
		case 49;
		$icon = 2;
		break;
		case 50;
		case 51;
		case 52;
		case 53;
		case 54;
		case 55;
		case 56;
		case 57;
		case 58;
		case 59;
		case 60;
		$icon = 3;
		break;	
	}
	
	$link = 'pet/'.$image.'/icon'.$icon.'.png';
	return $link;
}
function loadimaget($image) {
	$link = 'card/'.$image.'/icon.jpg';
	return $link;
}
function getContentName($tag) {
	switch($tag) {
		case "account":
		return 'Quản lý tài khoản - ';
		break;
		
		case "accountinfo":
		return 'Thông tin tài khoản - ';
		break;
		
		case "napthe":
		return 'Nạp GoCoin qua thẻ cào - ';
		break;
		
		case "napsms":
		return 'Nạp GoCoin qua SMS - ';
		break;
		
		case "history":
		return 'Lịch sử giao dịch - ';
		break;
		
		case "changepassword":
		return 'Đổi mật khẩu - ';
		break;
		
		case "changegoxu":
		return 'Đổi GoXu - ';
		break;
		
		case "webshop":
		return 'Cửa hàng - Webshop - ';
		break;
		
		case "rechangemoney":
		return 'Rollback GC Event - ';
		break;
		
		case "lostpassword":
		return 'Lấy lại mật khẩu - ';
		break;
		case "function":
		return "Tính năng VIP - ";
		break;
		case "eventmenu":
		return "Sự kiện - Quà tặng - ";
		break;
		case "giftcode":
		return "Nhận Giftcode - ";
		break;
		case "upgrade_card":
		return "Tẩy thẻ bài - ";
		break;
		case "magicstone":
		return "Nâng cấp ma thạch - ";
		break;
		case "pointms":
		return "Mua điểm ma thạch - ";
		break;
		case "changemoney":
		return "Đổi Xu - ";
		break;
		case "Invite":
		return "Mời Bạn Chơi - ";
		break;
		case "invite":
		return "Mời Bạn Chơi - ";
		break;
		case "deletepet":
		return "Xóa thú cưng - ";
		break;
		case "deleteitem":
		return "Xóa két sắt GUILD - ";
		break;
		case "quangcao":
		return "Quảng Cáo - ";
		break;
		case "daily":
		return "Quà điểm danh - ";
		break;
		case "vip":
		return "Quyền lợi VIP - ";
		break;
		case "codevip":
		return "Quà VIP - ";
		break;
		case "forgetemailorphone":
		return "Quên Email, SĐT - ";
		break;
		case "changeemail":
		return "Đổi Email - ";
		break;
		case "changephone":
		return "Đổi Số Điện Thoại - ";
		break;
		case "deletepassbag":
		return "Xóa Mật Khẩu Rương - ";
		break;
		case "checkcode":
		return "Lấy Giftcode - ";
		break;
		case "gift_sharecode":
		return "Lấy Giftcode Tháng 12 đợt 1 - ";
		break;
		case "gift_sharecode1":
		return "Lấy Giftcode Tháng 12 đợt 1 - ";
		break;
		case "gift_sharecode2":
		return "Lấy Giftcode Tháng 12 đợt 1 - ";
		break;
		default:
		return '';
		break;
	}
}
?>