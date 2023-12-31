let stars = [];

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("star-card");
}

function draw() {
  clear();

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    star.update();
    star.display();
  }
}

function mouseMoved() {
  if (mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {
    let star = new Star(mouseX, mouseY);
    stars.push(star);
  }
}

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(1, 5);
    this.alpha = 255;
    this.angle = random(TWO_PI);
    this.speed = random(1, 3);
  }

  update() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    this.alpha -= 5;

    if (this.alpha <= 0) {
      stars.splice(stars.indexOf(this), 1);
    }
  }

  display() {
    noStroke();
    push();
    translate(this.x, this.y);
    rotate(frameCount * 0.02);
    star(0, 0, this.radius * 2, this.radius, 5); // change the multiplier here to change the star radius, or change the last number to modify the number of points
    pop();
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
