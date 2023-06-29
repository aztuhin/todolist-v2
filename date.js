// jshint esVersion: 6

export {fullDayT,fullDay,weekday,dayMonth,onlyday} ;

function fullDayT() {
  let toDay = new Date();
  let options = {  
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: true 
  };
  let day = toDay.toLocaleDateString('en-uk', options) ;
  return  day ;
};
function fullDay() {
  let toDay = new Date();
    let options = {  
        weekday: 'long',
        year: 'numeric', 
        month: 'long', // 'long' 'short'
        day: 'numeric',
    };
  let day = toDay.toLocaleDateString('en-uk', options) ;
  return  day ;
}

function weekday() {
   let toDay = new Date();
    let options = {  
          weekday: 'long',          
    };
    let day = toDay.toLocaleDateString('en-uk', options) ;
    return  day ;
}
function dayMonth() {
  let toDay = new Date();
    let options = {            
         month: 'long', // 'long' 'short'
         day: 'numeric',
    };
    let day = toDay.toLocaleDateString('en-uk', options) ;
    return  day ;
}
function onlyday() {
  let toDay = new Date();
  let dayNo = toDay.getDay();
  let day = "";
    switch (dayNo) {
        case 0:
            day = "Sunday"            
            break;
        case 1:
            day = "Monday"            
            break;
        case 2:
            day = "Tuesday"            
            break;
        case 3:
            day = "Wednesday"            
            break;
        case 4:
            day = "Thursday"            
            break;
        case 4:
            day = "Fryday"            
            break;
        default:
            day = "Saterday"
            break;
    }
  return day;
}
