<?php
define('Gun4S.Net','Gun4S.Net',true);
include "connect.php";
$q = $data->query("Select [DropID],[Para1] FROM [Drop_Condiction] where [CondictionType] = 5");
while($result = $data->query_array($q)){
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
}
echo $data->query_num($q);
?>