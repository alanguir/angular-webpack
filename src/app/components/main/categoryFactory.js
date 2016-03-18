export default /*@ngInject*/ function ($q){
  // for future use when categories are user-editable
  var categories;

  return {
    get: readCategories,
    label: _label
  };

  function readCategories(){
    if(!categories){
      categories = $q.resolve({
        "restaurants": "Restaurants",
        "coffee": "Coffee",
        "hotels": "Hotels",
        "servicestations": "Gas & Service Stations",
        "parking": "Parking",
        "grocery": "Grocery Stores",
        "drycleaninglaundry": "Dry Cleaning & Laundry",
        "gyms": "Gyms",
        "parks": "Parks"
      });
    }

    return categories;
  }

  function _label(key){
    var _cats;
    if(!categories){ _cats = readCategories(); }
    else { _cats = categories; }

    return _cats.then(function(cats){
      return cats[key];
    })
  }
}
