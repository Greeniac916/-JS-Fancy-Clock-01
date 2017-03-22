function Dot(x, y) {
  this.size = 4;
  this.pos = createVector(x, y);
  this.target = createVector();
  this.vel = createVector();
  this.acc = createVector();
  this.maxspeed = 17;
  this.maxforce = 2.5;
  this.color = 255;

  this.show = function() {
    stroke(this.color);
    strokeWeight(this.size);
    point(this.pos.x, this.pos.y);
  }

  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  this.force = function() {
    var desired = p5.Vector.sub(this.target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.acc.add(steer);
  }

  this.newTarget = function(x, y) {
    this.target = createVector(x, y);
  }

}
