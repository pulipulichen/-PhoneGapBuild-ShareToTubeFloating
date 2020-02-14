var FILTER_SUBJECT = [
  "Text Scanner"
];

intent_handler = function (intent) {
  //alert("換了 可以嗎？");
  //alert(JSON.stringify(intent));

  if (typeof (intent.action) === "string"
          && intent.action === "android.intent.action.MAIN") {
    // 沒有要檢索的東西，回家吧。
    //alert("空空");
    openActivity();
    //return;
    navigator.app.exitApp();
  }

  var _search_items = [];

  var _has_string = function (_item) {
    return (typeof (_item) === "string"
            && _item.trim() !== "");
  };

  if (typeof (intent.extras) === "object"
          && typeof (intent.extras["android.intent.extra.SUBJECT"]) === "string"
          && intent.extras["android.intent.extra.SUBJECT"].startsWith("此文件中選中的文本")
          && typeof (intent.extras["android.intent.extra.TEXT"]) === "string") {
    _search_items.push(intent.extras["android.intent.extra.TEXT"].trim());
  } else if (typeof (intent.extras) === "object") {
    var _extras = intent.extras;

    var _key_list = [
      "android.intent.extra.SUBJECT",
      "android.intent.extra.TEXT",
      "android.intent.extra.PROCESS_TEXT",
    ];

    for (var _i = 0; _i < _key_list.length; _i++) {
      if (_has_string(_extras[_key_list[_i]])) {
        var _subject = _extras[_key_list[_i]].trim();
        for (var _j = 0; _j < FILTER_SUBJECT.length; _j++) {
          var _needle = FILTER_SUBJECT[_j];
          if (_subject === _needle) {
            //_text = _text.substring(_needle.length, _text.length).trim();
            _subject = null;
            break;
          }
        }
        if (null !== _subject) {
          _search_items.push(_subject);
        }
      }
    }
    /*
     if (_has_string(_extras["android.intent.extra.SUBJECT"])) {
     _search_items.push(_extras["android.intent.extra.SUBJECT"].trim());
     }
     if (_has_string(_extras["android.intent.extra.TEXT"])) {
     _search_items.push(_extras["android.intent.extra.TEXT"].trim());
     }
     if (_has_string(_extras["android.intent.extra.PROCESS_TEXT"])) {
     _search_items.push(_extras["android.intent.extra.PROCESS_TEXT"].trim());
     }
     */
  }

  var _search_text = _search_items.join(" ");

  _search_text = 'https://youtu.be/pp0f69FC5NE'

  /**
   * 這邊是定義到底要傳送什麼資訊
   * 
   * 找尋Action的方法:
   * 1. 請使用ManifestViewer來開啟AndroidManifest.xml
   * https://play.google.com/store/apps/details?id=jp.susatthi.ManifestViewer&hl=en
   * 2. 檢查帶有<intent-filter>的方法，取得它的android:name="com.videoplayer.floatingyoutube.activities.SendActivity"
   * 
   * @type Object
   */
  var _config = {
    action: "com.videoplayer.floatingyoutube.activities.SendActivity",
    //data: _search_text,
    //uri: _search_text,
    //url: _search_text,
    //pacakge: "com.google.android.googlequicksearchbox",
    extras: {
      //"android.intent.extra.SUBJECT": _search_text,
      "android.intent.extra.TEXT": _search_text,
      //"ACTION_MSG": 1,
      //"ACTION_MSG": 1,
      //"query": _search_text,
      //"SearchManager": {
      //    "QUERY": _search_text,
      //}
    }
  };

  window.plugins.webintent.startActivity(_config,
          function () {
            navigator.app.exitApp();
          },
          function () {
            alert('Failed:' + JSON.stringify(_search_items.join(" "), null, 2));
            navigator.app.exitApp();
          }
  );
};

/**
 * 如果直接開啟APP的話，就執行這個動作
 * @returns {undefined}
 */
openActivity = function () {
  //return;
  var _config = {
    action: "android.intent.action.SEND",
    extras: {
      "android.intent.extra.TEXT": 'https://youtu.be/pp0f69FC5NE',
    }
  }
  
  alert(JSON.stringify(_config))

  try {
    window.plugins.webintent.startActivity(_config,
            function () {
              navigator.app.exitApp();
            },
            function () {
              navigator.app.exitApp();
            }
    );
  } catch (e) {
    alert(e);
  }
};
