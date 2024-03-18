// import convertFile from "../../convertFile.js";
"use server";
import fs from "fs";
import { NextResponse } from "next/server.js";
import openai from "openai";

async function convertFile(filePath) {
  try {
    const fileStream = fs.createReadStream(filePath);
    const response = await openai.files.create({
      file: fileStream,
      purpose: "assistants",
    });

    console.log("File uploaded successfully:", response);

    return response; //file id
  } catch (error) {
    console.error("Error uploading file:", error);
    return error;
  }
}

export async function POST(req, res) {
  const response = await convertFile("src\\app\\files\\t.txt");

  console.log(response);

  return new Response("Hello world - blogs");
}
