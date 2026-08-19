/* kb-write.js — 知识库页面内直写（免登录，File System Access API）
   原理：页面上的「✍️ 在本机直接填写」按钮打开弹窗，直接读写本机 content/ 下的 .md 文件。
   仅在 Chrome/Edge 可用；不支持时按钮退化为 GitHub 网页编辑链接。 */
;(function () {
  if (window.__kbWriteLoaded) return
  window.__kbWriteLoaded = true

  var IDB_NAME = "kb-write",
    STORE = "handles",
    KEY = "content-dir"
  var dirHandle = null

  function idb() {
    return new Promise(function (res, rej) {
      var r = indexedDB.open(IDB_NAME, 1)
      r.onupgradeneeded = function () {
        r.result.createObjectStore(STORE)
      }
      r.onsuccess = function () {
        res(r.result)
      }
      r.onerror = function () {
        rej(r.error)
      }
    })
  }
  function saveHandle(h) {
    return idb().then(function (db) {
      return new Promise(function (res, rej) {
        var tx = db.transaction(STORE, "readwrite")
        tx.objectStore(STORE).put(h, KEY)
        tx.oncomplete = res
        tx.onerror = function () {
          rej(tx.error)
        }
      })
    })
  }
  function loadHandle() {
    return idb().then(function (db) {
      return new Promise(function (res, rej) {
        var g = db.transaction(STORE, "readonly").objectStore(STORE).get(KEY)
        g.onsuccess = function () {
          res(g.result || null)
        }
        g.onerror = function () {
          rej(g.error)
        }
      })
    })
  }
  async function getDir() {
    if (dirHandle) return dirHandle
    var h = await loadHandle()
    if (h) {
      if ((await h.queryPermission({ mode: "readwrite" })) === "granted") {
        dirHandle = h
        return h
      }
      if ((await h.requestPermission({ mode: "readwrite" })) === "granted") {
        dirHandle = h
        return h
      }
    }
    h = await window.showDirectoryPicker({ id: "kb-content", mode: "readwrite" })
    await saveHandle(h)
    dirHandle = h
    return h
  }
  async function getFileHandle(dir, rel, create) {
    var parts = rel.split("/"),
      d = dir
    for (var i = 0; i < parts.length - 1; i++)
      d = await d.getDirectoryHandle(parts[i], { create: !!create })
    return d.getFileHandle(parts[parts.length - 1], { create: !!create })
  }

  /* 解析 md 里的 ✍️ 待填区：callout（> [!xxx] ✍️ 开头的连续引用块）或 ## ✍️ 小节 */
  function findRegions(text) {
    var lines = text.split(/\r?\n/),
      regions = [],
      i,
      j,
      l
    for (i = 0; i < lines.length; i++) {
      l = lines[i]
      if (/^> \[!(todo|important)\] ✍️/.test(l)) {
        j = i
        while (j < lines.length && /^>/.test(lines[j])) j++
        regions.push({
          title: l.replace(/^> \[!\w+\] /, "").slice(0, 40),
          start: i,
          end: j,
          kind: "callout",
        })
        i = j
      } else if (/^## ✍️/.test(l)) {
        j = i + 1
        while (j < lines.length && !/^## /.test(lines[j])) j++
        regions.push({
          title: l.replace(/^## /, "").slice(0, 40),
          start: i,
          end: j,
          kind: "section",
        })
        i = j
      }
    }
    return regions
  }
  function stripQuote(s) {
    return s
      .split(/\r?\n/)
      .map(function (l) {
        return l === ">" ? "" : l.replace(/^> /, "")
      })
      .join("\n")
  }
  function addQuote(s) {
    return s
      .split(/\r?\n/)
      .map(function (l) {
        return l === "" ? ">" : "> " + l
      })
      .join("\n")
  }

  function el(tag, style, text) {
    var e = document.createElement(tag)
    if (style) e.style.cssText = style
    if (text != null) e.textContent = text
    return e
  }

  async function openEditor(relPath) {
    if (!window.showDirectoryPicker) {
      alert("当前浏览器不支持本机直写。请用 Chrome/Edge，或点链接走 GitHub 网页编辑。")
      return
    }
    var dir
    try {
      dir = await getDir()
    } catch (e) {
      return /* 用户取消选目录 */
    }
    var fh, text
    try {
      fh = await getFileHandle(dir, relPath)
      text = await (await fh.getFile()).text()
    } catch (e) {
      alert(
        "没在所选文件夹里找到 " +
          relPath +
          "\n\n请选择知识库的 content 文件夹（里面能看到 cases、foundations 等目录）。",
      )
      dirHandle = null
      return
    }
    var regions = findRegions(text)
    if (!regions.length) {
      alert("本页没有找到 ✍️ 待填区。")
      return
    }

    var overlay = el(
      "div",
      "position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center",
    )
    var box = el(
      "div",
      "background:Canvas;color:CanvasText;width:min(720px,92vw);max-height:86vh;overflow:auto;border-radius:10px;padding:16px;box-shadow:0 8px 40px rgba(0,0,0,.4);font-family:sans-serif",
    )
    var title = el("div", "font-weight:700;margin-bottom:8px", "✍️ 填写：" + relPath)
    var sel = el("select", "width:100%;margin-bottom:8px;padding:6px")
    regions.forEach(function (r, i) {
      sel.appendChild(
        el("option", "", (r.kind === "callout" ? "提示块｜" : "小节｜") + r.title),
      ).value = i
    })
    var ta = el(
      "textarea",
      "width:100%;height:300px;font-family:monospace;font-size:13px;padding:8px;box-sizing:border-box;border:1px solid #999;border-radius:6px;background:Canvas;color:CanvasText",
    )
    var status = el(
      "div",
      "font-size:12px;color:#666;margin-top:6px",
      "编辑的是 Markdown 源码；图片会自动存到 content/assets/ 并以 ![[文件名]] 插入。",
    )
    var bar = el("div", "display:flex;gap:8px;margin:8px 0;flex-wrap:wrap")
    var btnStyle =
      "padding:6px 12px;border:1px solid #888;border-radius:6px;background:ButtonFace;color:ButtonText;cursor:pointer;font-size:13px"

    function cur() {
      return regions[+sel.value]
    }
    function loadRegion() {
      var r = cur(),
        lines = text.split(/\r?\n/).slice(r.start, r.end)
      if (r.kind === "callout") lines = lines.slice(1) // 标题行锁定不编
      ta.value = r.kind === "callout" ? stripQuote(lines.join("\n")) : lines.join("\n")
    }
    function insertAtCursor(snippet) {
      var s = ta.selectionStart,
        e = ta.selectionEnd
      ta.value = ta.value.slice(0, s) + snippet + ta.value.slice(e)
      ta.selectionStart = ta.selectionEnd = s + snippet.length
      ta.focus()
    }

    var bB = el("button", btnStyle, "B 加粗")
    bB.onclick = function () {
      var s = ta.selectionStart,
        e = ta.selectionEnd,
        w = ta.value.slice(s, e) || "加粗文字"
      insertAtCursor("")
      ta.setRangeText("**" + w + "**", s, e, "end")
    }
    var bLink = el("button", btnStyle, "🔗 链接")
    bLink.onclick = function () {
      var t = prompt("链接文字：", "链接文字")
      if (t == null) return
      var u = prompt("链接地址（https://…）：", "https://")
      if (!u) return
      insertAtCursor("[" + t + "](" + u + ")")
    }
    var bImg = el("button", btnStyle, "🖼️ 图片")
    var fileInput = el("input", "display:none")
    fileInput.type = "file"
    fileInput.accept = "image/*"
    async function saveImage(file) {
      try {
        var assets = await dir.getDirectoryHandle("assets", { create: true })
        var ts = new Date().toISOString().replace(/[-:T]/g, "").slice(2, 14)
        var name = ts + "-" + file.name.replace(/[^\w.\-一-鿿]/g, "-")
        var imfh = await assets.getFileHandle(name, { create: true })
        var w = await imfh.createWritable()
        await w.write(file)
        await w.close()
        insertAtCursor("![[" + name + "]]")
        status.textContent = "图片已存到 content/assets/" + name
      } catch (e) {
        status.textContent = "图片保存失败：" + e.message
      }
    }
    bImg.onclick = function () {
      fileInput.click()
    }
    fileInput.onchange = function () {
      if (fileInput.files[0]) saveImage(fileInput.files[0])
      fileInput.value = ""
    }
    ta.addEventListener("paste", function (ev) {
      var items = ev.clipboardData && ev.clipboardData.items
      if (!items) return
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") === 0) {
          ev.preventDefault()
          saveImage(items[i].getAsFile())
          return
        }
      }
    })

    var bSave = el(
      "button",
      btnStyle + ";background:#1a7f37;color:#fff;border-color:#1a7f37",
      "💾 保存",
    )
    bSave.onclick = async function () {
      try {
        bSave.disabled = true
        var r = cur(),
          lines = text.split(/\r?\n/),
          body = ta.value
        var newLines
        if (r.kind === "callout") newLines = [lines[r.start]].concat(addQuote(body).split("\n"))
        else newLines = body.split("\n")
        lines.splice.apply(lines, [r.start, r.end - r.start].concat(newLines))
        var wasCRLF = /\r\n/.test(text)
        text = lines.join("\n") // 内部统一 LF，CRLF 只在写盘时转换，避免区域索引错位
        var out = wasCRLF ? text.replace(/\n/g, "\r\n") : text
        var w = await fh.createWritable()
        await w.write(out)
        await w.close()
        status.textContent =
          "✅ 已保存到本机文件。" +
          (location.hostname === "localhost" || location.hostname === "127.0.0.1"
            ? "页面马上自动刷新。"
            : "线上更新需要提交推送后才生效。")
        regions = findRegions(text)
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
          setTimeout(function () {
            location.reload()
          }, 1800)
      } catch (e) {
        status.textContent = "保存失败：" + e.message
      } finally {
        bSave.disabled = false
      }
    }
    var bClose = el("button", btnStyle, "关闭")
    bClose.onclick = function () {
      overlay.remove()
    }
    overlay.onclick = function (ev) {
      if (ev.target === overlay) overlay.remove()
    }

    sel.onchange = loadRegion
    bar.append(bB, bLink, bImg, bSave, bClose)
    box.append(title, sel, ta, bar, status, fileInput)
    overlay.append(box)
    document.body.append(overlay)
    loadRegion()
    ta.focus()
  }

  function bindAll() {
    document.querySelectorAll(".kb-write-btn").forEach(function (btn) {
      if (btn.__kbBound) return
      btn.__kbBound = true
      btn.addEventListener("click", function (ev) {
        if (!window.showDirectoryPicker) return // 不支持的浏览器走 GitHub 链接
        ev.preventDefault()
        var host = btn.closest(".kb-write")
        openEditor(host && host.dataset.kbFile)
      })
    })
  }
  document.addEventListener("nav", bindAll)
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bindAll)
  else bindAll()
})()
