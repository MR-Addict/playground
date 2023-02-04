import captureWebsite from "capture-website";
try {
  await captureWebsite.file("https://123dsfadsf/com", "local-file.png");
} catch (error) {
  console.log("error");
}
