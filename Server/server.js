/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var markdown = require('markdown').markdown;
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');
var CONVERSIONS = path.join(__dirname, 'conversion');
var CONVERSIONS_ROUTER = CONVERSIONS + '/router-cfg.json';
var CONVERSIONS_DOC = CONVERSIONS + '/doc-cfg.json';

// app.set('port', (process.env.PORT || 3000));
app.set('port', 3000);


app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/comments', function (req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function (req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});

//规范接口
//conversions/
app.post('/conversions/docs', function (req, res) {
  var id = parseInt(req.body.id, 10)
  fs.readFile(CONVERSIONS_DOC, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var config = JSON.parse(data);
    console.log(config[id - 1])
    console.log(config[id - 1]['location'])
    var location = path.join(CONVERSIONS, config[id - 1].location);
    var doc_html = "";
    fs.readFile(location, 'utf-8', function (err, md) {
      if (err) {
        console.error(err);
        process.exit(1);

      }
      doc_html = markdown.toHTML(md);
      res.send(doc_html);
    })

  });
});


app.get('/conversions/docs', function (req, res) {
  var id = parseInt(req.query.id || 1, 10)
  fs.readFile(CONVERSIONS_DOC, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var config = JSON.parse(data);
    console.log(config[id - 1])
    console.log(config[id - 1]['location'])
    var location = path.join(CONVERSIONS, config[id - 1].location);
    var doc_html = "";
    fs.readFile(location, 'utf-8', function (err, md) {
      if (err) {
        console.error(err);
        process.exit(1);

      }
      doc_html = markdown.toHTML(md);
      res.send(doc_html);
      console.log("docs")
    })

  });
});


//路由请求
app.post('/router', function (req, res) {
  var id = parseInt(req.query.id, 10)
  var route = CONVERSIONS_ROUTER;
  //id=1为规范路由
  if (id === 1) {
    route = CONVERSIONS_ROUTER;
  }
  else if (id === 2) {
    route = CONVERSIONS_ROUTER;
  }
  fs.readFile(route, 'utf-8', function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(data);
    console.log("router")
  });
});
//---------------------厦门
app.post('/forcast', function (req, res) {
  var type = req.body.type;
  var name = req.body.name;
  fs.readFile(__dirname + "/xiamen/map-forcast.json", function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var parse_data = JSON.parse(data);
    console.log(parse_data[type][name])
    res.json(parse_data[type][name]);
  })
});

app.post('/dtjs', function (req, res) {
  fs.readFile(__dirname + "/xiamen/dtjs-data.json", function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var parse_data = JSON.parse(data);
    res.json(parse_data);
  })
});



//---------------------厦门
app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});


