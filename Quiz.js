class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();

    background("yellow");
 
    var displayPos = 230

    textSize(20);
    text("Result Of The Quiz",width/2,50);

    Contestant.getPlayerInfo();

    if(allContestants != undefined){
       text("Note: the contestant who gave the correct answer is highlighted in green",130,230);

    for(var plr in allContestants){
      console.log(allContestants);
     var correctAns = "2"
     if(correctAns === allContestants[plr].answer)
       fill("green")
       else
       fill("red")
       displayPos += 30
       text(allContestants[plr].name+":"+allContestants[plr].answer,250,displayPos);
     }
  }
}
}
