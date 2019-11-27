function insertMenu(root) {
  "use strict";
  console.log("root", root);
  console.log("items", root);
  var insert = d3.select("#menu").selectAll("a");
  var menu = insert.data(root.items).enter();
  menu.append("a")
    .attr("class", "ui item")
    .attr("href", function (d) {
      return d.name + ".html";
    })
    .text(function (d) { //d3.min.js
      return d.label
    });
}