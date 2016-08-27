$(document).ready(function(){

	//Initialise Variables
	 var myHealthScore = 0;
	 var enemyHealthScore = 0;
	 var myAttackNum = 0;
	 var enemyAttackNum =0;
	 var myCharacterChoosen = false;
	 var myEnemyChoosen = false;
   var enemyCount = 0;


     //Store the player list div html in a variable
     var playerListDivHolder = $("#playersListClone").clone(true,true);

     
	// Hide Fight Ring Row at the Start of Game
    $("#playersListClone").hide();
    $("#fightRing").hide();
    $(".attackBtnHolder").hide();
    $(".restartBtnHolder").hide();

    // resetPlayerList = function(){

    //     console.log(playerListDivHolder);

    //     //$(playerListDivHolder).appendTo("#playersListMain");
    //     $("#playersListMain").replaceWith(playerListDivHolder);
        
    //     //Empty playersListMain div
    //     $("#playersFighting").empty();
    //    // $("#playersListMain").hide();

    //     console.log("Inside RESET");
        
    //     $("#fightRing").hide();
       
    //     $("#playersList").show();
    //     //Append the stored html to playerlist main
       

    // }

  //Health Power generator function
    healthPower = function(){

    	$(".player").each(function(){
    		var hp = (Math.floor(Math.random() * 100)) + (Math.floor(Math.random() * 10));
    		//console.log("Numbers for hp : " + hp);
    		//assign heathPower to player
    		$(this).attr("data-hp", hp);
    		$(this).find("#healthScore").text($(this).data("hp"));
    	});
    }
    //Attack power Generator Function
    attackPower = function(){

    	$(".player").each(function(){
    		var ap = (Math.floor(Math.random() * 10)) + (Math.floor(Math.random() * 10));
    		//console.log("Numbers for ap : " + ap);
    		$(this).attr("data-ap", ap);
    		//assign attackPower to player
    	});

    }

    healthPower();
    attackPower();



    //Select My Character and Enemy
    $("body").on("click", ".player", function(){

    	// Select My Character and colour selected image green and Highlight rest as enemies in red
    	if (myCharacterChoosen == false) {

    		var player = $(this);

    		//get id of clicked player
	    	var selectedPlayer = $(this).attr("id");
	    	//Create image id for getting src attribute of player image
	    	var selectedPlayerImageId = "#" + selectedPlayer + "Image";
	    	//get src of selected player image
	    	var selectedPlayerImageSrc = $(selectedPlayerImageId).attr("src");

	    	//Highlight selected player image to green color
	    	$(selectedPlayerImageId).addClass("myCharacterStyle");
	    	$(this).attr("data-character", "hero");

	    	myHealthScore = parseInt($(this).attr("data-hp"));
	    	myAttackNum = parseInt($(this).attr("data-ap"));
	    	
	    	console.log("My Health : " + myHealthScore + "My Attack Num" + myAttackNum);

	    	myCharacterChoosen = true;
	    	    	
	    	//for each player class div
	    	$(".player").each(function(){
	    	  // if its not the selected player mark them as enemy
	    	  if (this.id !== selectedPlayer) {
	    	  	//console.log("Inside Paint Enemy Red : " + this.id);
	    	  	//Find the img html tag inside the .player div and add new css properties
              	$(this).find("img").addClass("enemyStyle");
              }//player id compare if ends
        	});//for each .player loop ends

        	 //$(this).prop('onclick',null).off('click');

        	 $(player).appendTo("#playersFighting");

	    	// update text to select enemy
	    	$(".selectPlayers").html("Select Enemy To Start Attack");

	    	 $("#fightRing").show();
	    	// console.log("My character is selected : " + myCharacterChoosen);

	    	 
    	}else if(myEnemyChoosen == false){

    		//Select Enemy
    		var player = $(this);  

    		//get id of clicked player
	    	var selectedPlayer = $(this).attr("id");
	    	//Create image id for getting src attribute of player image
	    	var selectedPlayerImageId = "#" + selectedPlayer + "Image";
	    	//get src of selected player image
	    	var selectedPlayerImageSrc = $(selectedPlayerImageId).attr("src");

	    	//Highlight selected player image to red color
	    	$(selectedPlayerImageId).addClass("myEnemyStyle");
	    	$(this).attr("data-character", "enemy");

	    	enemyHealthScore = parseInt($(this).attr("data-hp"));
	    	enemyAttackNum = parseInt($(this).attr("data-ap"));

	    	console.log("Enemy Health : " + enemyHealthScore + "Enemy Attack Num" + enemyAttackNum);

	    	myEnemyChoosen = true;	 

	    	//disable click on this player
	    	// $(this).prop('onclick',null).off('click');
	    	 $(player).appendTo("#playersFighting");

	    	 //Show Attack Button to start attack.
             $(".restartBtnHolder").hide();
	    	 $(".attackBtnHolder").show(); 
             
	 
	    	 //Hide select player message
	    	 $(".selectPlayers").hide();
	    	   	 
    	}
    })// .player onclick ends


    $("#attackBtn").on("click", function(){

    	myHealthScore = myHealthScore + (myAttackNum - enemyAttackNum);
    	enemyHealthScore = enemyHealthScore + (enemyAttackNum - myAttackNum);

    	console.log("My Score post Attack : " + myHealthScore + "Enemy Score post Attack : " + enemyHealthScore);

    	console.log("Inside Attack Button onclick");

    	if(myHealthScore <= 0 || enemyHealthScore <= 0){    

    		if(myHealthScore <= 0){

               $("h2.pfblock-title.fightRingTitle").html("YOU LOOSE!!! Lets Start A New Game");
               $("h2.pfblock-title.fightRingTitle").show();

                $(".attackBtnHolder").hide();
                $(".restartBtnHolder").show(); 		
                
                $("#playersList").hide();
    			       console.log("I Loose: Restart Game");

                $("div[data-character = 'hero']").hide();
               


    		}else if(enemyHealthScore <= 0){

    			$("h2.pfblock-title.fightRingTitle").html("YOU WON ! Select Next Enemy");
          $("h2.pfblock-title.fightRingTitle").show();

                enemyCount++;

    			      console.log("Enemy Is Defeated : Select Next Enemy" + enemyCount);

                $("div[data-character = 'enemy']").hide();
                myCharacterChoosen = true;                
                myEnemyChoosen = false;

                if(enemyCount >= 3){

                     $("h2.pfblock-title.fightRingTitle").html("YOU WON !!!!!!!!!");
                     $("h2.pfblock-title.fightRingTitle").show();

                     $("#playersList").hide();
                     
                     $(".attackBtnHolder").hide();
                     $(".restartBtnHolder").show();
                }
    		}    	

    	}else{

    	$("#playersFighting div[data-character = 'hero'] #healthScore").html(myHealthScore);
    	$("#playersFighting div[data-character = 'enemy'] #healthScore").html(enemyHealthScore);	

    	myAttackNum = (Math.floor(Math.random() * 10)) + (Math.floor(Math.random() * 10));

    	console.log("My New myAttackNum : " + myAttackNum);

    	}    	
    })//Attack Ends

    // $("#restartBtn").on("click", function(){


    //     $("h2.pfblock-title.fightRingTitle").html("");
    //     $("h2.pfblock-title.fightRingTitle").hide();


    //     $(".attackBtnHolder").hide();
    //     $(".restartBtnHolder").hide();



    //      $(".selectPlayers").html("Lets Play!!");
    //      $(".selectPlayers").show();
       
    //      myHealthScore = 0;
    //      enemyHealthScore = 0;
    //      myAttackNum = 0;
    //      enemyAttackNum =0;
    //      enemyCount = 0;
         
    //      myCharacterChoosen = false;
    //      myEnemyChoosen = false;

    //      resetPlayerList();
    //      healthPower();
    //      attackPower();

    // })//restart ends




});