import { EventEmitter } from "events";

function createNewsFeed() {
  const emitter = new EventEmitter();

  setInterval(() => {
    emitter.emit("newsEvent", "News: A thing happened in a place.");
  }, 1000);

  setInterval(() => {
    emitter.emit("breakingNews", "Breaking news! A BIG thing happened.");
  }, 4000);

  setTimeout(() => {
    emitter.emit("error", new Error("News feed connection error"));
  }, 5000);

  return emitter;
}

const newsFeed = createNewsFeed();

const newsEventListener = (message) => {
  console.log(message);
  newsFeed.removeListener("newsEvent", newsEventListener);
};

const breakingNewsListener = (message) => {
  console.log(message);
  newsFeed.removeListener("breakingNews", breakingNewsListener);
};

const errorListener = (error) => {
  console.error(error.message);
  newsFeed.removeListener("error", errorListener);
};

newsFeed.on("newsEvent", newsEventListener);
newsFeed.on("breakingNews", breakingNewsListener);
newsFeed.on("error", errorListener);
