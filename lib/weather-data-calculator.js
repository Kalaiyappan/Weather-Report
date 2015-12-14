var myApp = angular.module('myApp', []);
var response_object;

function weather_params(datetext,rain_mm,weather_stn,searched_place_nm){
	this.datetext = datetext;
	this.rain_mm = rain_mm;
	this.weather_stn = weather_stn;
	this.searched_place_nm = searched_place_nm;
}

var weather_obj;
var weather_stn="";
var rain_data;
var date_data;
var http_url_part1="http://api.openweathermap.org/data/2.5/forecast/daily?q=";
var http_url_part2="&units=metric&cnt=7&appid=675e5e6e9c946570da621fea8c308d12";
var hit_count=0;

myApp.controller('firstcontroller', function($scope,$http){
	$scope.names=['Adambakkam','Adyar','Alandur','Alwarpet','Alwarthirunagar','Ambattur','Aminjikarai','Anakaputhur','Anna Nagar','Annanur','Arumbakkam','Ashok Nagar','Avadi','Ayanavaram','Besant Nagar','Basin Bridge','Chepauk','Chetput','Chintadripet','Chitlapakkam','Choolai','Choolaimedu','Chrompet','Egmore','Ekkaduthangal','Ennore','Foreshore Estate','Fort St. George','George Town','Gopalapuram','Government Estate','Guindy','Guduvanchery','IIT Madras','Injambakkam','ICF','Iyyapanthangal','Jafferkhanpet','Karapakkam','Kattivakkam','Kazhipattur','K.K. Nagar','Keelkattalai','Kelambakkam','Kilpauk','Kodambakkam','Kodungaiyur','Kolathur','Korattur','Korukkupet','Kottivakkam','Kotturpuram','Kottur','Kovalam','Kovilambakkam','Koyambedu','Kundrathur','Madhavaram','Madhavaram Milk Colony','Madipakkam','Madambakkam','Maduravoyal','Manali','Manali New Town','Manapakkam','Mandaveli','Mangadu','Mannadi','Mathur','Medavakkam','Meenambakkam','Minjur','Mogappair','MKB Nagar','Mount Road','Moolakadai','Moulivakkam','Mugalivakkam','Mylapore','Nandanam','Nanganallur','Navalur','Neelankarai','Nemilichery','Nesapakkam','Nolambur','Noombal','Nungambakkam','Ottery','Padi','Pakkam','Palavakkam','Pallavaram','Pallikaranai','Pammal','Park Town','Parrys Corner','Pattabiram','Pattaravakkam','Pazhavanthangal','Peerkankaranai','Perambur','Peravallur','Perumbakkam','Perungalathur','Perungudi','Pozhichalur','Poonamallee','Porur','Pudupet','Purasaiwalkam','Puthagaram','Puzhal','Puzhuthivakkam','Raj Bhavan','Ramavaram','Red Hills','Royapettah','Royapuram','Saidapet','Saligramam','Santhome','Selaiyur','Shenoy Nagar','Sholavaram','Sholinganallur','Sithalapakkam','Sowcarpet','St.Thomas Mount','Tambaram','Teynampet','Tharamani','T. Nagar','Thirumangalam','Thirumullaivoyal','Thiruneermalai','Thiruninravur','Thiruvanmiyur','Tiruverkadu','Thiruvotriyur','Tirusulam','Tiruvallikeni','Tondiarpet','United India Colony','Urapakkam','Vandalur','Vadapalani','Valasaravakkam','Vallalar Nagar','Vanagaram','Velachery','Veppampattu','Villivakkam','Virugambakkam','Vyasarpadi','Washermanpet','West Mambalam'];
	
	/*$http.get('file://D:/Weather-Report/Weather-Report-master/data/city.json').success(function(data){
		console.log(data);
	});*/
	//$scope.names=['Adambakkam','Adyar','Alandur','Alwarpet','Anna Nagar','Arumbakkam','Ayanavaram','Villivakkam','ICF'];
	$scope.weather=[];
	$scope.weather_places = [];

	angular.forEach($scope.names,function(name_value,name_key){
			$http.get(http_url_part1+name_value+http_url_part2).then(function(response){
					$scope.opdata = response.data;
			
			angular.forEach($scope.opdata,function(http_response_value,http_response_key){
				if(http_response_value.hasOwnProperty("name")){
					if(weather_stn != http_response_value.name){
						weather_stn = http_response_value.name;
						$scope.weather_places.push(weather_stn);
					}
				}
				if(Array.isArray(http_response_value)){
					angular.forEach(http_response_value,function(array_value,array_key){
						if(array_value.hasOwnProperty("rain")){
							rain_data = array_value.rain;
						}else{
							rain_data = "No Rain";
						}
						
						if(array_value.hasOwnProperty("dt")){
							var date = new Date(array_value.dt*1000);
							date_data = date.getUTCDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
							weather_obj = new weather_params(date_data,rain_data,weather_stn,name_value);
							if(!verifyunique($scope.weather,weather_obj)){
								//console.log("The values are not unique");
							}else{
								console.log("They are unique");
								//$scope.weather.push(weather_obj);
							}
							
						}
					});
				}
			});

			
		});	
			
	});
});

function verifyunique(array_res,b){
	for(x in array_res){
			if(array_res[x].weather_stn == b.weather_stn && array_res[x].rain_mm == b.rain_mm && array_res[x].datetext ==  b.datetext && array_res[x].searched_place_nm == b.searched_place_nm){
				return false;
			}
		}
		return true;
	}
