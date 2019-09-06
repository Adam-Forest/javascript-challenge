// from data.js
// why is this in the starter, why not just use data?
var tableData = data;

// check data loaded in console
// data.forEach(function(ufo) {
//     console.log(ufo);
//   });

// assign table body from ufo table to variable
var ufo_tbody = d3.select("#ufo-table tbody");
// assign filter by date button to variable
var date_button = d3.select("#filter-btn");
// configure date parsing
var parseDate = d3.timeParse("%m/%d/%Y");

// function to remove all rows in ufo_table body (clear the table)
function clear_ufo_table(){
    ufo_tbody.selectAll("tr").remove();
}

// date_button on click action
date_button.on("click", function() {

    // hide baddate alert
    document.getElementById("baddate").style.display="none";

    // get filter by info
    var filterbydate = d3.select("#datetime").property("value");

    // parse to date object to check if format matches expected
    var filterbydate_obj=parseDate(filterbydate);
    if (!filterbydate_obj) {
        document.getElementById("baddate").style.display="block";
        console.log(filterbydate)
    } else {
        // console.log(filterbydate_obj);
        var filteredbydate = tableData.filter(ufo => ufo.datetime === filterbydate);
        console.log(filteredbydate);

        clear_ufo_table();

        filteredbydate.forEach((ufo) => {
            var ufo_row = ufo_tbody.append("tr");
            Object.entries(ufo).forEach(([key, value]) => {
              var ufo_cell = ufo_row.append("td");
              ufo_cell.text(value);
            });
          });
    }
});

// populate ufo table with all data on initial page load
tableData.forEach((ufo) => {
  var ufo_row = ufo_tbody.append("tr");
  Object.entries(ufo).forEach(([key, value]) => {
    var ufo_cell = ufo_row.append("td");
    ufo_cell.text(value);
  });
});

