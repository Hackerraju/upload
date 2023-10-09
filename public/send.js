$(document).ready(function () {
  $("#uploadBtn").on("click", function () {
    var files = $("#fileInput")[0].files;
    var formData = new FormData();

    // Appending selected files to the FormData object
    for (var i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // Sending the file data to the server using AJAX
    $.ajax({
      url: "http://localhost:3000/upload", // Replace with your server endpoint
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (data) {
        // Handle successful upload (optional)
        console.log("Files uploaded successfully:", data);
      },
      error: function (error) {
        // Handle errors (optional)
        console.error("Error uploading files:", error);
      },
    });
  });
});
