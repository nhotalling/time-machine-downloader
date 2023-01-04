import { readFileSync } from 'fs';
import { join } from 'path';
import * as download from 'image-downloader';

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), 'utf-8');
  return result;
}

// **********************************
// Change these settings before compiling.

// Place the json file in the build/src folder.
const json: Root = JSON.parse(syncReadFile('./holly.json'));
const destinationFolder = 'C:\\dev\\time-machine-downloader\\images';

// End of settings
// **********************************

interface Root {
  data: Data;
}

interface Data {
  time_machine_a_i_model: TimeMachineAIModel;
}

interface TimeMachineAIModel {
  id: string;
  training_status: string;
  gender: string;
  title: string;
  jobs: Jobs;
}

interface Jobs {
  data: Job[];
}

interface Job {
  id: string;
  status: string;
  theme: string;
  shareable_url: string;
  cover_photo_url: string;
  facebook_api: string;
  twitter_api: string;
  whatsapp_api: string;
  generated_photos: GeneratedPhoto[];
}

interface GeneratedPhoto {
  id: string;
  url: string;
  shareable_url: string;
  facebook_api: string;
  twitter_api: string;
  whatsapp_api: string;
  theme?: string; // added this for filename
}

// const subjectName = json.data.time_machine_a_i_model.title;
const imageList = json.data.time_machine_a_i_model.jobs.data.flatMap((job) => {
  // add the theme onto the photo object for filename
  return job.generated_photos.map((photo) => {
    return {
      ...photo,
      theme: job.theme.replace(/[\W_]+/g, '-'),
    };
  });
});

console.log('imageList length', imageList.length);

var missedUrls: string[] = [];

//const len = 5; // for testing
const len = imageList.length;

const forLoop = async () => {
  console.log('Start');
  var imageNumber = 0;

  for (let i = 0; i < len; i++) {
    imageNumber++;
    // currently 8 images per theme. Could also watch for theme name change.
    if (imageNumber > 8) {
      imageNumber = 1;
    }

    const filename = join(
      destinationFolder,
      imageList[i].theme + '-' + imageNumber + '_' + (i + 1) + '.jpg'
    );
    console.log('downloading', imageList[i].url, 'to', filename);

    await download
      .image({
        url: imageList[i].url,
        dest: filename,
      })
      .then(({ filename }) => {
        console.log(i + 1, ' of ', imageList.length, 'downloaded'); // saved to /path/to/dest/photo.jpg
      })
      .catch((err) => {
        console.log('***ERROR DOWNLOADING***', imageList[i].url, filename);
        missedUrls.push(imageList[i].url);
        // for convenience, we'll log out the filename too so we can easily spot which images it was.
        missedUrls.push(filename);
        console.error(err);
      });
  }

  console.log('End');
  console.log('missedUrls', missedUrls);
};

forLoop();
