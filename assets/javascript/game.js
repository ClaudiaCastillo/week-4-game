

var characters = [];

var characterName = "";
var defemderName  = "";

var i2 = 0;
var enemiesCounter = 0;
var characterHPValue = 0;   
var defenderHPValue  = 0;
var characterAttackPower = 0;
var defenderAttackPower  = 0;
var characterBaseAttackPower = 8;

var gameOver = false;
var displayButton = true;



function setAll(){
  characters = [[100, "assets/images/anakin_skywalker", 0, "Anakin", 15], 
                [150, "assets/images/darth_vader", 0, "Darth", 20], 
                [120, "assets/images/kylo_ren", 0, "Kylo", 5], 
                [180, "assets/images/luke_skywalker", 0, "Luke", 25]];

  characterName = "";
  defemderName  = "";

  i2 = 0;
  enemiesCounter = 0;
  characterHPValue = 0;   
  defenderHPValue  = 0;
  characterAttackPower = 0;
  defenderAttackPower  = 0;
  characterBaseAttackPower = 8;

  gameOver = false;
  displayButton = true;

  $("#characters").empty();
  $("#yourCharText").empty();
  $("#enemies").empty();
  $("#enemiesAvailText").empty();
  $("#fight").empty();
  $("#fightText").empty();
  $("#fightButton").empty();
  $("#defender").empty();
  $("#defenderText").empty();
  $("#game1Message").empty();
  $("#game2Message").empty();
}


function showCharacterImages()
{
  for (var i1 = 0; i1 < characters.length; i1++) {
    var html = "<p>Click on the character you would like to select</p>";
    document.querySelector('#yourCharText').innerHTML = html;

    var imageCharacter = $("<img>");
    imageCharacter.addClass("sw-image");

    var imgStr = characters[i1][i2+1] + ".png"; 

    console.log(" init image string " + imgStr);

    imageCharacter.attr("src", imgStr);
    imageCharacter.attr("data-charactervalue",characters[i1][i2]);

    console.log(" init image value :" + characters[i1][i2]);

    $("#characters").append(imageCharacter);
  }
}

  

function selectYourCharacter()
{

  console.log(" *** selectCharacter Test 1");
  $(".sw-image").one("click", function() {
    console.log(" *** selectCharacter Test 2");
    var characterValue = ($(this).attr("data-charactervalue"));
    characterHPValue = parseInt(characterValue);

    console.log(" *** character HP value " + characterHPValue);

    $("#characters").empty();

    for (var i1 = 0; i1 < characters.length; i1++) {

      if (characters[i1][i2] != characterHPValue) {
        var html = "<p>Enemies Available To Attack (click to select a defender)</p>";
        document.querySelector('#enemiesAvailText').innerHTML = html;

        var imageCharacter = $("<img>");
        imageCharacter.addClass("sw-image sw-enemies");

        var imgStr = characters[i1][i2+1] + ".png";

        console.log(" enemy jpg string " + imgStr);

        imageCharacter.attr("src", imgStr);
        imageCharacter.attr("data-charactervalue",characters[i1][i2]);

        console.log(" enemy HP value :" + characters[i1][i2]);

        $("#enemies").append(imageCharacter);
      }
      else{
        var html = "<p>Your Character</p>";
        document.querySelector('#yourCharText').innerHTML = html;

        characterName = characters[i1][i2+3];

        var imageCharacter = $("<img>");
        imageCharacter.addClass("sw-image sw-character");

        var imgStr = characters[i1][i2+1] + ".png";

        characters[i1][i2+2] = 1;

        console.log(" your character jpg string " + imgStr);

        imageCharacter.attr("src", imgStr);
        imageCharacter.attr("data-charactervalue",characters[i1][i2]);

        console.log(" your character HP value :" + characters[i1][i2]);

        $("#characters").append(imageCharacter);
      }
    }
    console.log(" dump array after char sel " + characters);

    selectDefender();

  });
}


function selectDefender()
{
  console.log(" *** selectDefender Test 1");

  $(".sw-enemies").one("click", function() {

    console.log(" *** selectDefender Test 2");

      var characterValue = ($(this).attr("data-charactervalue"));
      defenderHPValue = parseInt(characterValue);

      console.log(" *** enemies HP value " + characterValue);

      $("#enemies").empty();
      
      
      for (var i1 = 0; i1 < characters.length; i1++) {

        if (characters[i1][i2+2] === 0) {

          enemiesCounter = 0;

          if (characters[i1][i2] != defenderHPValue) {
            var html = "<p>Enemies Available To Attack</p>";
            document.querySelector('#enemiesAvailText').innerHTML = html;

            enemiesCounter = enemiesCounter + 1;
            
            var imageCharacter = $("<img>");
            imageCharacter.addClass("sw-image sw-enemies");

            var imgStr = characters[i1][i2+1] + ".png";

            console.log(" enemies jpg string " + imgStr);

            imageCharacter.attr("src", imgStr);
            imageCharacter.attr("data-charactervalue",characters[i1][i2]);

            console.log(" enemies HP value: "+characters[i1][i2]+" enemies counter: "+enemiesCounter);

            $("#enemies").append(imageCharacter);
          }
          else{
            var html = "<p>Defender</p>";
            document.querySelector('#defenderText').innerHTML = html;

            var html = "<p>Fight Section</p>";
            document.querySelector('#fightText').innerHTML = html;

            defemderName = characters[i1][i2+3];
            defenderAttackPower = characters[i1][i2+4];

            var buttonText = "Attack";

            if (displayButton){
              generateButton(buttonText);
            }

            var imageCharacter = $("<img>");
            imageCharacter.addClass("sw-image sw-defender");
            
            var imgStr = characters[i1][i2+1] + ".png";

            console.log(" defender jpg string " + imgStr);

            imageCharacter.attr("src", imgStr);
            imageCharacter.attr("data-charactervalue",characters[i1][i2]);

            console.log(" defender HP value :" + characters[i1][i2]);

            characters[i1][i2+2] = 1; 

            $("#defender").append(imageCharacter);
          }
        }
      }
      console.log(" dump array after defender sel " + characters);

      attack();

      console.log(" returned from attack function ");

    });
}


function generateButton(buttonText)
{
  console.log(" *** fight button function ");

  var fightBtn = $("<button>");

  fightBtn.addClass("fight-button");
  fightBtn.attr("data-letter", "fight");
  fightBtn.text(buttonText);

  $("#fightButton").append(fightBtn);

  displayButton = false;
}


function attack()
{
  console.log(" *** attack function ");


  $(".fight-button").on("click", function() {

    characterAttackPower = characterAttackPower + characterBaseAttackPower;

    var html = "<p>You attacked "+defemderName+" for "+characterAttackPower+" damage."+"</p>" +
    "<p>"+defemderName+" attacked you back for "+defenderAttackPower+" damage."+"</p>";

    document.querySelector('#game1Message').innerHTML = html;

    characterHPValue = characterHPValue - defenderAttackPower;
    defenderHPValue = defenderHPValue - characterAttackPower;

    console.log(" char HP new value: "+characterHPValue);
    console.log(" deft HP new value: "+defenderHPValue);
   
    console.log(" *** checkAttackStats ");

    if (characterHPValue <= 0) {
      console.log(" you have been defeated ");
      var html = "<p>You have been defeated!</p>" + "<p>Game Over!</p>";
      document.querySelector('#game2Message').innerHTML = html;
      gameOver = true;
    }

    if (defenderHPValue <= 0 && enemiesCounter === 0) {
      console.log(" you have won ");
      var html = "<p>You have won!</p>" + "<p>Game Over!</p>";
      document.querySelector('#game2Message').innerHTML = html;
      gameOver = true;
    }

    if(gameOver){

      $("#fightButton").empty();
      var html = "<p>Restart Game</p>";
        document.querySelector('#fightText').innerHTML = html;

      $("#fightButton").empty();

      var buttonText = "Restart Game";
      generateButton(buttonText);

      $(".fight-button").on("click", function() {
        init();
      });
            
      // reset button
      // when reset button hit
      // init();
    }
    else
    {
      if(defenderHPValue > 0)
      {
        var html = "<p>Health Points left for your character are :"+characterHPValue+"</p>" +
          "<p>Health Points left for "+defemderName+" are: "+defenderHPValue+"</p>" +
          "<p>Attack again!</p>";

        document.querySelector('#game2Message').innerHTML = html;

        attack();

      }
      else 
      {
        $("#defender").empty();

        var html = "<p>Health Points left for your character are :"+characterHPValue+"</p>" +
          "<p>Health Points left for "+defemderName+" are: "+defenderHPValue+"</p>" +
          "<p>Please select a new enemy!</p>";

        document.querySelector('#game2Message').innerHTML = html;

        selectDefender();
      }
    }

  });

}

function init(){
  setAll()
  showCharacterImages();
  selectYourCharacter();
}


window.onload = init();