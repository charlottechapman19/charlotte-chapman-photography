var fs = require('fs');

if (process.argv.length <= 4) {
  console.log(
    'Usage: ' + __filename + ' path/to/directory path/to/output folder-name',
  );
  process.exit(-1);
}

var path = process.argv[2];
var output = process.argv[3];
var folderName = process.argv[4];
var titlePrefix = process.argv[5] || '';
var html = '';

// format the title
titlePrefix =
  (titlePrefix ? titlePrefix + ' - ' : '') + 'Charlotte Chapman Photography';

fs.readdir(path, function (err, items) {
  for (var i = 0; i < items.length; i++) {
    console.log(items[i]);
    html =
      html +
      '<div class="col-xs-12">\n' +
      '<img class="img-responsive" src="' +
      folderName +
      '/' +
      items[i] +
      '" alt="' +
      titlePrefix +
      '" title="' +
      titlePrefix +
      '" />\n' +
      '</div>\n\n';
  }
});

var stream = fs.createWriteStream(output);
stream.once('open', function (fd) {
  stream.write(html);
  stream.end();
});
