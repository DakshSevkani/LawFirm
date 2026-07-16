export const dynamic = "force-dynamic"
import React from "react";
import LawFirmTemplate from "./lawfirm";
const page = async () => {
  // const Function =async()=>
  const Responce = await fetch(
    "https://store-admin-uat.actifyzone.com/store-uat/api/dynamic-template",
    {
      method: "GET",
      headers: {
        "X-Tenant-ID": "22",
      },
    },
  );
  const Data = await Responce.json();
  console.log("Text",Data)
  return (
    <div>
      <LawFirmTemplate data={Data.formJson[0]} />
    </div>
  );
};

export default page;