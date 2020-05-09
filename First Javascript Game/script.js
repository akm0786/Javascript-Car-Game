
		const score=document.querySelector(".score");
		const startScreen=document.querySelector(".startScreen");
		const gameArea=document.querySelector(".gameArea");
		// console.log(score);

		startScreen.addEventListener('click',start);

		let player={speed:7,score:0};

		let keys = { ArrowUp : false,ArrowRight : false,ArrowLeft : false,ArrowDown : false }
		 
		document.addEventListener('keydown',keyDown);
		document.addEventListener('keyup',keyUp);

		function keyDown(e){

			e.preventDefault();
			keys[e.key]=true;
			// console.log(e.key);

			// console.log(keys);
		}
		function keyUp(e){

			e.preventDefault();
				keys[e.key]=false;
			
		}

		function isCollide(a,b){

			aRect=a.getBoundingClientRect();
			bRect=b.getBoundingClientRect();
			return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right))
		}

		function moveLines(){
			let lines=document.querySelectorAll('.lines');

			lines.forEach(function(item){

				if(item.y>=750){
					item.y-=900;
				}

				item.y+=player.speed;
				item.style.top=item.y+"px";
			})
		}

		function endGame(){

			player.start=false;
			startScreen.classList.remove("hide");
			startScreen.style.color='white';
			startScreen.innerHTML="Game Over <br>Your Score is <b> "+player.score+"</b><br>Click here to Restart the Game";
		}

		function moveEnemy(car){
			let enemy=document.querySelectorAll('.enemy');

			enemy.forEach(function(item){

				if(isCollide(car,item)){
					// console.log("wreck");
					endGame();
				}
				if(item.y>=770){
					item.y-=800;
						 item.style.left=Math.floor(Math.random()*330)+"px";
				}

				item.y+=player.speed;
				item.style.top=item.y+"px";
			})
		}

		function gamePlay(){
			// console.log("clicked");
			let car=document.querySelector(".car");
			let road =gameArea.getBoundingClientRect();
			// console.log(road);
			if(player.start){

				moveLines();
				moveEnemy(car);

				if(keys.ArrowUp && player.y>road.top+70){
					player.y-=player.speed
				}
				if(keys.ArrowDown && player.y<road.bottom-96){
					player.y+=player.speed
				}
				if(keys.ArrowLeft && player.x>0){
					player.x-=player.speed
				}
				if(keys.ArrowRight  &&player.x<(road.width-50)){
					player.x+=player.speed
				}

				car.style.top=player.y+"px";
				car.style.left=player.x+"px";

				window.requestAnimationFrame(gamePlay);
				// console.log(player.score++);
				player.score++;
				let ps=player.score-1;
				score.innerText="Score:"+ps;
			}
		}

		function start(){

			// gameArea.classList.remove("hide");
			gameArea.innerHTML="";
			startScreen.classList.add("hide");
			player.start=true;
			player.score=0;

			for(i=0;i<6;i++)
			{
				let roadLine=document.createElement('div');
				roadLine.setAttribute('class','lines');
				roadLine.y=(i*150);
				roadLine.style.top=roadLine.y+"px";
				gameArea.appendChild(roadLine);
			}
			let car=document.createElement('div');
			car.setAttribute('class','car');
			
			gameArea.appendChild(car);



			window.requestAnimationFrame(gamePlay);

			player.x=car.offsetLeft;
			player.y=car.offsetTop;

			// console.log(car.offsetTop);
			// console.log(car.offsetLeft);

			for(i=0;i<3;i++)
			{
				let enemyCar=document.createElement('div');
				enemyCar.setAttribute('class','enemy');
				enemyCar.y=((i+1)*250) * -1;
				enemyCar.style.top=enemyCar.y+"px";
				// enemyCar.style.background='blue';
				enemyCar.style.left=Math.floor(Math.random()*350)+"px";
				gameArea.appendChild(enemyCar);
			}
		}

