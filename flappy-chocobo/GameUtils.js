var DrawingUtils = {
  drawShapes: function(shapes, ctx){
    for (var i = 0; i < shapes.length; i++){
      var shape = shapes[i];
      if(shape.image !== undefined){
        ctx.drawImage(shape.image, shape.x, shape.y, shape.width, shape.height);
      }else{
        ctx.fillStyle = shape.color;
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height); 
      }
      
    }
  }
}

var GameUtils = {
  areColliding : function(rect1, rect2){
    if (rect1.x < rect2.x + rect2.width + (rect2.width/2) &&
        rect1.x + rect1.width - (rect2.width/2) > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        return true;
    }
    return false;
  },
  isOnTheGroud : function(shape, ground){
    // if lower or equal to the ground and is not jumping
    return shape.y + shape.height >= ground.y && shape.speedY >= 0; 
  }
}
    
    
    