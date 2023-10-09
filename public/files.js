$(document).ready(function () {
  // Function to fetch and display uploaded files
  function fetchFiles() {
    $.ajax({
      url: "http://localhost:3000/files", // Replace with your server endpoint for fetching files
      type: "GET",
      dataType: "json",
      success: function (data) {
        displayFiles(data);
      },
      error: function (error) {
        console.error("Error fetching files:", error);
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
            "<p>Filename: " +
            file.filename +
            "</p>" +
            "<p>Original Name: " +
            file.originalname +
            "</p>" +
            "<p>Size: " +
            formatBytes(file.size) +
            "</p>" +
            "<p>Uploaded At: " +
            new Date(file.uploadedAt).toLocaleString() +
            "</p>" +
            '<a href="' +
            file.path +
            '" download="' +
            file.filename +
            '" class="download-btn">Download</a>' +
            "</div>"
        );

        fileListDiv.append(fileItem);
      });
    } else {
      alert("Error: Unable to fetch files.");
    }
  }

  // Function to format file size into human-readable format
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  // Call the function to fetch and display files when the page loads
  fetchFiles();
});
