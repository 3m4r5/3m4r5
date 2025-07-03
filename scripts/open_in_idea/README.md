# open current browser page in IntelliJ IDEA project
## how to use:
> [!NOTE]
> Google Chrome stopped supporting Manifest V2 which is currently required by violentmonkey but you can [enable it](https://stackoverflow.com/a/79283306).
1. Install [Jetbrains Toolbox App](https://www.jetbrains.com/toolbox-app/).
1. add [a userscript manager](https://violentmonkey.github.io/) to your browser.
1. open [this link](https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/open_in_idea/open_in_idea.user.js) and install the userscript.
> [!TIP]
> If you have multiple IDEA versions installed, you can open the desired version by changing the `channel_id` variable in the userscript https://github.com/3m4r5/3m4r5/blob/4915e8068bd83fa0f858836e99ef1b82c852e03b/scripts/open_in_idea/open_in_idea.user.js#L16 you can find channel ids in `~/.local/share/JetBrains/Toolbox/channels/` in linux or `C:\Users\<username>\AppData\Local\JetBrains\Toolbox\channels` in windows, the channel id is the name of the file without the `.json` extension.
