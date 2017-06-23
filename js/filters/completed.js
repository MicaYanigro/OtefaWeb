torneoFutbol.filter('completed', function() {

  return function(input){

    if(input == null)
      return false;

    if(input.length <= 0)
      return false;

    for(i = 0; i < input.length; i++){
      if(input[i].descripcion != undefined && input[i].descripcion != ''){
        return true;
      }
    }
    return false;
  };

});
