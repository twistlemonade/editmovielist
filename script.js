$(onHtmlLoad)

function onHtmlLoad() {
  var $movies = $('#movies');
  var $title = $('#title');
  var $year = $('#year');
  var $genre = $('#genre');

  var movieTemplate = $('#movie-template').html();

  function addMovie(movie) {
    $movies.append(Mustache.render(movieTemplate, movie))
  }

  $.ajax({
    type: 'GET',
    url: 'https://ancient-caverns-16784.herokuapp.com/movies/',
    success: function(movies) {
      $.each(movies.results, function(i, movie) {
        addMovie(movie);
      })
    }
  })

  $('#add-movie').on('click', function() {
    var movie = {
      'Title': $title.val(),
      'Year': $year.val(),
      'Genre': $genre.val()
    };


    $.ajax({
      type: 'POST',
      headers: {
        'X-Auth-Token': 'tnScgo0fzPm7H5d3qc6DZ24Dg-QEev4n'
      },
      url: 'https://ancient-caverns-16784.herokuapp.com/movies/',
      data: movie,
      success: function(newMovie) {
        addMovie(newMovie);
      }
    })
  })

  $movies.delegate('.remove', 'click', function() {

      var $li = $(this).closest('li');
      var self = this;
      $.ajax({
        type: 'DELETE',
        url: 'https://ancient-caverns-16784.herokuapp.com/movies/' + $(this).attr('data-id'),
        headers: {
          'X-Auth-Token': 'tnScgo0fzPm7H5d3qc6DZ24Dg-QEev4n'
        },
        success: function() {
          $li.fadeOut(300, function() {
            $(this).remove();
          })

        }
      })

    })

    $movies.delegate('.editMovie', 'click', function() {
      var $li = $(this).closest('li');
      $li.find('input.title').val($li.find('span.title').html());
      $li.find('input.genre').val($li.find('span.genre').html());
      $li.find('input.year').val($li.find('span.year').html());
      $li.addClass('edit');
    })

    $movies.delegate('.cancelEdit', 'click', function() {
      $(this).closest('li').removeClass('edit');
    })

    $movies.delegate('.saveEdit', 'click', function() {
      var $li = $(this).closest('li');
      var movie = {
        'Title': $li.find('input.title').val(),
        'Year': $li.find('input.year').val(),
        'Genre': $li.find('input.genre').val()
      }


      $.ajax({
        type: 'PUT',
        headers: {
          'X-Auth-Token': 'tnScgo0fzPm7H5d3qc6DZ24Dg-QEev4n'
        },
        url: 'https://ancient-caverns-16784.herokuapp.com/movies/' + $li.attr('data-id'),
        data: movie,
        success: function(newMovie) {
          $li.find('span.title').html(movie.Title);
          $li.find('span.year').html(movie.Year);
          $li.find('span.genre').html(movie.Genre);
          $li.removeClass('edit');
        }
      })

    })


  }
