var trex, trex_running, edges;
var groundImage;
var chao
var nuvens
var cactos
var JOGAR=1
var ENCERRAR=0
var estadoJogo=JOGAR
var pontos=0
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloud1 =loadImage("cloud.png")
  cact1=loadImage("obstacle1.png")
  cact2=loadImage("obstacle2.png")
  cact3=loadImage("obstacle3.png")
  cact4=loadImage("obstacle4.png")
  cact5=loadImage("obstacle5.png")
  cact6=loadImage("obstacle6.png")
  gameove=loadImage("gameOver.png")
  restar=loadImage("restart.png")
  rexmorto=loadAnimation("trex_collided.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",rexmorto);
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  chao=createSprite(1188,190,0,5);
  chao.addImage(groundImage);
  chao2=createSprite(50,194,0,5)
  chao2.visible=false 
  ceu=createSprite(60,50,0,5)
  ceu.visible=false
  restart=createSprite(width/2,120,10,10);
  restart.addImage(restar)
  gameover=createSprite(width/2,75,10,10);
  gameover.addImage(gameove)
  restart.scale=0.5
                                      

  grupocactos=new Group()
  gruponuvens=new Group()
}


function draw(){
  background("white");
  text("Pontuação: "+pontos,10,20)
    if(estadoJogo===JOGAR){
    pontos=pontos+(frameCount%3===0)
    trex.velocityY = trex.velocityY + 0.5;
    gameover.visible=false
    restart.visible=false
    chao.velocityX=-10
    gerarcactos();
    gerarnuvens();
    if (chao.x<0){
    chao.x=1188
  }
    if(keyDown("space")&&trex.y>160||touches.length>0){  
      touches=[]
      trex.velocityY = -10;
      
    }
    if(grupocactos.isTouching (trex)){
      estadoJogo=ENCERRAR
    }
  }
  else if(estadoJogo===ENCERRAR){
    chao.velocityX=0
    grupocactos.setVelocityXEach(0)
    gruponuvens.setVelocityXEach(0)
    grupocactos.setLifetimeEach(-1)
    gruponuvens.setLifetimeEach(-1)
    gameover.visible=true
    restart.visible=true
    trex.changeAnimation("collided",rexmorto)
    if(mousePressedOver(restart)){
     bala()
    }
    

  }
  //definir a cor do plano de fundo 
  
  //registrando a posição y do trex
  
  
  //pular quando tecla de espaço for pressionada
  //gravidade
  //chao andando pra trás
 //impedir que o trex caia
  trex.collide(chao2)
  //chao infinito
  trex.collide(ceu)
  drawSprites();
}
function gerarnuvens(){
  if(frameCount%60===0){
  nuvens=createSprite(width,random(40,100))
  gruponuvens.add(nuvens)
  nuvens.velocityX=-5
  nuvens.addImage(cloud1)
  nuvens.lifetime=width/4
  trex.depth=trex.depth
  nuvens.depth=trex.depth-1
  gameover.depth=trex.depth
  }
}
function gerarcactos(){
  if(frameCount%50===0){
  cactos=createSprite(width,170)
  grupocactos.add(cactos)
  cactos.velocityX=-10
  var pato=Math.round(random(1,6))
  cactos.scale=0.5;
  cactos.lifetime=600/4
  switch(pato){
    case 1:cactos.addImage(cact1);
    break;
    case 2:cactos.addImage(cact2);
    break;
    case 3:cactos.addImage(cact3);
    break;
    case 4:cactos.addImage(cact4);
    break;
    case 5:cactos.addImage(cact5);
    break;
    case 6:cactos.addImage(cact6);
    break;
    default:break;
  }
  trex.depth=trex.depth
  cactos.depth=trex.depth-1
}
}
function bala(){
  gruponuvens.destroyEach()
  grupocactos.destroyEach()
  pontos=0
  trex.changeAnimation("running", trex_running)
  estadoJogo=JOGAR
}