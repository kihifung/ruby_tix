import { BrowserQRCodeReader } from "@zxing/library/cjs/index.js";
import Rails from "@rails/ujs";
document.addEventListener("turbolinks:load", function () {
  let activity_id = document.querySelector(".js-activity-id");
  let id = activity_id.dataset.id;
  const codeReader = new BrowserQRCodeReader();
  codeReader
    .decodeFromInputVideoDevice(undefined, "video")
    .then((result) => {
      let qrDataFromReader = result.text;
      let formData = new FormData();
      let qrCodeParams = {
        qr_data: qrDataFromReader,
        activity_id: id,
      };
      formData.append("qr_code_json_data", JSON.stringify(qrCodeParams));
      Rails.ajax({
        url: "/qr_codes",
        type: "post",
        data: formData,
      });
    })
    .catch((error) => {
      document.getElementById("result").textContent = "";
      console.error(error);
    });
});
