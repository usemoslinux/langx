<?php 

require_once('connect.php');

class ArchivedTexts extends Texts
{
    public function __construct($con, $user_id, $learning_lang_id, $order_by) {
        parent::__construct($con, $user_id, $learning_lang_id, $order_by);
        $this->table = 'archivedtexts';
        $this->cols = array(
            'id' => 'atextId',
            'userid' => 'atextUserId', 
            'lgid' => 'atextLgId', 
            'title' => 'atextTitle', 
            'author' => 'atextAuthor', 
            'text' => 'atext', 
            'sourceURI' => 'atextSourceURI', 
            'audioURI' => 'atextAudioURI', 
            'type' => 'atextType');
    }

    // ids must be in json format
    public function unarchiveByIds($ids) {
        $textIDs = $this->convertJSONtoCSV($ids);

        $insertsql = "INSERT INTO texts (textUserId, textLgID, textTitle, textAuthor, text, textAudioURI, textSourceURI, TextType)
                SELECT atextUserId, atextLgID, atextTitle, atextAuthor, atext, atextAudioURI, atextSourceURI, aTextType 
                FROM archivedtexts WHERE atextID IN ($textIDs)";
        $deletesql = "DELETE FROM archivedtexts WHERE atextID IN ($textIDs)";
        
        if ($result = $this->con->query($insertsql)) {
            $result = $this->con->query($deletesql);
        }
        
        return $result;
    }
}


?>