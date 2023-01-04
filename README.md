# MyHeritage AI Time Machine Image Scraper

This quick and dirty Typescript app will allow you to bulk download all of your
MyHeritage AI Time Machine images.

## Get your image paths

- Navigate to your AI Time Machine Gallery and click the name of the person for which you want to download images. Their gallery should open in a new tab.

- Open Chrome DevTools (F12 on Windows or ⌘ + Option + i on Mac), switch to the Network tab, and refresh the person's gallery.

- In the filter, type `graph`. You're looking for a POST to `https://familygraphql.myheritage.com/get_time_machine_model_query/`, so look for `get_time_machine_model_query/` in the Name column.

- Click the request name, click the `Response` tab in the right pane, optionally click `{}` to pretty up the JSON results, then press CTRL-A to select all the JSON and CTRL-C to copy it. Paste the results into a new file, e.g. `nick.json`.

- Save this new JSON file in the `build/src` folder.

## Modify `index.ts`:

- After cloning this repo, modify the filename in the `json` to reflect your source file, e.g. `./nick.json`
- Modify the path in the `destinationFolder` variable in `index.ts` to reflect the folder you want to save images to.
- Optionally modify the `len` variable if you just want to test with a couple of images instead of downloading all ~800 images.

## From the root folder:

- Install dependencies (first time only): `npm i`
- Compile the app: `npx tsc -w`

## From the build/src folder:

- Run the app: `node index.js`
- Wait patiently for the images to download.

## Rinse, Repeat

Rename the `images` destination folder to preserve any downloaded images, then create a new empty `images` folder. Repeat the process above to gather your next batch of images.

## Errors

If any images are skipped, a log should print out in the console once the download is complete.

## Resources

[MyHeritage AI Time Machine](https://www.myheritage.com/ai-time-machine/)
[Quickstart Typescript new project](https://www.digitalocean.com/community/tutorials/typescript-new-project)
