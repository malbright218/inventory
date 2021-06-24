$(document).ready(function () {

  $.get("/api/user_data", showName);
  function showName(data) {
    // $("#nameTarget").append(data.name);
    // var name = data.name;
    // var names = name.split(" ");
    // var first = names[0];
    // var second = names[1];
    // var initial = first + second;
    sessionStorage.setItem("initials", data.name);
  }

  var userSelectorArray = [];

  $.get("/api/endusers", arrayListFill);

  function arrayListFill(data) {
    for (var i = 0; i < data.length; i++) {
      //Adding users to the selector form
      var userObj = {};
      userObj.id = data[i].id;
      userObj.name = data[i].name;
      userSelectorArray.push(userObj);
    }

    function compareName(a, b) {
      const name1 = a.name.toUpperCase();
      const name2 = b.name.toUpperCase();

      let comparison = 0;

      if (name1 > name2) {
        comparison = 1;
      } else if (name1 < name2) {
        comparison = -1;
      }
      return comparison;
    }

    function selectorArraySort() {
      userSelectorArray.sort(compareName);

      for (var j = 0; j < userSelectorArray.length; j++) {
        var optionElement = $("<option>");
        optionElement.attr("id", userSelectorArray[j].id);
        optionElement.append(userSelectorArray[j].name);
        $("#userSelectorForm").append(optionElement);
      }
    }

    selectorArraySort();

    $(document).on("click", ".btn-warning", function () {
      var modifyName = $("#nameTarget").text();
      sessionStorage.clear();
      sessionStorage.setItem("key", this.id);
      sessionStorage.setItem("name", modifyName);
      var listItemNameid = this.id - 1;
      $("#listItemName").text(data[listItemNameid].itemName);
      $("#listItemQuantity").val(data[listItemNameid].quantity);
      $("#listItemPrice").val(data[listItemNameid].priceHist1);
    });

    $("#updateListItem").on("click", function () {
      var modifyName = $("#nameTarget").text();
      let updateKey = sessionStorage.getItem("key");
      let updateQty = $("#listItemQuantity").val().trim();
      let updatePrice = $("#listItemPrice").val().trim();
      var updateListing = {};
      updateListing.id = updateKey;
      updateListing.quantity = updateQty;
      updateListing.priceHist1 = updatePrice;
      updateListing.priceHist2 = data[updateKey - 1].priceHist1;
      updateListing.modifiedBy = modifyName;
      update(updateListing);
    });

    // ACTION WHEN SELECTING A USER
    $("#userSelectorForm").change(function () {

      
      $("#itemSelector").text("Select item");
      var selectedId = $(this).children(":selected").attr("id");
      var selectedName = $("#userSelectorForm").val().trim();
      issuesTable(selectedId)
      $.get("/api/endusers/" + selectedId, function (data) {
        $("#endUserFormName").val(data.name);
        $("#endUserFormName").attr("selectorID", data.id);
        $("#endUserFormTitle").val(data.title);
        $("#endUserFormLocation").val(data.location);
        $("#endUserFormNameItem").val(data.name);
        $("#endUserFormNameItem").attr("selectorID", data.id);
      });

      $.get("/api/items", function (data) {
        var initEle = $("<option>");
        initEle.append("Select item");
        $("#itemSelector").append(initEle);
        // $('#itemSelector').text("Select item")
        for (var k = 0; k < data.length; k++) {
          var optionElement = $("<option>");
          optionElement.attr("id", data[k].id);
          optionElement.attr("qty", data[k].quantity);
          optionElement.append(data[k].itemName);
          $("#itemSelector").append(optionElement);
        }
      });
    });

    // UPDATE USER INFORMATION
    $("#updateUserButton").on("click", function () {
      var updateEndUser = {};
      var d = new Date();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var output =
        d.getFullYear() +
        "-" +
        (month < 10 ? "0" : "") +
        month +
        "-" +
        (day < 10 ? "0" : "") +
        day;
      updateEndUser.id = $("#endUserFormName").attr("selectorID");
      updateEndUser.name = $("#endUserFormName").val().trim();
      updateEndUser.title = $("#endUserFormTitle").val().trim();
      updateEndUser.location = $("#endUserFormLocation").val().trim();
      updateEndUser.updatedAt = output;
      update(updateEndUser);
    });

    // ISSUE EQUIPMENT
    $("#itemSelector").change(function () {
      var selectedId = $(this).children(":selected").attr("id");
      var itemQty = $(this).children(":selected").attr("qty");
      var itemName = $(this).children(":selected").text();
      $("#itemQuantity").attr("qty", itemQty);
      $("#itemQuantity").attr("name", itemName);
      $.get("/api/items");
      $("#updateUserButtonItem").attr("itemid", selectedId);
    });

    $("#updateUserButtonItem").on("click", function () {
      var d = new Date();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var output =
        d.getFullYear() +
        "-" +
        (month < 10 ? "0" : "") +
        month +
        "-" +
        (day < 10 ? "0" : "") +
        day;
      var currItemQty = $("#itemQuantity").attr("qty");
      var itemid = parseInt($("#updateUserButtonItem").attr("itemid"));
      var nameItem = $("#itemQuantity").attr("name");
      var userItemQty = $('#itemQuantity').val().trim()
      var userItems = {};
      userItems.id = itemid;
      userItems.quantity = currItemQty - $("#itemQuantity").val().trim();
      userItems.modifiedBy = sessionStorage.getItem("initials");
      userItems.updatedAt = output;
      updateItems(userItems);
      var updateEndUserItem = {};
      var endUserId = $("#endUserFormName").attr("selectorID");
      updateEndUserItem.id = endUserId;
      updateEndUserItem.itemHist1 = nameItem;
      updateEndUserItem.itemQuant1 = userItemQty
      updateEndUserItem.itemHist1Date = output;
      update(updateEndUserItem);
    });

    // ADD NEW END USER TO DB
    $("#addNewEndUser").on("click", function () {
      var newEndUser = {};
      var d = new Date();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var output =
        d.getFullYear() +
        "-" +
        (month < 10 ? "0" : "") +
        month +
        "-" +
        (day < 10 ? "0" : "") +
        day;
      newEndUser.name = $("#endUserName").val().trim();
      newEndUser.title = $("#endUserTitle").val().trim();
      newEndUser.location = $("#endUserLocation").val().trim();
      newEndUser.createdAt = output;
      newEndUser.updatedAt = output;
      gobabygo(newEndUser);
    });

    // DISPLAY ISSUED ITEMS IN SIMPLE TABLE
    var issuesArray = [];
    function issuesTable(n) {
      $('#issueTable').html('')
      $.get("/api/endusers/" + n, function (data) {
        console.log(data)
        var headrow = $(
          "<thead><tr>" +
            "<th>Item Name</th>" +
            "<th>Issue Qty</th>" +
            "<th>Issue Date</th>" +
            "</tr></thead>"
        );  
          
        var blankrow = $("<tr>");
        var itemName = $("<td>");
        var itemQty = $("<td>");
        var issueDate = $("<td>");
        itemName.append(data.itemHist1)
        itemQty.append(data.itemQuant1)
        issueDate.append(data.itemHist1Date)
        blankrow.append(itemName, itemQty, issueDate)
        $('#issueTable').append(blankrow)
     
        $('#issueTable').prepend(headrow)

      });
    }

    function update(x) {
      $.ajax({
        method: "PUT",
        url: "/api/endusers",
        data: x,
      });
      location.reload();
    }

    function updateItems(x) {
      $.ajax({
        method: "PUT",
        url: "/api/items",
        data: x,
      });
      location.reload();
    }

    function gobabygo(x) {
      $.post("/api/endusers", x);
      location.reload();
    }
  }
});
