"use strict";



function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");

  /* [DONE]  remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */

  console.log("clickedElement:", clickedElement);
  clickedElement.classList.add("active");

  /* [DONE]  remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll(".posts article.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

/* add class 'active' to the correct article */

  targetArticle.classList.add("active");

}



const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author",
  optTagsListSelector = ".tags.list";


function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";

/* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  /* ... */
  
  let html = "";

  /* for each article */
  
  /* get the article id */

  for (let article of articles) {
    const articleId = article.getAttribute("id");
    
    

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    console.log(linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks(); 



function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagWrapper);
    /* make html variable with empty string */
    let html = " ";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML =
        '<li><a href="#tag-' + tag + '">' + tag + " " + "</a></li>";
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    console.log(tagWrapper);
    /* END LOOP: for every article: */
  }
    
  /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(".tags");

  /*[NEW] create variable for all links HTML code */
  let allTagsHTML = "";

/*[NEW] START LOOP: for each tag in allTags: */
  
  for (let tag in allTags) {
    /*[NEW] generate code of link and add it to allTagsHTML */


    allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ')</a></li>';
  
  
    /* [NEW] END LOOP: for ach tag in allTags: */
  }
/* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

  
}

generateTags();




function tagClickHandler(event) {
/* prevent default action for this event */
  event.preventDefault();
/* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
/* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
/* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
/* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
/* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
  /* remove class active */
    activeLink.classList.remove("active");
    /* END LOOP: for each active tag link */
  }
/* find all tag links with "href" attribute equal to the "href" constant */
  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
/* START LOOP: for each found tag link */
  for (let foundTagLink of foundTagLinks) {
  /* add class active */
    foundTagLink.classList.add("active");
    /* END LOOP: for each found tag link */
  }
/* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
/* find all links to tags */
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');
/* START LOOP: for each link */
  for (let linkTag of linkTags) {
  /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener("click", tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();




// generateTags();


/*Adding authors*/

  /*Generating author tags*/


  function generateAuthors() {
  /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    

  /* START LOOP: for every article: */
    for (let article of articles) {

    /* find post author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector); 
      console.log(authorWrapper);

    /* make html variable with empty string */
      let html = "";

    /* get tags from data-author attribute */
      const tag = article.getAttribute("data-author");
      console.log(tag);

    /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-author-' + tag + '">' + tag + "</a></li>";
    /* add generated code to html variable */
      html = html + linkHTML;

    /* insert HTML of all the links into the author wrapper */
      authorWrapper.innerHTML = html; 

      /* END LOOP: for every article: */
    }
}

generateAuthors();


function authorClickHandler(event) { 


/* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
/* make a new constant "href" and read the attribute "href" of the clicked element */
  
  const href = clickedElement.getAttribute("href");

/* make a new constant "tag" and extract tag from the "href" constant */
  
  const tag = href.replace('#tag-author-', '');

/* find all author links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-author-"]');
  console.log(activeLinks);

/* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {

  /* remove class active */
    activeLink.classList.remove("active");

    /* END LOOP: for each active tag link */
  }

/* find all author links with "href" attribute equal to the "href" constant */
  const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  

/* START LOOP: for each found tag link */
  
  for (let foundAuthorLink of foundAuthorLinks) {

  /* add class active */
    foundAuthorLink.classList.add("active");

    /* END LOOP: for each found tag link */
  }

/* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}





function addClickListenersToAuthors () {
/*find all links to authors */
  const linkAuthors = document.querySelectorAll('a[href^="#tag-author-"]');
  console.log(linkAuthors);
/* START LOOP: for each link*/
  for (let linkAuthor of linkAuthors) {
    /*add authorClickHandler as event listener*/
  linkAuthor.addEventListener("click", authorClickHandler);
    /*END LOOP: for each link*/
  }
}

addClickListenersToAuthors();