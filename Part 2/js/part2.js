        var Data = "";
		// CODE FOR HOME PAGE
        $(function() {
            $("#container").append('<ul id="list" data-role="listview" data-filter="true" data-filter-reveal="true" data-filter-placeholder="Type in Name to Search"></ul>');
			$.getJSON("data/json.js", function(data){
                Data = data;
				$.each(data, function() {
					$.each(this, function(key, value) {
                        $("#list").append(
                             "<li class='ui-li-has-count ui-li-has-thumb ui-first-child ui-last-child'><a id='" + value.employeeID + "' href='#employeeDetails' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + "<img src='" + value.imagePath + "'>" + "<h4>" + value.name + "</h4>"  + "<p>" + value.title + "</p><span class=\"ui-li-count\" style=\"border-radius:20px\">" + getSubordinateNumber(value.employeeID) + "</span></a></li>" 
                        );
                        });
					}); 
					$("#list").listview().listview('refresh');
                }); 
            
		// CODE FOR EMPLOYEE DETAILS PAGE
             $('body').on('click', '#list a', function(e) {
                 var currentTargetId = e.currentTarget.id;
                 $.getJSON("data/json.js", function(data){
				$.each(data, function() {
					$.each(this, function(key, value) {
                        if (value.employeeID == currentTargetId) {
                            $("#employeeHeadShot").html("<li><img src='" + value.imagePath + "'></li>"  + "<li><h4>" + value.name + "</h4></li>" + "<li><p>" + value.title + "</p></li>"   );
                           $("#employeeData").html( 
                                "<li><a href='#employeeDetails' onclick=\"javascript:reCreateEmployeeList("+value.reportTo+")\" class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + "<h4> View Manager </h4>" + "<p>" + getManager(value.reportTo) + "</p></a></li>"
							   
							    + "<li><a href='#subordinateList'  onclick=\"javascript:createReprotList('"+value.employeeID+"')\" class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + "<h4>View Direct Reports</h4>" + "<p>" + getSubordinateNumber(value.employeeID)+ "</p></a></li>"
                               + "<li><a href='#' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + "<h4> Call Office </h4>" + "<p>" + value.officeNumber  + "</p></a></li>"
                               + "<li><a  href='#'  class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + "<h4> Call Cell </h4>" + "<p>" + value.cellNumber + "</p></a></li>"
                               + "<li><a href='#'  class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + "<h4> Send Email </h4>" + "<p>" + value.email + "</p></a></li>" 
                        );
                            return false;
                        };
                        });
					}); 
                });  
            })
        });
    
    function getSubordinateNumber(id) {
		//console.log("report id is "+id);
	var counts = 0;
	//Reportlist=[];
		//console.log(Data.teammembers.length);
	for(var i=0; i<Data.teammembers.length; i++) {
		var obj = Data.teammembers[i];
            if(id == obj.reportTo){
			counts++;
		}
	}
	return counts;
}
        
        function getManager(reportToID) {

	console.log("manager id is "+reportToID);
	var name = "";
	for(var i=0; i<Data.teammembers.length; i++) {
		var obj = Data.teammembers[i];
            if(reportToID == obj.employeeID){
                name = obj.name;
		}
	}
	return name;		

}
		
function createReprotList(employeeID) {
	var html = "";
	
	$("#subordinateListView").text(employeeID);
	
	for(var i=0; i<Data.teammembers. length;i++) {
		var obj = Data.teammembers[i];
		
            if(employeeID == obj.reportTo) {
			html = html
				+"<li>"
            	+"<a href='#employeeDetails' onclick=\"javascript:reCreateEmployeeList("+obj.employeeID+")\">"
                +"<img src=\""+obj.imagePath+"\">"
                +"<h2>"+obj.title+"</h2>"
                +"<p>"+obj.name+"</p>"
            	+"<span class=\"ui-li-count\" style=\"border-radius:20px\">" + getSubordinateNumber(obj.employeeID) + "</span></a></li>";
			
		}
	}
	
	$("#subordinateListView").html(html);
	$("#subordinateListView").listview().listview('refresh');
}		
	
function reCreateEmployeeList(id) {

	var obj = getOjbectByID(id);
	
	var html = "<li><a href='#employeeDetails' onclick=\"javascript:reCreateEmployeeList("+obj.reportTo+")\" class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + "<h4> View Manager </h4>" + "<p>"
			+getManager(obj.reportTo) + "</p></a></li>"
            + "<li><a href='#' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + "<h4> Call Office </h4>" + "<p>" + obj.officeNumber  + "</p></a></li>"
            + "<li><a  href='#'  class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + "<h4> Call Cell </h4>" + "<p>" + obj.cellNumber + "</p></a></li>"
            + "<li><a href='#'  class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + "<h4> Send Email </h4>" + "<p>" + obj.email + "</p></a></li>";
	
	 $("#employeeHeadShot").html("<li><img src='" + obj.imagePath + "'></li>"  + "<li><h4>" + obj.name + "</h4></li>" + "<li><p>" + obj.title + "</p></li>"   )
	
	$("#employeeData").html(html);
	$("#employeeData").listview().listview('refresh');
}		
		
function getOjbectByID(id) {
	for(var i=0; i<Data.teammembers.length; i++){
		var obj = Data.teammembers[i];
            if(id == obj.employeeID){
			return obj;
		}
	}
	return "";
}		

