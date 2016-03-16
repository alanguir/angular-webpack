export default /*@ngInject*/ function ($q){
  // for future use when categories are user-editable
  var categories;

  return {
    get: readCategories
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
}
