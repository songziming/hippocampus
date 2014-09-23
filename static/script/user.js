/**
 * Created by WunG on 2014/9/1.
 */
function Card(cardId,parentId,brotherId,contentString){
    this.cardid=cardId;
    this.parentId=parentId;
    this.brotherId=brotherId;
    this.contentstring=contentString;
    console.log(this.cardid+" "+this.parentId+" "+this.brotherId+" "+this.contentstring);
}

