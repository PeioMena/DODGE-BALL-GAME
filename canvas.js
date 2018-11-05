var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

//c = context baina oso luzeea da idaztekohorregaitik deitu c
var c = canvas.getContext("2d");

var puntoak = 0;
var puntoGlobalak = 0;
var asteroidKop = 1;
var gelditu = 0;

DodgeBall = new DodgeBall(innerWidth/2, innerHeight/2, 30)
text1 = new text(innerWidth/2-50, 30, puntoak)

var mouse = 
{
	x: innerWidth/2,
	y: innerHeight/2
}

window.addEventListener("mousemove", function (event)
{
	mouse.x = event.x;
	mouse.y = event.y;
})

function text(x, y, puntoGlobalak)
{
	this.x = x;
	this.y = y;
	this.puntoGlobalak = puntoGlobalak;

	this.drawText = function ()
	{
		c.font = "30px Arial";
		c.strokeText("Puntuak: "+puntoak, x, y);

	}
	this.updateText = function()
	{
		this.x = x;
		this.y = y;
		this.puntoGlobalak = puntoGlobalak;

		this.drawText();
	}
}

function DodgeBall(x, y, radius)
{
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.draw2 = function()
	{
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = "red";
		c.fillStyle = "red";
		c.fill();
		c.stroke();
	}
	this.update2 = function ()
	{
		this.x = mouse.x;
		this.y = mouse.y;

		this.draw2();
	}
}
	

function Asteroid(x, y, radius) 
{
	this.x = x;
	this.y = y;
	this.dx = (Math.random() +1) * 4;
	this.dy = (Math.random() +1) * 4;
	this.radius = radius;
	this.puntoak = 0;
	

	this.draw = function() 
	{

		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = "blue";
		c.fillStyle = "blue";
		c.fill();
		c.stroke();
	}

	this.update = function() 
	{
		if (this.x + this.radius> innerWidth || this.x-this.radius < 0) 
		{
			this.dx = -this.dx;	
			puntoak += 1;		
		}

		//pantailatik ez urtetako
		if (this.y + this.radius> innerHeight || this.y-this.radius < 0) 
		{
			this.dy = -this.dy;		
			puntoak += 1;		
		}
		if (getDistance(this.x, this.y, mouse.x, mouse.y) - this.radius * 2 < 0)
		{
			gelditu = 1;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();

		for ( var q = 0; q < asteroidArray.length; q++)
		{
			if (this === asteroidArray[q])
			{
				continue
			}

			if (getDistance(this.x, this.y, asteroidArray[q].x, asteroidArray[q].y) - this.radius * 2 < 0)
			{
				resolveCollision(this.x, this.y, asteroidArray[q].x, asteroidArray[q].y);
			}
		}

		return puntoak
	}
}

function getDistance (x1, y1, x2, y2)
{
	var xDistance = x2 - x1;
	var yDistance = y2 - y1;

	return Math.sqrt(Math.pow(xDistance, 2)+Math.pow(yDistance, 2));
}

function resolveCollision(particle, otherParticle)
{
	const xVelocityDiff = particle.dx - otherParticle.dy;
	const yVelocityDiff = particle.dy - otherParticle.dy;
 
	const xDist = otherParticle.x - particle.x;
	const yDist = otherParticle.y - particle.y;

	if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0)
	{
		const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x)

		const m1 = particle.mass;
		const m2 = otherParticle.mass;

		const u1 = c.rotate(particle.velocity, angle);
		const u2 = c.rotate(otherParticle.velocity, angle);

		const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
		const v2 = {x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};

		const vFinal1 = c.rotate(v1, -angle);
		const vFinal2 = c.rotate(v2, -angle);

		particle.dx = vFinal1.x;
		particle.dy = vFinal1.y;

		otherParticle.dx = vFinal2.x;
		otherParticle.dy = vFinal2.y;
	}
}

function kontatu ()
{
		if (this.x + this.radius> innerWidth || this.x-this.radius < 0) 
		{
			puntoak += 1;			
		}

		//pantailatik ez urtetako
		if (this.y + this.radius> innerHeight || this.y-this.radius < 0) 
		{
			puntoak += 1;			
		}
		return puntoak;
}

	
var asteroidArray = [];
//asteroideen irteera

function hasieratu()
{

	setTimeout(hasieratu, 5*1000);
	asteroidKop++;

	//for (var d = 0; d<asteroidKop; d++)
	//{

		var x = 0;
		var y = 0;
		var radius = 20;
		var random = Math.random() * 4;
		var tmp = 15;

		var norabideaX = Math.random()-0.5
		var norabideaY = Math.random()-0.5

		//Asteroidearen irteera aleatorioa
		if (random < 1 && random > 0) 
		{
			x = 0 + radius;
			y = Math.random() * (innerHeight - radius*2)+radius;

			//Beste bat agertu dan leku bardinean ez agertzeko
			if (asteroidKop !== 0)
			{
				for (var j = 0; j < asteroidArray.length; j++)
				{
					if (getDistance(x, y, asteroidArray[j].x, asteroidArray[j].y) - radius * 2 < 0)
					{
						y = Math.random() * (innerHeight - radius*2)+radius;

						j = -1;
					}
				}
			}
		}

		//Asteroidearen irteera aleatorioa
		if (random < 2 && random > 1) 
		{
			x = Math.random() * (innerWidth - radius*2)+radius;
			y = 0 + radius;

			//Beste bat agertu dan leku bardinean ez agertzeko
			if (asteroidKop !== 0)
			{
				for (var j = 0; j < asteroidArray.length; j++)
				{
					if (getDistance(x, y, asteroidArray[j].x, asteroidArray[j].y) - radius * 2 < 0)
					{
						x = Math.random() * (innerWidth - radius*2)+radius;

						j = -1;
					}
				}
			}
		}

		//Asteroidearen irteera aleatorioa
		if (random < 3 && random > 2) 
		{
			x = Math.random() * (innerWidth - radius*2)+radius;
			y = innerHeight - radius;

			//Beste bat agertu dan leku bardinean ez agertzeko
			if (asteroidKop !== 0)
			{
				for (var j = 0; j < asteroidArray.length; j++)
				{
					if (getDistance(x, y, asteroidArray[j].x, asteroidArray[j].y) - radius * 2 < 0)
					{
						x = Math.random() * (innerWidth - radius*2)+radius;

						j = -1;
					}
				}
			}
		}

		//Asteroidearen irteera aleatorioa
		if (random > 3) 
		{
			x = innerWidth - radius;
			y = Math.random() * (innerHeight - radius*2)+radius;

			//Beste bat agertu dan leku bardinean ez agertzeko
			if (asteroidKop !== 0)
			{
				for (var j = 0; j < asteroidArray.length; j++)
				{
					if (getDistance(x, y, asteroidArray[j].x, asteroidArray[j].y) - radius * 2 < 0)
					{
						y = Math.random() * (innerHeight - radius*2)+radius;

						j = -1;
					}
				}
			}
		}




		asteroidArray.push(new Asteroid(x, y, radius))
	//}
}

function doOpen(url){
        document.location.target = "_blank";
        document.location.href=url;
    }

function goToFinal () 
{
	doOpen("FinalScreen.html")
}

function animate() 
{
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	if (gelditu == 0)
	{
		for (var i = 0; i < asteroidArray.length; i++) 
		{
			asteroidArray[i].update();
		}

		DodgeBall.update2();
	}

	text1.updateText();

	if (gelditu == 1)
	{
		setTimeout(goToFinal, 2*1000);

	}
}

hasieratu();
animate();