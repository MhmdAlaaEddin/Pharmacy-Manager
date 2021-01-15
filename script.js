var db=openDatabase('database','1.0','login database',2*1024*1024)

db.transaction( function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id unique,username,password,type)');
    tx.executeSql('INSERT INTO USER (id,username,password,type) VALUES (1,"ali","123","manger")');
    tx.executeSql('INSERT INTO USER (id,username,password,type) VALUES (2,"eslam","123","seller")');
    tx.executeSql('INSERT INTO USER (id,username,password,type) VALUES (3,"eman","123","seller")');

});
db.transaction( function(tx) {
    
    tx.executeSql('INSERT INTO USER (id,username,password,type) VALUES (2,"eslam","123","seller")');
    tx.executeSql('INSERT INTO USER (id,username,password,type) VALUES (3,"eman","123","seller")');

});
  
var users =[],pass=[],types=[];
db.transaction(function(tx){
    tx.executeSql('SELECT * FROM USER',[],function(tx,result){
        for(var i =0; i<result.rows.length;i++)
        {
            users[i]=result.rows.item(i).username;
            pass[i]=result.rows.item(i).password;
            types[i]=result.rows.item(i).type;

        }

    })
});
//-----------------------------------
function login(){
    let formUsername = document.getElementById("username").value;
    let formPassword = document.getElementById("password").value;
    for(var i=0;i<users.length;i++)
    {
        if(users[i]==formUsername&&pass[i]==formPassword&&types[i]=="manger")
        {
           window. location.replace("file:///E:/.M_alaaeddin/Pharmacy%20Manager/homeMG.html")

          
            break;
            
        }
        else if (users[i]==formUsername&&pass[i]==formPassword&&types[i]=="seller")
        {
            location.href = 'home.html';
            break;
        }
        else if (i==users.length-1) {alert("Try Agin");}
    }
}