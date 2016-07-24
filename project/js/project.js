$(document).ready(function(){
  var fb = new Firebase('https://100in100.firebaseio.com/');

  fb.on('value', function(data){
    var projects = data.val();
    displayProject(projects);
  }, function(err){
    console.log('The read failed: ' + err.code);
  });

  function displayProject(projects){
    var projectsHtml = '';

    projects.forEach(function(item){
      projectsHtml += render(item);
    });

    $('.la-projects').append(projectsHtml);
    $('.la-load').hide();
  }

  function render(item){
    var pHtml = '<p class="la-title">#' + item.id + ' ' + item.title + '</p>';
    var spanHtml = '<span class="la-link">Visit Project</span>';
    var imgHtml = '<img class="la-screenshot" src="' + item.image + '" alt=""/>';
    var imgAHtml = '<a class="la-preview" href="' + item.url + '" target="_blank">' + imgHtml + spanHtml + pHtml + '</a>';

    var desPHtml = '<p class="la-description">' + item.description + '</p>';

    var linkIHtml = '<i class="la-icon iconfont">&#xe604;</i>';
    var githubAHtml = item.github ? '<a class="la-stat la-github" href="' + item.github + '" target="_blank">GitHub</a>' : '';
    var demoAHtml = '<a class="la-stat la-demo" href="' + item.demo + '" target="_blank">Demo</a>';
    var blogAHtml = item.blog ? '<a class="la-stat la-blog" href="' + item.blog + '" target="_blank">Blog</a>' : '';
    var linkDivHtml = '<div class="la-stats">' + linkIHtml + githubAHtml + demoAHtml + blogAHtml +'</div>';

    var tagsIHtml = '<i class="la-icon iconfont">&#xe606;</i>';
    var strongHtml = '<strong>Tags:</strong>&nbsp;';
    
    var tagsHtml = '';
    item.tags.forEach(function(tag){
      tagsHtml += '<a class="la-tag" href="#">' + tag + '</a>,&nbsp;';
    });

    var tagsDivHtml = '<div class="la-tags">' + tagsIHtml + strongHtml + tagsHtml + '</div>';

    var infoDivHtml = '<div class="la-info">' + linkDivHtml + tagsDivHtml + '</div>';

    return '<li class="la-project">' + imgAHtml + desPHtml + infoDivHtml + '</li>';
  }
});