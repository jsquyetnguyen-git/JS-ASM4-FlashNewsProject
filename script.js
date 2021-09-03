$(document).ready(function() {
    const token = '48f6d12ba3276dac2d9b06212e24e591';

    getTopNews();
    breakingNews();

    // Get json from server
    function getTopNews() {
        $('#loading').removeClass('d-none');
        $.ajax({
            url: 'https://gnews.io/api/v4/top-headlines?country=us&token=' + token,
            dataType: 'json',
            success: function(data) {
                $('#loading').addClass('d-none');
                getData(data);
            },
            error: function() {
                alert('An error occurred. Please try again later.');
            }
        })
    }

    function getData(data) {
        for (let article of data.articles) {
            let title, image, url, time, content;
            title = article.title;
            image = article.image;
            url = article.url;
            time = article.publishedAt;
            content = article.content;
            addElements(title, image, url, time, content);
        }
    }

    //add html
    function addElements(title, image, url, time, content) {
        let html = '<div class="newsbox row mt-2 mb-2">';
        html += '<div class="col-4 bg-light">';
        html += '<img class="w-100 thumbnail" src="' + image + '"alt=img>';
        html += '</div>';
        html += '<div class="col-8 bg-light">';
        html += '<a href="' + url + '"target="_blank">';
        html += '<p class="title">' + title + '</p>';
        html += '</a>';
        html += '<p class="publishedAt">' + time + '</p>';
        html += '<p class="content">' + content + '</p>';
        html += '</div>';
        html += '</div>';

        $('#news').append(html);
    }

    //open modal
    $('#search button').click(function() {
        $('.modal').fadeIn('fast');
    })

    //close modal
    $('.btn-close').click(function() {
        $('.modal').fadeOut('fast')
        reset();
    })

    //reset search form
    function reset() {
        $('#searchVal').val('');
        $('#language').val('Choose language');
        $('#country').val('Choose country');
        $('#startdate').val('');
        $('#enddate').val('');
    }

    //close modal and search
    $('.modal-footer > button').click(function() {
        $('.modal').fadeOut('fast', function() {
            var keyword = $('#searchVal').val();
            var language = $('#language').val();
            var country = $('#country').val();
            var startdate = $('#startdate').val() + 'T00:00:00Z';
            var enddate = $('#enddate').val() + 'T00:00:00Z';

            if (keyword.trim().length > 0) {
                search(keyword, language, country, startdate, enddate);
                reset();
            } else {
                filterNews(language, country, startdate, enddate);
                reset();
            }
        })
    })

    //Search news
    function search(keyword, language, country, startdate, enddate) {
        $('#loading').removeClass('d-none');
        $('.newsbox').remove();
        $.ajax({
            url: 'https://gnews.io/api/v4/search?q=' + keyword + '&lang=' + language + '&country=' + country + '&from=' + startdate + '&to=' + enddate + '&token=' + token,
            dataType: 'json',
            success: function(data) {
                $('#loading').addClass('d-none');
                getData(data);
            },
            error: function() {
                alert('An error occurred. Please try again later.');
            }
        })
    }

    //Filter news
    function filterNews(language, country, startdate, enddate) {
        $('#loading').removeClass('d-none');
        $('.newsbox').remove();
        $.ajax({
            url: 'https://gnews.io/api/v4/top-headlines?lang=' + language + '&country=' + country + '&from=' + startdate + '&to=' + enddate + '&token=' + token,
            dataType: 'json',
            success: function(data) {
                $('#loading').addClass('d-none');
                getData(data);
            },
            error: function() {
                alert('An error occurred. Please try again later.');
            }
        })
    }

    //breaking news
    function breakingNews() {
        $('#loading-brnews').removeClass('d-none');
        $.ajax({
            url: 'https://gnews.io/api/v4/top-headlines?topic=breaking-news&max=5&lang=en&token=' + token,
            dataType: 'json',
            success: function(data) {
                for (var article of data.articles) {
                    var title = article.title;
                    var image = article.image;
                    var url = article.url;
                    var html = '<div class="row mt-2">';
                    html += '<div class="col-4">'
                    html += '<img class="w-100 thumbnail" src="' + image + '"alt="img">';
                    html += '</div>';
                    html += '<div class="col-8">';
                    html += '<a href="' + url + '"target="_blank">';
                    html += '<p class="title-brknews">' + title + '</p>';
                    html += '</a>';
                    html += '</div>';
                    html += '</div>';
                    $('#loading-brnews').addClass('d-none');
                    $('.breakingnews').append(html);
                }
            },
            error: function() {
                alert('An error occurred. Please try again later.');
            }
        })
    }
});