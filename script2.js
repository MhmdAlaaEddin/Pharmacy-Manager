// important note : item price in data base named is (iteamPrice) 
var counter = 1;
function add()
{
    var name =document.getElementById("name").value;
    var qun= document.getElementById("quan").value;
    var invo= document.getElementById("invoice");
    
    
    var p = document.createElement("P");                 
         p.innerHTML = name;                
    invo.appendChild(p);
    p.id="1";
    p.className=`col-5 ${counter}`;
    var t = document.createElement("P");                 
         t.innerHTML = qun;                
    invo.appendChild(t);
    t.id="2";
    t.className=`col-5 ${counter}`;    
    counter =counter+1;
}
var db=openDatabase('database','1.0','login database',4*1024*1024)
db.transaction( function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS Item (id uniqe,itemName,Quantity,iteamPrice,Base64)');
});
db.transaction( function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS invoice (idInvoice ,idItem,itemName,Quantity,iteamPrice)');
});

     function drwa(){
        var Base;
        var context= canvas.getContext('2d');
        context.drawImage(video ,0,0,200,200);
          Base = canvas.toDataURL();
          return Base;
    };
    //---------------------------------------------------------------------------
var id = 1;
var Bname , Bquan ,Iprice;
function additem(){
    
     Bname = document.getElementById("Bname").value;
     Bquan = document.getElementById("Bquan").value;
     Iprice = document.getElementById("Iprice").value;
    var Base64=drwa();
    db.transaction(function (tx) { 
    tx.executeSql('INSERT INTO Item (id ,itemName,Quantity,iteamPrice,Base64) VALUES (?, ?,?,?,?)'
    ,[id,Bname,Bquan,Iprice,Base64]); 
 })
    id=id+1;
 }
     //---------------------------------------------------------------------------
     var iid=0;
     var nname , qun;
     var idItem;
             var priceItem;
             var Quantity;
             function selector ()
             {
                db.transaction(function(tx){
                  
                })
             }
function sell(){
     nname =document.getElementById("name").value;
     qun= document.getElementById("quan").value;
     db.transaction(function(tx){

     tx.executeSql(`SELECT * FROM Item where itemName='${nname}'`,[],function(tx,result){
        idItem=result.rows.item(0).id;
        priceItem=result.rows.item(0).iteamPrice;
        Quantity=result.rows.item(0).Quantity;
        
  })
})
      db.transaction(function (tx) { 
        tx.executeSql('INSERT INTO invoice (idInvoice ,idItem,itemName,Quantity,iteamPrice) VALUES (?, ?,?,?,?)'
        ,[iid,idItem,nname,qun,priceItem]); 
     })
     db.transaction(function (tx) { 
        
        if(Quantity==qun)
        {
 tx.executeSql(`DELETE FROM Item WHERE itemName='${nname}';`);
        }
        else if(Quantity>qun)
        {
           var newqun=Quantity-qun;
           tx.executeSql('update Item set Quantity=? where ItemName=?', [newqun, nname])
        }
     })
iid=iid+1;
}

function search()
{
    var valSearch = document.getElementById("searchName").value;
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM Item',[],function(tx,result){
            for(var i=0;i<result.rows.length;i++)
            {
                if(valSearch==result.rows.item(i).itemName){
                    document.getElementById("res").innerHTML = `Item is founded and his Quantity is ${result.rows.item(i).Quantity}`;
                    break;
                }
                else
                {
                    document.getElementById("res").innerHTML = "Item is not Founded";
                }
            }
    
        })
    });
}

//-------------------------------------------

function adduser(){
    var id = document.getElementById("userid").value;
    var username = document.getElementById("usernamename").value;
    var password = document.getElementById("userpassword").value;
    var type = document.getElementById("type").value;
    db.transaction(function (tx) { 
    tx.executeSql('INSERT INTO USER (id, username, password, type) VALUES (?, ?,?,?)',[id,username,password,type]); 
 })
    
 }