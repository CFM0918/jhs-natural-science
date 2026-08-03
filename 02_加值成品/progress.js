// 共用學習進度/錯題本 localStorage 工具（同源跨頁共享）
(function(){
  var PK='jhs_progress_v1', WK='jhs_wrongbook_v1';
  function read(key){ try{ return JSON.parse(localStorage.getItem(key)||'{}'); }catch(e){ return {}; } }
  function readArr(key){ try{ return JSON.parse(localStorage.getItem(key)||'[]'); }catch(e){ return []; } }
  function write(key,obj){ try{ localStorage.setItem(key, JSON.stringify(obj)); }catch(e){} }

  function saveScore(code, title, lv, right, total){
    var p = read(PK);
    p[code] = p[code] || {title: title, levels: {}};
    p[code].title = title;
    p[code].levels[lv] = {right: right, total: total, ts: Date.now()};
    write(PK, p);
  }
  function getProgress(){ return read(PK); }
  function clearProgress(){ write(PK, {}); }

  function addWrong(code, title, lv, q, opts, ci, chosen, e){
    var arr = readArr(WK);
    var id = code+'|'+lv+'|'+q;
    arr = arr.filter(function(x){ return x.id!==id; }); // 去重（重作以最新一次為準）
    arr.push({id:id, code:code, title:title, lv:lv, q:q, opts:opts, ci:ci, chosen:chosen, e:e, ts:Date.now()});
    write(WK, arr);
  }
  function removeWrong(id){
    var arr = readArr(WK).filter(function(x){ return x.id!==id; });
    write(WK, arr);
  }
  function removeWrongByKey(code, lv, q){ removeWrong(code+'|'+lv+'|'+q); }
  function getWrongBook(){ return readArr(WK); }
  function clearWrongBook(){ write(WK, []); }

  window.JHS = {
    saveScore: saveScore, getProgress: getProgress, clearProgress: clearProgress,
    addWrong: addWrong, removeWrong: removeWrong, removeWrongByKey: removeWrongByKey,
    getWrongBook: getWrongBook, clearWrongBook: clearWrongBook
  };
})();
