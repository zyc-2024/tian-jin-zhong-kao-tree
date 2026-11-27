// Load mod files sequentially. The game's load() is delayed until all
// files are ready, so layers.js is always defined before rebirth.js.
let modFilesLoaded = false;
let modFileIndex = 0;

function loadNextModFile() {
    if (modFileIndex >= modInfo.modFiles.length) {
        modFilesLoaded = true;
        return;
    }
    let script = document.createElement("script");
    script.setAttribute("src", "js/" + modInfo.modFiles[modFileIndex]);
    script.setAttribute("async", "false");
    script.onload = function () {
        modFileIndex++;
        loadNextModFile();
    };
    script.onerror = function () {
        console.error("Failed to load mod file: " + modInfo.modFiles[modFileIndex]);
        modFileIndex++;
        loadNextModFile();
    };
    document.head.appendChild(script);
}

function loadWhenReady() {
    if (!modFilesLoaded) {
        setTimeout(loadWhenReady, 50);
        return;
    }
    load();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadNextModFile);
} else {
    loadNextModFile();
}
