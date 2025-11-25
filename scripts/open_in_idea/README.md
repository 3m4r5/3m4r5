# open current browser page in IntelliJ IDEA project
## how to install:
> [!IMPORTANT]
> this script depends on [Jetbrains Toolbox App](https://www.jetbrains.com/toolbox-app/), it must be installed first.
> it was tested on [Version 3.0.1](https://www.jetbrains.com/toolbox-app/download/other.html#:~:text=Third%2Dparty%20software-,Version%203.0,-3.0.1), later versions may not work.
> make sure to stop auto updates: Go to `Setting` > `Appearance and Behavior` and disable `Update Toolbox App automatically`.
### Bookmarklet method:
Add the following url to your bookmarks:
```js
javascript:(function(){const channel_id='';const parts=Array.from(document.querySelectorAll('form')).at(-1).getAttribute('action').slice(1).split('/');window.open(`jetbrains://${channel_id==''?'idea':channel_id+'.tool'}/navigate/reference?project=${parts[0].toUpperCase()}&path=web/${parts.slice(1).join('/').split('.')[0]}.jsp`);})();
```
### Userscript method:
> [!NOTE]
> Google Chrome stopped supporting Manifest V2 which is currently required by violentmonkey but you can [enable it](https://stackoverflow.com/a/79283306).
> Alternatively You can use [a browser that supports Manifest V2](https://brave.com/).
1. add [a userscript manager](https://violentmonkey.github.io/) to your browser.
1. open [this link](https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/open_in_idea/open_in_idea.user.js) and install the userscript.
> [!TIP]
> If you have multiple IDEA versions installed, you can open the desired version by changing the `channel_id` variable https://github.com/3m4r5/3m4r5/blob/a99945d3f4c893e71986bce0ddd99eb86493d603/scripts/open_in_idea/open_in_idea.user.js#L16 you can find channel ids in `~/.local/share/JetBrains/Toolbox/channels/` in linux or `C:\Users\<username>\AppData\Local\JetBrains\Toolbox\channels` in windows, the channel id is the name of the file without the `.json` extension.
</details>
