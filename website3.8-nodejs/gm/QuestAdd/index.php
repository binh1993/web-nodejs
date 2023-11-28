<?php
define('Gun4S.Net','Gun4S.Net',true);
include "../moddetail/connect.php";
$q = $data->query("Select MAX(ID) as ID FROM [Quest]");
/*while($result = $data->query_array($q)){
	$para1 = $result['Para1'];
	$detail = '';
	$dropid = $result['DropID'];
	$paraex = explode(",",$para1);
	//echo $paraex[count($paraex)-2]
	//echo count($paraex).'<br>';
	for($i=1;$i<count($paraex)-1;$i++){
	//echo $paraex[$i];
	$misid = $paraex[$i];
	$getname = $data->query("Select [Name] FROM [Mission_Info] where [Id] = '$misid'");
	$nameinfo = $data->query_array($getname);
	$detail .=$nameinfo['Name'].',';
	
	}
	$data->query("UPDATE [Drop_Condiction] SET Detail = N'$detail' where [DropID] = '$dropid'");
	//echo $detail;
	//echo '<br>';
	//echo $para1.'<br>';
}*/
$getID = $data->query_array($q);
$ID = $getID['ID']+1;
?>
<!DOCTYPE html>
<html>
<body>

<h2>Thêm Nhiệm Vụ</h2>

<form action="">
  ID:<br>
  <input type="text" readonly name="ID" value="<?php echo $ID?>">
  <br>
  Tên Nhiệm Vụ:<br>
  <input type="text" name="Title" value="">
  <br>
  Nội Dung:<br>
  <input type="text" name="Detail" value="">
  <br>
  Loại nhiệm vụ:<br>
  <select name="QuestID">
  <option value="0"> Nhiệm vụ chủ tuyến</option>
  <option value="1"> Nhiệm vụ phụ</option>
  <option value="2"> Nhiệm vụ hằng ngày</option>
  <option value="3"> Nhiệm vụ sự kiện</option>
  <option value="4"> Nhiệm vụ VIP</option>
  </select>
  <br>
   Cần Cấp Thấp Nhất:<br>
  <input type="text" name="NeedMinLevel" value="">
  <br>
   Cần Cấp Cao Nhất:<br>
  <input type="text" name="NeedMaxLevel" value="">
  <br>
  PreQuestID:<br>
  <input type="text" name="PreQuestID" value="0,">
  <br>
  NextQuestID:<br>
  <input type="text" name="NextQuestID" value="0,">
  <br>
   Có thể lặp lại:<br>
  <select name="CanRepeat">
  <option value="0"> Không</option>
  <option value="1"> Có</option>
  </select>
  <br>
  <input type="submit" value="Submit">
</form> 

</body>
</html>
