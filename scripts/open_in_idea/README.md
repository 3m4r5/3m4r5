# open current browser page in IntelliJ IDEA project
## how to install:
> [!IMPORTANT]
> this script depends on [Jetbrains Toolbox App](https://www.jetbrains.com/toolbox-app/), it must be installed first.
### Bookmarklet method:
Add the following url to your bookmarks:
```js
javascript:(function(){const channel_id='';const forms=document.querySelectorAll('form');const parts=forms[forms.length-1].getAttribute('action').slice(1).split('/');window.open(`jetbrains://${channel_id==''?%27idea%27:channel_id+%27.tool%27}/navigate/reference?project=${parts[0]}&path=web/${parts.slice(1).join(%27/%27).split(%27.%27)[0]}.jsp`);})();
```
### Userscript method:
> [!NOTE]
> Google Chrome stopped supporting Manifest V2 which is currently required by violentmonkey but you can [enable it](https://stackoverflow.com/a/79283306).
1. add [a userscript manager](https://violentmonkey.github.io/) to your browser.
1. open [this link](https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/open_in_idea/open_in_idea.user.js) and install the userscript.
> [!TIP]
> If you have multiple IDEA versions installed, you can open the desired version by changing the `channel_id` variable https://github.com/3m4r5/3m4r5/blob/4915e8068bd83fa0f858836e99ef1b82c852e03b/scripts/open_in_idea/open_in_idea.user.js#L16 you can find channel ids in `~/.local/share/JetBrains/Toolbox/channels/` in linux or `C:\Users\<username>\AppData\Local\JetBrains\Toolbox\channels` in windows, the channel id is the name of the file without the `.json` extension.
</details>
