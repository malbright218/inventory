$(document).ready(function() {
    $.get("/api/user_data", showName);
  function showName(data) {
    $("#nameTarget").append(data.name);
    // var name = data.name;
    // var names = name.split(" ");
    // var first = names[0];
    // var second = names[1];
    // var initial = first + second;
    sessionStorage.setItem("initials", data.name);
  }
 
  $.get("/api/items", arrayListFill)

  function arrayListFill(data) {
    for (var i = 0; i < data.length; i++) {
        var blankrow = $("<tr>");
        var itemName = $('<td>');
        var category = $('<td>');
        var link = $('<td>');
        var quantity = $('<td>');
        var priceHist1 = $('<td>');
        var priceHist2 = $('<td>');
        var priceHist3 = $('<td>');
        var priceHist4 = $('<td>');
        var priceHist5 = $('<td>');
        var priceHist6 = $('<td>');
        var imgPath = $('<td>');
        var modifiedBy = $('<td>');
        var editField = $('<td>');
        // SPECIAL ELEMENTS
        var linkRef = $('<a>')
        linkRef.attr('href', data[i].link)
        linkRef.append('Order Link')
        var imgRef = $('<img>')
        imgRef.addClass('table-image')
        imgRef.attr('url', data[i].imgPath)
        var editIcon = $('<i>');
        editIcon.addClass('fas fa-edit');
        // APPEND DATA TO <td> ELEMENTS
        itemName.append(data[i].itemName);
        category.append(data[i].category);
        link.append(linkRef);
        quantity.append(data[i].quantity);
        priceHist1.append("$ " + data[i].priceHist1);
        priceHist2.append("$ " + data[i].priceHist2);
        priceHist3.append("$ " + data[i].priceHist3);
        priceHist4.append("$ " + data[i].priceHist4);
        priceHist5.append("$ " + data[i].priceHist5);
        priceHist6.append("$ " + data[i].priceHist6);
        imgPath.append(imgRef);
        modifiedBy.append(data[i].modifiedBy)
        // CREATING EDIT BUTTON
        var editBtn = $('<button>');
        editBtn.addClass('btn btn-warning');
        // <i class="fas fa-edit"></i>
        editBtn.append(editIcon);
        editBtn.attr('id', data[i].id)
        editBtn.attr('data-toggle', 'modal')
        editBtn.attr('data-target', '#repeatJobModal')
        editField.append(editBtn)
        // ADD ALL ELEMENTS TO ROW
        blankrow.append(itemName, category, link, quantity, priceHist1, priceHist2, priceHist3, priceHist4, priceHist5, priceHist6, imgPath, modifiedBy, editField);
        $("#jobTarget").append(blankrow);
    }
    var headrow = $(
        "<thead><tr>" +
          "<th>Item Name</th>" +
          "<th>Category</th>" +
          "<th>Link</th>" +
          "<th>Quantity</th>" +
          "<th>Price Hist 1</th>" +
          "<th>Price Hist 2</th>" +
          "<th>Price Hist 3</th>" +
          "<th>Price Hist 4</th>" +
          "<th>Price Hist 5</th>" +
          "<th>Price Hist 6</th>" +
          "<th>Image</th>" +
          "<th>Modified By</th>" +
          "<th>Edit</th>" +
          "</tr></thead>"
      );  
      $("#jobTarget").prepend(headrow);

      $(document).on('click','.btn-warning', function() {
        var modifyName = $('#nameTarget').text()
        sessionStorage.clear();
        sessionStorage.setItem('key', this.id);
        sessionStorage.setItem('name', modifyName)
        var listItemNameid = this.id - 1
        $('#listItemName').text(data[listItemNameid].itemName)
        $('#listItemQuantity').val(data[listItemNameid].quantity)
        $('#listItemPrice').val(data[listItemNameid].priceHist1)
    })

    $('#updateListItem').on('click', function() {
        var modifyName = $('#nameTarget').text()
        console.log('update click')
        let updateKey = sessionStorage.getItem('key');
        console.log(updateKey)
        let updateQty = $('#listItemQuantity').val().trim();
        console.log(updateQty)
        let updatePrice = $('#listItemPrice').val().trim();
        var updateListing = {}
        updateListing.id = updateKey;
        updateListing.quantity = updateQty;
        updateListing.priceHist1 = updatePrice;
        updateListing.priceHist2 = data[updateKey - 1].priceHist1
        updateListing.modifiedBy = modifyName
        update(updateListing)

    });

    $('#addNewItemClick').on('click', function() {
        var nameTarget = $('#nameTarget').text()
        console.log('click new item')
        var newListing = {}
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
        newListing.itemName = $('#itemName').val().trim();
        newListing.category = $('#category').val().trim();
        newListing.link = $('#linkURL').val().trim();
        newListing.quantity = $('#quantity').val().trim();
        newListing.priceHist1 = $('#price').val().trim();
        newListing.priceHist2 = 0;
        newListing.priceHist3 = 0;
        newListing.priceHist4 = 0;
        newListing.priceHist5 = 0;
        newListing.priceHist6 = 0;
        newListing.imgPath = '';     
        newListing.modifiedBy = nameTarget;
        newListing.createdAt = output;
        newListing.updatedAt = output;
        console.log(newListing)
        gobabygo(newListing)

    })

    function update(x) {
        $.ajax({
            method: "PUT",
            url: "/api/items",
            data: x
        })
        location.reload()
    }

    function gobabygo(x) {
       $.post('/api/items', x)
       location.reload()
      }


  }

  



});
