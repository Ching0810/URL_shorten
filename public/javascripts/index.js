document.querySelector('#copyButton').addEventListener("click", function() {
  // Define the link you want to copy
  const linkToCopy = document.querySelector('#shortUrl')

  const clipboardItem = new ClipboardItem({
    "text/plain": new Blob([linkToCopy], { type: "text/plain" })
  })

  // Copy the ClipboardItem to the clipboard
  navigator.clipboard.write([clipboardItem]).then(function() {
    // Change the button text to indicate that the link has been copied
    document.getElementById("copyButton").textContent = "Link Copied!";
  }).catch(function(error) {
    console.error("Unable to copy link:", error);
  })
})