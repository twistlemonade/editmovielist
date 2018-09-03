// $(document).ready(documentIncarcat)

$(onHtmlLoaded)

function onHtmlLoaded() {
  console.log('Dom loaded')

  var getShowsData = function (dynamicValue) {
    var options = {
      url: 'https://ancient-caverns-16784.herokuapp.com/movies?Title=' + dynamicValue,
      method: 'GET',
      success: manageData
    }

    $.ajax(options)
  }

  $('#invoke').on('click', function() {
    var query = $('[name="query"]').val()
    getShowsData(query)
  })

  function manageData (data) {
    $(".container").html(renderHtml(data))
    // console.log(data.results);
  }

  function renderHtml (data) {
    var html = `<ul>`
    // console.log(data.results.length);
    var length = data.results.length
    for (i = 0; i<length; i++) {
      console.log(data.results[i].Title);
      var title = data.results[i].Title;
      var year = data.results[i].Year;
      var genre = data.results[i].Genre;
      // var url = data[i].show.url
      // console.log(data[i]);

      html += `<li>` + title + ' | ' + year + ' | ' + genre +`</li>`
    }

    html += `</ul>`
    return html;
  }
}
