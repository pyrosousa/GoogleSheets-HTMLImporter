//=================================================================
//========================= Sean Scripts ========================== 
//=================================================================

//-----------------------------------------------------------------
//----------------------- Article  Options ------------------------
//----------------------------------------------------------------- 

function fullArticle(){
    // Full Width Article
    // Removes the Related Articles and side-bar nav
    $(".col-md-3.col-sm-3.col-xs-12").remove()
    $("#article-column").removeClass()
    $("#article-column").addClass("col-xs-12 section-wrapper-right-side")
    $("#digsw").removeClass()
    $("#digsw").addClass("col-xs-12")
    $(".recent-articles").remove()
}

function disableTOC() {
    if ( $('.table-of-contents.off').length ){
        // If <div class="table-of-contents off"></div> exists. Disable the table of contents.
        console.log("Turning off Table of Contents")
    } else {
        $('.article-body').prepend('<div class="table-of-contents"><h1>Table of Contents</h1><ul id="toc"></ul></div>');
        $('#toc').toc({content: ".article-body", headings: "h2,h3"});
        $( ".article-body img" ).addClass( "center-block img-responsive article-img" );
        $('.article-body h2').slice(1).before( "<a href='#' class='back-to-top pull-right'>Back to Top</a>" );
        $('.article-body h3').before( "<a href='#' class='back-to-top pull-right'>Back to Top</a>" );
        $('.article-body').append( "<a href='#' class='pull-right'>Back to Top</a>" );
    }
}

//-----------------------------------------------------------------
//------------------------ jQuery Plugins- ------------------------
//----------------------------------------------------------------- 

function homeIcons() {
    // Adds images to the home page icons, based off of their section ID.
    $("#section_id_202716747 h2 a").prepend('<div class="homeIcon" id="infoIcon"><span class="glyphicon glyphicon-info-sign"></span></div>');
    $("#section_id_203534067 h2 a").prepend('<div class="homeIcon" id="resIcon"><span class="glyphicon glyphicon-education"></span></div>');
    $("#section_id_203533428 h2 a").prepend('<div class="homeIcon id="helpIcon""><span class="glyphicon glyphicon-fire"></span></div>');
}

function articleImporter() {
    $( ".import-article" ).each(function() {
        articleID=$(this).attr('id');
        articleURL="https://postproduction.emerson.edu/hc/en-us/articles/" + articleID + " #article-column";
        $(this).load(articleURL);
    });

    $( ".import-article-btn" ).each(function() {
        articleID=$(this).attr('id');
        articleTitle=$(this).data("title");
        articleURL="https://postproduction.emerson.edu/hc/en-us/articles/" + articleID + " #article-column";
        $(this).load(articleURL);

        articleBtn='<button id="btn-' + articleID + '"class="article-btn btn btn-info" type="button" data-toggle="collapse" data-target="#'+ articleID +'">Click to Expand '+ articleTitle +'</button>';
        
        $(".article-btn").click(function(){
            $(this).data("target").removeClass();
        });

        $(this).before(articleBtn);
        $(this).addClass('collapse');
    });

    $(".article-btn").click(function(){
        $(this).data("target").removeClass();
    });
}

function formatImportedArticle() {
    $(".import-article #article-column").removeClass();
    $(".import-article-btn #article-column").removeClass();
    $(".import-article #article-column").addClass("imported-article");
    $(".import-article-btn #article-column").addClass("imported-article");
    $(".article-btn").css("margin-bottom","10px");
}

function misc() {
    //Enable Popovers with HTML contents
    $('[data-toggle="popover"]').popover({html: true});
}

//-----------------------------------------------------------------
//---------------------- run jQuery Plugins -----------------------
//----------------------------------------------------------------- 

// Run on page load
$(document).ready(function(){
    homeIcons();
    disableTOC();
    articleImporter();
    misc();

});

//Run delayed 1000ms
setTimeout(function() {
    formatImportedArticle();

    }, 1000);
