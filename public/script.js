$(document).ready(function () {
  // Function to fetch files from the server and display them in HTML
  function fetchFiles() {
    $.ajax({
      url: "http://localhost:3000/files", // Endpoint to retrieve files from the server
      type: "GET",
      success: function (files) {
        displayFiles(files);
      },
      error: function (error) {
        console.error(error);
        alert("Error fetching files. Please try again.");
      },
    });
  }

  // Function to display files in HTML
  function displayFiles(files) {
    var fileListDiv = $("#fileList");
    fileListDiv.empty();

    if (Array.isArray(files)) {
      files.forEach(function (file) {
        var fileItem = $(
          '<div class="file-item">' +
            "<p>File Name: " +
            file.originalname +
            "</p>" +
            "<p>File Size: " +
            formatBytes(file.size) +
            "</p>" +
            '<img src="/uploads/' +
            file.filename +
            '" class="file-preview" alt="File Preview" width="300" height="150">' +
            '<a href="/uploads/' +
            file.filename +
            '" download="' +
            file.originalname +
            '" class="download-btn">Download</a>' +
            "</div>"
        );

        fileListDiv.append(fileItem);
      });
    } else {
      alert("Error: Unable to fetch files.");
    }
  }

  // Function to format file size to human-readable format
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  // Fetch files when the page loads
  fetchFiles();
});
